from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Get the directory of the current file
BASE_DIR = Path(__file__).parent

# Helper: Load products from JSON file
def load_products():
    try:
        products_path = BASE_DIR / 'products.json'
        with open(products_path, 'r') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading products: {e}")
        return []

# Helper: Validate search query
def validate_search_query(query):
    if not query or not isinstance(query, str):
        return {
            'valid': False,
            'error': 'Search query is required and must be a string'
        }
    
    trimmed_query = query.strip()
    if not trimmed_query:
        return {
            'valid': False,
            'error': 'Search query cannot be empty'
        }
    
    if len(trimmed_query) > 100:
        return {
            'valid': False,
            'error': 'Search query must not exceed 100 characters'
        }
    
    return {
        'valid': True,
        'query': trimmed_query
    }

# Route: Get all products
@app.route('/api/products', methods=['GET'])
def get_all_products():
    try:
        products = load_products()
        return jsonify({
            'success': True,
            'data': products,
            'count': len(products)
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to load products'
        }), 500

# Route: Search products by name
@app.route('/api/search', methods=['GET'])
def search_products():
    try:
        q = request.args.get('q', '')
        sort = request.args.get('sort', 'relevance')
        
        # Validate query
        validation = validate_search_query(q)
        if not validation['valid']:
            return jsonify({
                'success': False,
                'error': validation['error'],
                'results': []
            }), 400
        
        # Validate sort parameter
        valid_sort_options = ['relevance', 'price-asc', 'price-desc', 'name']
        if sort not in valid_sort_options:
            return jsonify({
                'success': False,
                'error': f'Invalid sort option. Valid options: {", ".join(valid_sort_options)}',
                'results': []
            }), 400
        
        query = validation['query'].lower()
        products = load_products()
        
        # Filter products by search query (name, description, category)
        results = []
        for product in products:
            name = product.get('name', '').lower()
            description = product.get('description', '').lower()
            category = product.get('category', '').lower()
            
            if query in name or query in description or query in category:
                results.append(product)
        
        # Calculate relevance score for sorting by relevance
        results_with_scores = []
        for product in results:
            name = product.get('name', '').lower()
            score = 0
            
            # Higher score if query matches the beginning of the name
            if name.startswith(query):
                score += 10
            # Higher score for exact word match
            if f' {query}' in name:
                score += 5
            # Base score for any match
            score += 1
            
            product_copy = product.copy()
            product_copy['_relevanceScore'] = score
            results_with_scores.append(product_copy)
        
        # Sort results
        if sort == 'relevance':
            results_with_scores.sort(key=lambda x: x['_relevanceScore'], reverse=True)
        elif sort == 'price-asc':
            results_with_scores.sort(key=lambda x: x['price'])
        elif sort == 'price-desc':
            results_with_scores.sort(key=lambda x: x['price'], reverse=True)
        elif sort == 'name':
            results_with_scores.sort(key=lambda x: x['name'])
        
        # Remove relevance score from results
        final_results = []
        for item in results_with_scores:
            product_copy = {k: v for k, v in item.items() if k != '_relevanceScore'}
            final_results.append(product_copy)
        
        return jsonify({
            'success': True,
            'query': validation['query'],
            'count': len(final_results),
            'results': final_results
        })
    except Exception as e:
        print(f"Search error: {e}")
        return jsonify({
            'success': False,
            'error': 'An error occurred while searching',
            'results': []
        }), 500

# Route: Get product by ID
@app.route('/api/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    try:
        products = load_products()
        product = next((p for p in products if p.get('id') == product_id), None)
        
        if not product:
            return jsonify({
                'success': False,
                'error': f'Product with ID {product_id} not found'
            }), 404
        
        return jsonify({
            'success': True,
            'data': product
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': 'Failed to fetch product'
        }), 500

# Health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'Server is running'})

# 404 handler
@app.errorhandler(404)
def not_found(error):
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404

# Error handler for 500
@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)
