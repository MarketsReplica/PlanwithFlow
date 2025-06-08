import openai
from flask import Flask, request, jsonify
from prompts import topicClassificationPrompt
import os


def topic_classification(request):
    # Set CORS headers for the preflight request
    if request.method == 'OPTIONS':
        # Allows POST requests from any origin with the Content-Type header
        # and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    request_json = request.get_json(silent=True)
    request_args = request.args

    openai.api_key = os.environ.get('OPENAI_API_KEY')
    model = "gpt-3.5-turbo"
    content = topicClassificationPrompt + request_json['text']

    print(request_json['text'])
    messages = [
        {"role": "user", "content": content}
    ]
    completion = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        max_tokens=800,
    )
    print(completion)
    # Create a response with your existing data
    response = jsonify(completion['choices'][0]['message']['content'])

    # Set the necessary CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return response
