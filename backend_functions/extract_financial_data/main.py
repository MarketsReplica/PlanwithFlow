import openai
from flask import jsonify
import re
import os

from prompt import extraction_prompt


def extract_value(s):
    # This regular expression pattern looks for 3 asterisks surrounding any number of non-asterisk characters
    pattern = r'\*\*\*(.*?)\*\*\*'
    matches = re.findall(pattern, s)
    if matches:
        return matches[0]  # Return the first match
    else:
        return None  # Return None if there are no matches


def extfindata(request):
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
    model = "gpt-4.1-mini"
    content = extraction_prompt + 'Now extract "' + request_json['financial_parameter'] + '" value from this object: \n' + request_json['findata']

    messages = [
        {"role": "user", "content": content}
    ]
    completion = openai.ChatCompletion.create(
        model=model,
        messages=messages,
        max_tokens=4000,
        temperature=0.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
    )

    # Create a response 
    response = jsonify({"financial_parameter" : request_json['financial_parameter'], "value": float(extract_value(completion['choices'][0]['message']['content']))})


    # Set the necessary CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return response
