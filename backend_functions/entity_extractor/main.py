from openai import OpenAI
from flask import Flask, request, jsonify
from prompt import extraction_prompt
import json
import os


def entity_extractor(request):
    # Set CORS headers function
    def _cors_headers():
        return {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }

    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        headers = _cors_headers()
        headers['Access-Control-Max-Age'] = '3600'
        return ('', 204, headers)

    try:
        request_json = request.get_json(silent=True)
        
        if not request_json or 'text' not in request_json:
            response = jsonify({'error': 'Missing text parameter'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 400

        # Initialize OpenAI client with API key from environment
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            response = jsonify({'error': 'OpenAI API key not configured'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 500

        client = OpenAI(api_key=api_key)
        model = "gpt-4.1-mini"
        content = extraction_prompt + request_json['text']

        print(f"Processing text: {request_json['text'][:100]}...")  # Log first 100 chars
        
        messages = [
            {"role": "user", "content": content}
        ]
        
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.1,
            max_tokens=3000,
            response_format={"type": "json_object"}
        )
        
        print(f"OpenAI response received: {completion.choices[0].message.content[:100]}...")
        
        # Parse the JSON content from the response
        response_content = json.loads(completion.choices[0].message.content)
        
        # Create a response with the parsed JSON data
        response = jsonify(response_content)

        # Set the necessary CORS headers
        for key, value in _cors_headers().items():
            response.headers.set(key, value)

        return response

    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        response = jsonify({'error': 'Failed to parse OpenAI response as JSON'})
        for key, value in _cors_headers().items():
            response.headers.set(key, value)
        return response, 500
        
    except Exception as e:
        print(f"Unexpected error: {e}")
        response = jsonify({'error': 'Internal server error'})
        for key, value in _cors_headers().items():
            response.headers.set(key, value)
        return response, 500
