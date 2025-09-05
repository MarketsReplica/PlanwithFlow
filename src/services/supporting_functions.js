import * as fjs from 'financial'
import { statesTaxBrackets } from './state-tax-brackets.js'

// function to calculate a loan properties
// This function is used in the properties menu of the debt object. When user clicks on a debt object,
// they can enter either loan amount, interest rate and amortization period or monthly payment. The function calculates the missing value.
export function calculateLoanProperties(pv, interestRate, term, monthlyPayment) {
  if (interestRate != null) {
    interestRate = interestRate / 100
  }
  // if monthly payment is not entered, calculate it
  if (monthlyPayment === null) {
    monthlyPayment = parseFloat(Number(- fjs.pmt(interestRate / 12, term, pv)).toFixed(2));
    if (isNaN(monthlyPayment)) monthlyPayment = 0;
    if (term <= 0) monthlyPayment = 0;
    if (monthlyPayment === Infinity) monthlyPayment = 0;
  }
  // if interest rate is not entered, calculate it
  if (interestRate === null) {
    interestRate = fjs.rate(term, monthlyPayment, pv, 0)
    interestRate = interestRate * 12 // convert to annual rate
  }
  // if the present value of the loan amount was not entered, calculate it
  if (pv === null) {
    pv = fjs.pv(interestRate / 12, term, monthlyPayment)
  }
  // if the amortization period was not entered, calculate it
  if (term === null) {
    term = fjs.nper(interestRate / 12, monthlyPayment, pv)
  }

  // create an object with the properties of the debt object
  let interestPayment = parseFloat(Number(- fjs.ipmt(interestRate / 12, 1, term, pv)).toFixed(2))
  if (isNaN(interestPayment)) interestPayment = 0;
  let principalPayment = parseFloat(Number(monthlyPayment - interestPayment).toFixed(2))
  // make interestRate back to percentage to present as an output
  interestRate = interestRate * 100
  let debtObjectProperties = {
    pv: pv,
    interestRate: interestRate,
    term: term,
    monthlyPayment: monthlyPayment,
    interestPayment: interestPayment,
    principalPayment: principalPayment,
  }
  return debtObjectProperties
}

// Unit test
// All the following commands should generates the same result as

// console.log(calculateLoanProperties(240000, 7, 30 * 12, null))
// console.log(calculateLoanProperties(240000, 7, null, -1597))
// console.log(calculateLoanProperties(240000, null, 30 * 12, -1597))
// console.log(calculateLoanProperties(null, 7, 30 * 12, -1597))

//output
/*
{
  pv: 240041.18601267057,
  interestRate: 7.000000000000001,
  term: 360,
  montlyPayment: -1597
}
*/

// calculate standard deduction amount for a given income and marital status
function calculateStandardDeduction(maritalStatus, income) {
  let deduction = 0

  switch (maritalStatus) {
    case 'single':
      deduction = 12550
      break
    case 'married-filing-separately':
      deduction = 12550
      break
    case 'married-filing-jointly':
      deduction = 25100
      break
    case 'head-of-household':
      deduction = 18800
      break
    default:
      throw new Error('Invalid filing status')
  }
  return deduction
}

