import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get customer reviews from database
    Args: event - dict with httpMethod
          context - object with request_id attribute
    Returns: HTTP response with reviews list
    '''
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
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'})
        }
    
    dsn = os.environ.get('DATABASE_URL')
    
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    cur.execute("""
        SELECT id, customer_name, rating, comment, purchase_amount, created_at
        FROM reviews
        WHERE is_visible = true
        ORDER BY created_at DESC
        LIMIT 50
    """)
    
    rows = cur.fetchall()
    
    reviews = []
    for row in rows:
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
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'isBase64Encoded': False,
        'body': json.dumps({'reviews': reviews})
    }
