extraction_prompt = '''
You are a data extractor and turn text to json objects. Extract financial information from the text below in the following json template:
    {
        "income": [{"name": [string], "value": [number], "period":[string]}],
        "expense": [{"name": [string], "value": [number], "period":[string]}],
        "stocks_portfolio": [{"name": [string], "value":[number]}],
        "real_estate": [{"name": [string], "value":[number]}],
        "real_assets": [{"name": [string], "value":[number], "type":[string]}],
        "cash": [{"name": [string], "value":[number]}],
        "debt": [{"name": [string], "value":[number], "interest_rate":[number],  "type":[string]}],
    }
Information are classified in the following categories: income, expense, stocks portfolio, real estate, cash, debt.
Each category has a list of objects. Each object has a name and a value. For income and expense the "period" field indicates how often income or expense occurs. It can only have values of "Monhtly", "Annually" or "" if it is unknown. For debt, there are additional fields for "interest rate" and "type". "type" of debt are "student-loan", "credit-card", "mortgage", "auto-loan", "personal-loan" and "other". For cash, use the value of for liquid assets they have including money in chequing, savings, and money market or emergency savings accounts. Sum all available cash into a single cash data point. For stocks portfolio, use the value of all stocks, bonds, mutual funds, and ETFs into a single stocks portfolio. For real estate, use the value of each real estate they own, including their primary residence, vacation homes, and investment properties separately. For debt, use the value of each debt they have separately, including mortgages, auto loans, student loans, credit card debt, and personal loans.
If you could not find the information for "name", please leave it a blank string "". Make sure your entire response is a valid JSON string. Do not put comma or dash in the[number] fields. Only use a numberic characters for the "values". If[number] fields are unknown write null. Here are two examples:

Example 1:
The text is:
---
I own a house worth $500,000 and have a mortgage of $200,000
I live in a single-income household and earn $100,000 per year, before taxes
I have the following debts:
$30,000 in Federal student loan debt at a 5% interest rate
$2,500 in credit card debt at a 22 % APR
Some of my recurring monthly expenses include:
Car payment and insurance: $350
Rent and household expenses: $3,000
Retirement contributions: 5% of my monthly income with a 5% employer match
My savings account balance is $4,500
My brokerage account balance is $2,000, invested in various mutual funds and ETFs.
---

Your response is :
{
    "income": [
        {"name": "", "value": 100000, "period": "Annually"}
    ],
    "expense": [
        {"name": "Car payment and insurance", "value": 350, "period": "Monthly"},
        {"name": "Rent and household expenses", "value": 3000, "period": "Monthly"}
    ],
    "stocks_portfolio": [
        {"name": "Brokerage account", "value": 2000}
    ],
    "real_estate": [
        {"name": "House", "value": 500000}
    ],
    "cash": [
        {"name": "Savings account", "value": 4500}
    ],
    "debt": [
        {"name": "Federal student loan", "value": 30000,
            "interest_rate": 5, "type": "student-loan"},
        {"name": "Credit card", "value": 2500,
            "interest_rate": 22, "type": "credit-card"},
        {"name": "Mortgage", "value": 200000,
            "interest_rate": null, "type": "mortgage"}
    ]
}

Example 2:
The text is :
---
I have two rental units in the city of San Francisco. I make $2500 per month from first and $1500 per month from second. They are valued at $1M and $1.5M respectively. I have no expenses and no assets.
---

Your response is:
{
    "income": [
        {"name": "Rental income - unit 1", "value": 2500, "period": "Monthly"},
        {"name": "Rental income - unit 2", "value": 1500, "period": "Monthly"}
    ],
    "expense": [
        {"name": "", "value": null, "period": ""}
    ],
    "stocks_portfolio": [
        {"name": "", "value": null}
    ],
    "real_estate": [
        {"name": "Rental unit 1", "value": 1000000},
        {"name": "Rental unit 2", "value": 1500000}
    ],
    "cash": [
        {"name": "", "value": null}
    ],
    "debt": [
        {"name": "", "value": null, "interest_rate": null, "type": ""}
    ]
}

Example 3:
The text is :
---
Our household has two incomes of $5000, $4500 per month. We have a mortgage of $500K, with interest 3%, a car loan of $40K. Our house is valued at $750K approx. We spend $2500 on living expenses, $2000 on bills and $1000 on travel and entertainment. we have retirement stock portfolio of $200K. We have 20K in checking account.
---

Your response is:
{
"income": [
{"name": "income 1", "value": 5000, "period": "Monthly"},
{"name": "income 2", "value": 4500, "period": "Monthly"}
],
"expense": [
{"name": "Living expenses", "value": 2500, "period": "Monthly"},
{"name": "Bills", "value": 2000, "period": "Monthly"},
{"name": "Travel and entertainment", "value": 1000, "period": "Monthly"}
],
"stocks_portfolio": [
{"name": "Retirement stock portfolio", "value": 200000}
],
"real_estate": [
{"name": "House", "value": 750000}
],
"cash": [
{"name": "Cash", "value": 20000}
],
"debt": [
{"name": "Mortgage", "value": 500000, "interest_rate": 3, "type": "mortgage"},
{"name": "Car loan", "value": 40000, "interest_rate": null, "type": "auto-loan"}
]
}

Now it's your turn. This is the text for named entity extraction:

'''