// calculating income tax for a given income in the US
//fedral income tax for a given income and marital status
function calculateFederalIncomeTax(income, maritalStatus) {
  let tax = 0
  if (maritalStatus === 'single') {
    if (income <= 10275) {
      tax = income * 0.1
    } else if (income <= 41775) {
      tax = 1027.5 + (income - 10275) * 0.12
    } else if (income <= 89075) {
      tax = 4807.5 + (income - 41775) * 0.22
    } else if (income <= 170050) {
      tax = 15213.5 + (income - 89075) * 0.24
    } else if (income <= 215950) {
      tax = 34647.5 + (income - 170050) * 0.32
    } else if (income <= 539900) {
      tax = 49335.5 + (income - 215950) * 0.35
    } else {
      tax = 162718 + (income - 539900) * 0.37
    }
  } else if (maritalStatus === 'married-filing-jointly') {
    if (income <= 20550) {
      tax = income * 0.1
    } else if (income <= 83550) {
      tax = 20550 * 0.1 + (income - 20550) * 0.12
    } else if (income <= 178150) {
      tax = 20550 * 0.1 + (83550 - 20550) * 0.12 + (income - 83550) * 0.22
    } else if (income <= 340100) {
      tax =
        20550 * 0.1 +
        (83550 - 20550) * 0.12 +
        (178150 - 83550) * 0.22 +
        (income - 178150) * 0.24
    } else if (income <= 431900) {
      tax =
        20550 * 0.1 +
        (83550 - 20550) * 0.12 +
        (178150 - 83550) * 0.22 +
        (340100 - 178150) * 0.24 +
        (income - 340100) * 0.32
    } else if (income <= 647850) {
      tax =
        20550 * 0.1 +
        (83550 - 20550) * 0.12 +
        (178150 - 83550) * 0.22 +
        (340100 - 178150) * 0.24 +
        (431900 - 340100) * 0.32 +
        (income - 431900) * 0.35
    } else {
      tax =
        20550 * 0.1 +
        (83550 - 20550) * 0.12 +
        (178150 - 83550) * 0.22 +
        (340100 - 178150) * 0.24 +
        (431900 - 340100) * 0.32 +
        (647850 - 431900) * 0.35 +
        (income - 647850) * 0.37
    }
  } else if (maritalStatus === 'married-filing-separately') {
    if (income <= 10275) {
      tax = income * 0.1
    } else if (income <= 41775) {
      tax = 10275 * 0.1 + (income - 10275) * 0.12
    } else if (income <= 89075) {
      tax = 10275 * 0.1 + (41775 - 10275) * 0.12 + (income - 41775) * 0.22
    } else if (income <= 170050) {
      tax =
        10275 * 0.1 +
        (41775 - 10275) * 0.12 +
        (89075 - 41775) * 0.22 +
        (income - 89075) * 0.24
    } else if (income <= 215950) {
      tax =
        10275 * 0.1 +
        (41775 - 10275) * 0.12 +
        (89075 - 41775) * 0.22 +
        (170050 - 89075) * 0.24 +
        (income - 170050) * 0.32
    } else if (income <= 323925) {
      tax =
        10275 * 0.1 +
        (41775 - 10275) * 0.12 +
        (89075 - 41775) * 0.22 +
        (170050 - 89075) * 0.24 +
        (215950 - 170050) * 0.32 +
        (income - 215950) * 0.35
    } else {
      tax =
        10275 * 0.1 +
        (41775 - 10275) * 0.12 +
        (89075 - 41775) * 0.22 +
        (170050 - 89075) * 0.24 +
        (215950 - 170050) * 0.32 +
        (323925 - 215950) * 0.35 +
        (income - 323925) * 0.37
    }
  } else if (maritalStatus === 'head-of-household') {
    if (income <= 14650) {
      tax = income * 0.1
    } else if (income <= 55900) {
      tax = 1465 + (income - 14650) * 0.12
    } else if (income <= 89050) {
      tax = 6415 + (income - 55900) * 0.22
    } else if (income <= 170050) {
      tax = 13708 + (income - 89050) * 0.24
    } else if (income <= 215950) {
      tax = 33148 + (income - 170050) * 0.32
    } else if (income <= 539900) {
      tax = 47836 + (income - 215950) * 0.35
    } else {
      tax = 161218.5 + (income - 539900) * 0.37
    }
  }
  return tax
}

// function for calculating state tax for a given income and state and marital status

function calculateStateIncomeTax(income, state, maritalStatus) {
  let tax = 0
  const taxBrackets = statesTaxBrackets[state][maritalStatus]
  // check if tax brackets exist for given state and marital status
  if (!(typeof taxBrackets === 'undefined')) {
    // loop through tax brackets from highest to lowest and add tax for each bracket
    for (let i = taxBrackets.length - 1; i >= 0; i = i - 1) {
      if (income > taxBrackets[i].bracket) {
        tax += (income - taxBrackets[i].bracket) * taxBrackets[i].rate
        income = taxBrackets[i].bracket
      }
    }
  }
  return tax
}

//console.log(calculateStateIncomeTax(100000, 'New York', 'single'))