'''
Business: Создание заказа UC и отправка уведомления в Telegram с реквизитами оплаты
Args: event - dict с httpMethod, body (playerId, playerName, contact, ucAmount, price, bonus)
      context - object с request_id
Returns: HTTP response с order_id или ошибкой
'''

import json
import os
from typing import Dict, Any
import urllib.request
import urllib.parse
from datetime import datetime
import psycopg2

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        player_id = body_data.get('playerId', '').strip()
        player_name = body_data.get('playerName', '').strip()
        contact = body_data.get('contact', '').strip()
        uc_amount = body_data.get('ucAmount', 0)
        price = body_data.get('price', 0)
        bonus = body_data.get('bonus', '').strip()
        promocode = body_data.get('promocode', '').strip().upper()
        
        if not all([player_id, player_name, contact, uc_amount, price]):
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Все поля обязательны'})
            }
        
        telegram_bot_token = os.environ.get('TELEGRAM_BOT_TOKEN', '')
        telegram_chat_id = os.environ.get('TELEGRAM_CHAT_ID', '')
        tbank_card = os.environ.get('TBANK_CARD_NUMBER', '')
        
        if not telegram_bot_token or not telegram_chat_id:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Telegram не настроен'})
            }
        
        database_url = os.environ.get('DATABASE_URL', '')
        
        order_id = context.request_id[:8]
        order_time = datetime.now().strftime('%d.%m.%Y %H:%M')
        bonus_text = f' ({bonus})' if bonus else ''
        
        discount_amount = 0
        final_price = price
        promo_season = ''
        
        if promocode and database_url:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            
            cur.execute("""
                SELECT id, discount_percent, max_uses, used_count, season, active
                FROM promocodes
                WHERE code = %s
            """, (promocode,))
            
            promo = cur.fetchone()
            
            if promo:
                promo_id, discount_percent, max_uses, used_count, season, active = promo
                
                if active and used_count < max_uses:
                    discount_amount = int(price * discount_percent / 100)
                    final_price = price - discount_amount
                    promo_season = season or ''
                    
                    cur.execute("""
                        UPDATE promocodes SET used_count = used_count + 1
                        WHERE id = %s
                    """, (promo_id,))
            
            cur.close()
            conn.close()
        
        if database_url:
            conn = psycopg2.connect(database_url)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO orders (order_id, player_id, player_name, contact, uc_amount, price, bonus, status, promocode, discount_amount, final_price) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)",
                (order_id, player_id, player_name, contact, uc_amount, price, bonus, 'pending', promocode if promocode else None, discount_amount, final_price)
            )
            
            if promocode and discount_amount > 0:
                cur.execute("""
                    INSERT INTO promocode_usage (promocode_id, order_id)
                    SELECT id, %s FROM promocodes WHERE code = %s
                """, (order_id, promocode))
            
            conn.commit()
            cur.close()
            conn.close()
        
        promo_text = ''
        if promocode and discount_amount > 0:
            promo_text = f"\n🎁 Промокод: {promocode} ({promo_season})\n💸 Скидка: -{discount_amount} ₽"
        
        message = f"""🎮 НОВЫЙ ЗАКАЗ UC

📦 Пакет: {uc_amount} UC{bonus_text}
💰 Цена: {price} ₽{promo_text}
💵 К оплате: {final_price} ₽

👤 Игрок:
• Player ID: {player_id}
• Ник: {player_name}
• Контакт: {contact}

⏰ Время заказа: {order_time}
🆔 ID заказа: {order_id}"""

        if tbank_card:
            message += f"\n\n💳 Карта T-Bank: {tbank_card}"
        
        telegram_url = f"https://api.telegram.org/bot{telegram_bot_token}/sendMessage"
        telegram_data = {
            'chat_id': telegram_chat_id,
            'text': message,
            'parse_mode': 'HTML'
        }
        
        req = urllib.request.Request(
            telegram_url,
            data=json.dumps(telegram_data).encode('utf-8'),
            headers={'Content-Type': 'application/json'}
        )
        
        with urllib.request.urlopen(req, timeout=10) as response:
            telegram_response = json.loads(response.read().decode('utf-8'))
            
            if not telegram_response.get('ok'):
                raise Exception('Telegram API error')
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({
                'success': True,
                'order_id': order_id,
                'message': 'Заказ создан, реквизиты отправлены'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps({'error': f'Ошибка сервера: {str(e)}'})
        }