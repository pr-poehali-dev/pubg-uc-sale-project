'''
Business: Получение статистики заказов UC и отзывов клиентов
Args: event - dict с httpMethod, queryStringParameters (type: stats/reviews)
      context - object с request_id
Returns: HTTP response со статистикой или отзывами
'''

import json
import os
from typing import Dict, Any
import psycopg2
from datetime import datetime, timedelta

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'GET':
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
        params = event.get('queryStringParameters', {}) or {}
        data_type = params.get('type', 'stats')
        
        database_url = os.environ.get('DATABASE_URL', '')
        
        if not database_url:
            return {
                'statusCode': 500,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'База данных не настроена'})
            }
        
        conn = psycopg2.connect(database_url)
        cur = conn.cursor()
        
        if data_type == 'reviews':
            cur.execute("""
                SELECT id, customer_name, rating, comment, purchase_amount, created_at
                FROM reviews
                WHERE is_visible = true
                ORDER BY created_at DESC
                LIMIT 50
            """)
            
            reviews = []
            for row in cur.fetchall():
                reviews.append({
                    'id': row[0],
                    'customer_name': row[1],
                    'rating': row[2],
                    'comment': row[3],
                    'purchase_amount': row[4],
                    'created_at': row[5].isoformat() if row[5] else None
                })
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'reviews': reviews})
            }
        
        cur.execute("""
            SELECT 
                COUNT(*) as total_orders,
                SUM(price) as total_revenue,
                SUM(uc_amount) as total_uc,
                COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_orders,
                COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_orders
            FROM orders
        """)
        
        stats = cur.fetchone()
        
        cur.execute("""
            SELECT order_id, player_id, player_name, contact, uc_amount, price, bonus, status, created_at
            FROM orders
            ORDER BY created_at DESC
            LIMIT 50
        """)
        
        orders = []
        for row in cur.fetchall():
            orders.append({
                'order_id': row[0],
                'player_id': row[1],
                'player_name': row[2],
                'contact': row[3],
                'uc_amount': row[4],
                'price': row[5],
                'bonus': row[6],
                'status': row[7],
                'created_at': row[8].isoformat() if row[8] else None
            })
        
        cur.close()
        conn.close()
        
        result = {
            'total_orders': stats[0] or 0,
            'total_revenue': stats[1] or 0,
            'total_uc': stats[2] or 0,
            'pending_orders': stats[3] or 0,
            'completed_orders': stats[4] or 0,
            'orders': orders
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'isBase64Encoded': False,
            'body': json.dumps(result)
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