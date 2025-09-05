import openai
from datetime import date
import datetime
import dateutil.parser
from typing import List, Dict
from flask import Flask, request, jsonify, json
# import inflation_prompt variable from prompt.py
from prompts import inflation_prompt, incomegrowth_prompt, interestrate_prompt, realestate_prompt, stockmarket_prompt
import os


def future_series(request):
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

    today = date.today()
    formatted_date = today.strftime("%Y-%m-%d")
    request_json = request.get_json(silent=True)

    openai.api_key = os.environ.get('OPENAI_API_KEY')
    model = "gpt-4.1-mini"
    time_series_name = ""
    requestPath = request.path
    # naming convention here is that requestPath is lower case, time_series_name is snake case and should be the same as the topic classification keys and will be the same value for keys in the json response for the big array
    if requestPath == "/inflation":
        content = inflation_prompt + "Today's date is " + \
            formatted_date + ". " + request_json['text']
        time_series_name = "inflation"
    if requestPath == "/incomegrowth":
        content = incomegrowth_prompt + "Today's date is " + \
            formatted_date + ". " + request_json['text']
        time_series_name = "income_growth"
    if requestPath == "/interestrate":
        content = interestrate_prompt + "Today's date is " + \
            formatted_date + ". " + request_json['text']
        time_series_name = "interest_rate"
    if requestPath == "/propertygrowth":
        content = realestate_prompt + "Today's date is " + \
            formatted_date + ". " + request_json['text']
        time_series_name = "property_growth"
    if requestPath == "/stockgrowth":
        content = stockmarket_prompt + "Today's date is " + \
            formatted_date + ". " + request_json['text']
        time_series_name = "stock_growth"
    print("User message : ", request_json['text'])
    messages = [
        {"role": "user", "content": content}
    ]
    completion = openai.ChatCompletion.create(
        model=model,
        messages=messages,
    )
    print("Completion : ", completion['choices'][0]['message']['content'])
    # Create a response with your existing data
    if 'projection_length' in request_json:
        response = jsonify(
            generate_monthly_series(json.loads(
                completion['choices'][0]['message']['content']), request_json['projection_length'], time_series_name)
        )
    else:
        response = jsonify(
            json.loads(completion['choices'][0]['message']['content']))

    # Set the necessary CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type')

    return response


def generate_monthly_series(value_changes: List[Dict[str, str]], projection_length: int, time_series_name: str) -> List[Dict[str, float]]:
    # Helper function to get the number of months between two dates
    def months_between(d1, d2):
        return (d2.year - d1.year) * 12 + d2.month - d1.month

    # Convert input dates to datetime objects
    for value_change in value_changes:
        value_change["date"] = dateutil.parser.parse(
            value_change["date"]).date()

    # Sort inflation changes by date
    value_changes.sort(key=lambda x: x["date"])

    # Initialize the output list
    monthly_values = []

    # Set the start date as today
    start_date = datetime.date.today().replace(day=1)
    end_date = start_date + datetime.timedelta(days=projection_length*365)

    # Iterate through the projection period
    current_date = start_date
    current_value = value_changes[0][time_series_name]

    i = 0
    while current_date <= end_date:
        # Check if there is an value change at the current date
        if i + 1 < len(value_changes) and current_date >= value_changes[i+1]["date"]:
            i += 1
            current_value = value_changes[i][time_series_name]

        # Append the inflation value to the output list
        monthly_values.append({
            "date": current_date.strftime("%Y-%m"),
            time_series_name: current_value
        })

        # Move to the next month
        year, month = divmod(current_date.year * 12 + current_date.month, 12)
        current_date = datetime.date(year, month + 1, 1)

    return monthly_values
