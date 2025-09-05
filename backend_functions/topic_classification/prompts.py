topicClassificationPrompt = '''
I want you to classify topic of a given text among the following categories with the assigned keys in the bracket (): 
-  Inflation (inflation)
- Income Growth (income_growth)
- Stock Market Growth (stock_growth)
- Real Estate Property Value Growth (property_growth)
- Interest Rate for Loans and Mortgages  or Central Bank Interest Rates (interest_rate)

Return your classification in a json format as following:
{"topic" : "key value"}
Just return the json string with no explanations or other text.

For example, for the following text:
Inflation to reach 5% in future years
return:
{"topic" : "inflation")

Another example, for the following text:
My house increase its value 3% per year after 2025 and then at 2%.
return: 
{"topic" : "property_growth"}

Another example, for the following text:
Fed rate to bump to 4% for the next 10 years. 
return:
{"topic" : "interest_rate"}

Another example, for the following text:
Markets to crash 4% each year for 5 years and then growth at 2% for 10 years.
return:
{"topic" : "stock_growth"}

Now its your turn with the following text:

'''
