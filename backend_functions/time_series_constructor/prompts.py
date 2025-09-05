inflation_prompt = '''
You are given a text about how inflation data changes in the future. I want you to extract when the changes are happening and put them in the following JSON format: 
[{"date" : "date_string", "inflation": number},{"date" : "date_string", "inflation": number}, {"date" : "date_string", "inflation": number}]

The "date_string" are in the format "YYYY-MM-DD". For numbers only use a numeric characters, no % sign. Just return the json array. No explanation is needed. Make sure the output is a valid JSON array.

For example, if you are given a text as:

From April 2023 inflation remains at 6% until the beginning of 2026 where it drops to 4% and will not reach 2% until 2030.

The output JSON is: 

[{"date" : "2023-04-01", "inflation": 6}, {"date" : "2026-01-01", "inflation": 4}, {"date" : "2030-01-01", "inflation": 2}]

Another example, for the following text:

Today date is 2023-04-02. Inflation remains elevated at 6% for 5 years and drops to 2% after that.
The output is: 
[{"date" : "2023-04-02", "inflation": 6}, {"date" : "2028-04-02", "inflation": 2}]

Another example, for the following text:
Today date is 2023-04-02. Inflation remains at 8% for 5 years, it then drops 1% every year until getting to the target 2% for the years after.

The output is:
[{"date" : "2023-04-02", "inflation": 8}, {"date" : "2028-04-02", "inflation": 7}, {"date" : "2029-04-02", "inflation": 6}, {"date" : "2030-04-02", "inflation": 5}, {"date" : "2031-04-02", "inflation": 4}, {"date" : "2032-04-02", "inflation": 3}, {"date" : "2033-04-02", "inflation": 2}]

Now extract the date changes and inflation values according to the template from the following text and return only the json array in []: 

'''

incomegrowth_prompt = '''
You are given a text about how a person's income changes in the future. I want you to extract the dates and the amount of the changes that are happening and put them in the following JSON format: 
[{"date" : "date_string", "income_growth": "number"},{"date" : "date_string", "income_growth": "number"}, {"date" : "date_string", "income_growth": "number"}]

The "date_string" are in the format "YYYY-MM-DD". For number strings only use a numeric characters, no % sign. If income_growth is the same as inflation assign "number" to be "inflation_rate". Just return the json array. No explanation is needed. Make sure the output is a valid JSON array. 

For example, if you are given a text as:

From April 2023 my income will growth at 6% until the beginning of 2026 where its growth drops to 4% and after than it grow at 2% until 2030.

The output JSON is: 

[{"date" : "2023-04-01", "income_growth": "6"}, {"date" : "2026-01-01", "income_growth": "4"}, {"date" : "2030-01-01", "income_growth": "2"}]

Another example, for the following text:

Today date is 2023-04-02. My income grow annually at 6% for 5 years and then remains the same after that.
The output is: 
[{"date" : "2023-04-02", "income_growth": "6"}, {"date" : "2028-04-02", "income_growth": "0"}]

Another example, for the following text:
Today date is 2023-04-02. Income remains the same for 5 years, it then grows with the inflation rate every year.

The output is:
[{"date" : "2023-04-02", "income_growth": "0"}, {"date" : "2028-04-02", "income_growth": "inflation_rate"}]

Another example, for the following text:
Today date is "2023-04-02". My income will match inflation for the next 10 years and then it stops growing.
The output is: 
[{"date": "2023-04-02", "income_growth": "inflation_rate"}, {"date": "2033-04-02", "income_growth": "0"}]

Now extract the date changes and income_growth values according to the template provided from the following text: 

'''

