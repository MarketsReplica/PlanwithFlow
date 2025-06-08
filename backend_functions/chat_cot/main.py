from openai import OpenAI
from flask import jsonify
import tiktoken
import os

client = OpenAI(api_key=os.environ.get('OPENAI_API_KEY'))
model = "gpt-4.1-mini"

system_message = {"role": "system",
                  "content": "You are a financial coach, helping people plan their finances.  Do not suggest to meet any financial advisor. Ask user when you need any information. or want to use a financial model or get financial data from the model."}
max_response_tokens = 2000
token_limit = 60000


def num_tokens_from_messages(messages, model=model):
    encoding = tiktoken.encoding_for_model(model)
    num_tokens = 0
    for message in messages:
        # every message follows <im_start>{role/name}\n{content}<im_end>\n
        num_tokens += 4
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":  # if there's a name, the role is omitted
                num_tokens += -1  # role is always required and always 1 token
    num_tokens += 2  # every reply is primed with <im_start>assistant
    return num_tokens


def chat_completion(messages):
    conv_history_tokens = num_tokens_from_messages(messages)
    while conv_history_tokens + max_response_tokens >= token_limit:
        del messages[1]
        conv_history_tokens = num_tokens_from_messages(messages)
    try:
        completion = client.chat.completions.create(
            model=model,
            messages=messages,
            temperature=0.2,
        )
        return completion
    except Exception as e:
        print("OpenAI error:", str(e))
        raise e


def chatcotapi(request):
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
        print("Request:", request_json)
        
        if not request_json or 'messages' not in request_json:
            response = jsonify({'error': 'Missing messages in request'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 400

        messages = request_json['messages']
        
        if not messages:
            response = jsonify({'error': 'Empty messages in request'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 400
            
        try:
            user_message = messages[-1]['content']
        except (IndexError, KeyError) as e:
            response = jsonify({'error': 'Missing content in message'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 400

        print("User message:", user_message)

        # Check if OpenAI API key is available
        if not os.environ.get('OPENAI_API_KEY'):
            response = jsonify({'error': 'OpenAI API key not configured'})
            for key, value in _cors_headers().items():
                response.headers.set(key, value)
            return response, 500

        completion = chat_completion(messages)
        completion_content = completion.choices[0].message.content

        print("Completion:", completion_content)

        response = jsonify(completion_content)
        for key, value in _cors_headers().items():
            response.headers.set(key, value)

        return response

    except Exception as e:
        print(f"Unexpected error: {e}")
        response = jsonify({'error': 'Internal server error'})
        for key, value in _cors_headers().items():
            response.headers.set(key, value)
        return response, 500