interestrate_prompt = '''
You are given a text about how interest rate data changes in the future. I want you to extract when the changes are happening and put them in the following JSON format: 
[{"date" : "date_string", "interest_rate": number},{"date" : "date_string", "interest_rate": number}, {"date" : "date_string", "interest_rate": 2}]

The "date_string" are in the format "YYYY-MM-DD". For numbers only use a numeric characters, no % sign. Just return the json array. No explanation is needed. Make sure the output is a valid JSON array.

For example, if you are given a text as:

From April 2023 interest rate remains at 6% until the beginning of 2026 where it drops to 4% and will not reach 2% until 2030.

The output JSON is: 

[{"date" : "2023-04-01", "interest_rate": 6}, {"date" : "2026-01-01", "interest_rate": 4}, {"date" : "2030-01-01", "interest_rate": 2}]

Another example, for the following text:

Today date is 2023-04-02. interest_rate remains elevated at 6% for 5 years and drops to 2% after that.
The output is: 
[{"date" : "2023-04-02", "interest_rate": 6}, {"date" : "2028-04-02", "interest_rate": 2}]

Another example, for the following text:
Today date is 2023-04-02. interest_rate remains at 8% for 5 years, it then drops 1% every year until getting to the target 2% for the years after.

The output is:
[{"date" : "2023-04-02", "interest_rate": 8}, {"date" : "2028-04-02", "interest_rate": 7}, {"date" : "2029-04-02", "interest_rate": 6}, {"date" : "2030-04-02", "interest_rate": 5}, {"date" : "2031-04-02", "interest_rate": 4}, {"date" : "2032-04-02", "interest_rate": 3}, {"date" : "2033-04-02", "interest_rate": 2}]

Now extract the date changes and interest rate values according to the template from the following text: 

'''

realestate_prompt = '''
You are given a text about how real estate market data changes in the future. I want you to extract when the changes are happening and put them in the following JSON format: 
[{"date" : "date_string", "property_growth": number},{"date" : "date_string", "property_growth": number}, {"date" : "date_string", "property_growth": number}]

The "date_string" are in the format "YYYY-MM-DD". For number field only use a numeric characters, no % sign. Just return the json array. No explanation is needed. Make sure the output is a valid JSON array.

For example, if you are given a text as:

From April 2023 housing growth remains at 6% until the beginning of 2026 where it drops to 4% and will not reach 2% until 2030.

The output JSON is: 

[{"date" : "2023-04-01", "property_growth": 6}, {"date" : "2026-01-01", "property_growth": 4}, {"date" : "2030-01-01", "property_growth": 2}]

Another example, for the following text:

Today date is 2023-04-02. Real estate market remains elevated at 6% for 5 years and then drops to 2% after that.

The output is: 
[{"date" : "2023-04-02", "property_growth": 6}, {"date" : "2028-04-02", "property_growth": 2}]

Another example, for the following text:
Today date is 2023-04-02. housing price index growth remains at 8% for 5 years, it then drops 1% every year until getting to the historical trend 2% for the years after.

The output is:
[{"date" : "2023-04-02", "property_growth": 8}, {"date" : "2028-04-02", "property_growth": 7}, {"date" : "2029-04-02", "property_growth": 6}, {"date" : "2030-04-02", "property_growth": 5}, {"date" : "2031-04-02", "property_growth": 4}, {"date" : "2032-04-02", "property_growth": 3}, {"date" : "2033-04-02", "property_growth": 2}]

Now extract the date changes and real estate market growth values according to the template from the following text: 


'''

stockmarket_prompt = '''
You are given a text about how stock market data changes in the future. I want you to extract when the changes are happening and put them in the following JSON format: 

[{"date" : "date_string", "stock_growth": number},{"date" : "date_string", "stock_growth": number}, {"date" : "date_string", "stock_growth": number}]

The "date_string" are in the format "YYYY-MM-DD". For number field only use a numeric characters, no % sign. Just return the json array. No explanation is needed. Make sure the output is a valid JSON array.

For example, if you are given a text as:

From April 2023 stock market growth remains at 6% until the beginning of 2026 where it drops to 4% and will not reach 2% until 2030.

The output JSON is: 

[{"date" : "2023-04-01", "stock_growth": 6}, {"date" : "2026-01-01", "stock_growth": 4}, {"date" : "2030-01-01", "stock_growth": 2}]

Another example, for the following text:

Today date is 2023-04-02. The growth of financial markets remains elevated at 15% for 5 years and then drops to 2% after that.

The output is: 
[{"date" : "2023-04-02", "stock_growth": 6}, {"date" : "2028-04-02", "stock_growth": 2}]

Another example, for the following text:
Today date is 2023-04-02. We have a bull market with appreciating 15% for 5 years, it then turns to bear market with a crash of -23% for a year and slow appreciation of 4% afterward for 5 years. Finally getting to the average of 10% for the years after.

The output is:
[{"date" : "2023-04-02", "stock_growth": 15}, {"date" : "2028-04-02", "stock_growth": -23}, {"date" : "2029-04-02", "stock_growth": 4}, {"date" : "2034-04-02", "stock_growth": 10}]

Now extract the date changes and real estate market growth values according to the template from the following text: 


'''
