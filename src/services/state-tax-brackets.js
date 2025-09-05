// data structure for state tax brackets and rates
export const statesTaxBrackets = {
  Alabama: {
    single: [
      { rate: 0.02, bracket: 0 },
      {
        rate: 0.04,
        bracket: 500,
      },
      {
        rate: 0.05,
        bracket: 3000,
      },
    ],
    'married-filing-jointly': [
      {
        rate: 0.02,
        bracket: 0,
      },
      {
        rate: 0.04,
        bracket: 1000,
      },
      {
        rate: 0.05,
        bracket: 6000,
      },
    ],
  },
  Alaska: {},
  Arizona: {
    single: [
      {
        rate: 0.0259,
        bracket: 0,
      },
      {
        rate: 0.0334,
        bracket: 27808,
      },
      {
        rate: 0.0417,
        bracket: 55615,
      },
      {
        rate: 0.045,
        bracket: 166843,
      },
    ],
    'married-filing-jointly': [
      {
        rate: 0.0259,
        bracket: 0,
      },
      {
        rate: 0.0334,
        bracket: 55615,
      },
      {
        rate: 0.0417,
        bracket: 111229,
      },
      {
        rate: 0.045,
        bracket: 333684,
      },
    ],
  },
  Arkansas: {
    single: [
      {
        rate: 0.02,
        bracket: 0,
      },
      {
        rate: 0.04,
        bracket: 4300,
      },
      {
        rate: 0.055,
        bracket: 8500,
      },
    ],
    'married-filing-jointly': [
      {
        rate: 0.02,
        bracket: 0,
      },
      {
        rate: 0.04,
        bracket: 430,
      },
      {
        rate: 0.55,
        bracket: 8500,
      },
    ],
  },
  California: {
    single: [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 9325 },
      { rate: 0.04, bracket: 22107 },
      { rate: 0.06, bracket: 34892 },
      { rate: 0.08, bracket: 48435 },
      { rate: 0.093, bracket: 61214 },
      { rate: 0.103, bracket: 312686 },
      { rate: 0.113, bracket: 375221 },
      { rate: 0.123, bracket: 625369 },
      { rate: 0.133, bracket: 1000000 },
    ],
    'married-filing-jointly': [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 18650 },
      { rate: 0.04, bracket: 44214 },
      { rate: 0.06, bracket: 69784 },
      { rate: 0.08, bracket: 96870 },
      { rate: 0.093, bracket: 122428 },
      { rate: 0.103, bracket: 625372 },
      { rate: 0.113, bracket: 750442 },
      { rate: 0.123, bracket: 1000000 },
      { rate: 0.133, bracket: 1250738 },
    ],
  },
  Colorado: {
    single: [{ rate: 0.0455, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0455, bracket: 0 }],
  },
  Connecticut: {
    single: [
      { rate: 0.03, bracket: 0 },
      { rate: 0.05, bracket: 10000 },
      { rate: 0.055, bracket: 50000 },
      { rate: 0.06, bracket: 100000 },
      { rate: 0.065, bracket: 200000 },
      { rate: 0.069, bracket: 250000 },
      { rate: 0.0699, bracket: 500000 },
    ],
    'married-filing-jointly': [
      { rate: 0.03, bracket: 0 },
      { rate: 0.05, bracket: 20000 },
      { rate: 0.055, bracket: 100000 },
      { rate: 0.06, bracket: 200000 },
      { rate: 0.065, bracket: 400000 },
      { rate: 0.069, bracket: 500000 },
      { rate: 0.0699, bracket: 1000000 },
    ],
  },
  Delaware: {
    single: [
      { rate: 0.022, bracket: 2000 },
      { rate: 0.039, bracket: 5000 },
      { rate: 0.048, bracket: 10000 },
      { rate: 0.052, bracket: 20000 },
      { rate: 0.0555, bracket: 25000 },
      { rate: 0.066, bracket: 60000 },
    ],
    'married-filing-jointly': [
      { rate: 0.022, bracket: 2000 },
      { rate: 0.039, bracket: 5000 },
      { rate: 0.048, bracket: 10000 },
      { rate: 0.052, bracket: 20000 },
      { rate: 0.0555, bracket: 25000 },
      { rate: 0.066, bracket: 60000 },
    ],
  },
  Florida: {},
  Georgia: {
    single: [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 750 },
      { rate: 0.03, bracket: 2250 },
      { rate: 0.04, bracket: 3750 },
      { rate: 0.05, bracket: 5250 },
      { rate: 0.0575, bracket: 7000 },
    ],
    'married-filing-jointly': [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 1000 },
      { rate: 0.03, bracket: 3000 },
      { rate: 0.04, bracket: 5000 },
      { rate: 0.05, bracket: 7000 },
      { rate: 0.0575, bracket: 10000 },
    ],
  },
  Hawaii: {
    single: [
      { rate: 0.014, bracket: 0 },
      { rate: 0.032, bracket: 2400 },
      { rate: 0.055, bracket: 4800 },
      { rate: 0.064, bracket: 9600 },
      { rate: 0.068, bracket: 14400 },
      { rate: 0.072, bracket: 19200 },
      { rate: 0.076, bracket: 24000 },
      { rate: 0.079, bracket: 36000 },
      { rate: 0.0825, bracket: 48000 },
      { rate: 0.09, bracket: 150000 },
      { rate: 0.1, bracket: 175000 },
      { rate: 0.11, bracket: 200000 },
    ],
    'married-filing-jointly': [
      { rate: 0.014, bracket: 0 },
      { rate: 0.032, bracket: 4800 },
      { rate: 0.055, bracket: 9600 },
      { rate: 0.064, bracket: 19200 },
      { rate: 0.068, bracket: 28800 },
      { rate: 0.072, bracket: 38400 },
      { rate: 0.076, bracket: 48000 },
      { rate: 0.079, bracket: 72000 },
      { rate: 0.0825, bracket: 96000 },
      { rate: 0.09, bracket: 300000 },
      { rate: 0.1, bracket: 350000 },
      { rate: 0.11, bracket: 400000 },
    ],
  },
  Idaho: {
    single: [
      { rate: 0.01, bracket: 0 },
      { rate: 0.03, bracket: 1588 },
      { rate: 0.045, bracket: 4763 },
      { rate: 0.06, bracket: 7939 },
    ],
    'married-filing-jointly': [
      { rate: 0.01, bracket: 0 },
      { rate: 0.03, bracket: 3176 },
      { rate: 0.045, bracket: 9526 },
      { rate: 0.06, bracket: 15878 },
    ],
  },
  Illinois: {
    single: [{ rate: 0.0495, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0495, bracket: 0 }],
  },
  Indiana: {
    single: [{ rate: 0.0323, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0323, bracket: 0 }],
  },
  Iowa: {
    single: [
      { rate: 0.0033, bracket: 0 },
      { rate: 0.0067, bracket: 1743 },
      { rate: 0.0225, bracket: 3486 },
      { rate: 0.0414, bracket: 6972 },
      { rate: 0.0563, bracket: 15687 },
      { rate: 0.0596, bracket: 26145 },
      { rate: 0.0625, bracket: 34860 },
      { rate: 0.0744, bracket: 52290 },
      { rate: 0.0853, bracket: 78435 },
    ],
    'married-filing-jointly': [
      { rate: 0.0033, bracket: 0 },
      { rate: 0.0067, bracket: 1743 },
      { rate: 0.0225, bracket: 3486 },
      { rate: 0.0414, bracket: 6972 },
      { rate: 0.0563, bracket: 15687 },
      { rate: 0.0596, bracket: 26145 },
      { rate: 0.0625, bracket: 34860 },
      { rate: 0.0744, bracket: 52290 },
      { rate: 0.0853, bracket: 78435 },
    ],
  },
  Kansas: {
    single: [
      { rate: 0.031, bracket: 0 },
      { rate: 0.0525, bracket: 15000 },
      { rate: 0.057, bracket: 30000 },
    ],
    'married-filing-jointly': [
      { rate: 0.031, bracket: 0 },
      { rate: 0.0525, bracket: 30000 },
      { rate: 0.057, bracket: 60000 },
    ],
  },
  Kentucky: {
    single: [{ rate: 0.05, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.05, bracket: 0 }],
  },
  Louisiana: {
    single: [
      { rate: 0.0185, bracket: 0 },
      { rate: 0.035, bracket: 12500 },
      { rate: 0.0425, bracket: 50000 },
    ],
    'married-filing-jointly': [
      { rate: 0.0185, bracket: 0 },
      { rate: 0.035, bracket: 25000 },
      { rate: 0.0425, bracket: 100000 },
    ],
  },
  Maine: {
    single: [
      { rate: 0.058, bracket: 0 },
      { rate: 0.0675, bracket: 23000 },
      { rate: 0.0715, bracket: 54450 },
    ],
    'married-filing-jointly': [
      { rate: 0.058, bracket: 0 },
      { rate: 0.0675, bracket: 46000 },
      { rate: 0.0715, bracket: 108900 },
    ],
  },
  Maryland: {
    single: [
      { rate: 0.02, bracket: 0 },
      { rate: 0.03, bracket: 1000 },
      { rate: 0.04, bracket: 2000 },
      { rate: 0.0475, bracket: 3000 },
      { rate: 0.05, bracket: 100000 },
      { rate: 0.0525, bracket: 125000 },
      { rate: 0.055, bracket: 150000 },
      { rate: 0.0575, bracket: 250000 },
    ],
    'married-filing-jointly': [
      { rate: 0.02, bracket: 0 },
      { rate: 0.03, bracket: 1000 },
      { rate: 0.04, bracket: 2000 },
      { rate: 0.0475, bracket: 3000 },
      { rate: 0.05, bracket: 150000 },
      { rate: 0.0525, bracket: 175000 },
      { rate: 0.055, bracket: 225000 },
      { rate: 0.0575, bracket: 300000 },
    ],
  },
  Massachusetts: {
    single: [{ rate: 0.05, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.05, bracket: 0 }],
  },
  Michigan: {
    single: [{ rate: 0.0425, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0425, bracket: 0 }],
  },
  Minnesota: {
    single: [
      { rate: 0.0535, bracket: 0 },
      { rate: 0.068, bracket: 28080 },
      { rate: 0.0785, bracket: 92230 },
      { rate: 0.0985, bracket: 171220 },
    ],
    'married-filing-jointly': [
      { rate: 0.0535, bracket: 0 },
      { rate: 0.068, bracket: 41050 },
      { rate: 0.0785, bracket: 163060 },
      { rate: 0.0985, bracket: 284810 },
    ],
  },
  Mississippi: {
    single: [
      { rate: 0.04, bracket: 0 },
      { rate: 0.05, bracket: 10000 },
    ],
    'married-filing-jointly': [
      { rate: 0.05, bracket: 0 },
      { rate: 0.05, bracket: 10000 },
    ],
  },
  Missouri: {
    single: [
      { rate: 0.015, bracket: 108 },
      { rate: 0.02, bracket: 1088 },
      { rate: 0.025, bracket: 2176 },
      { rate: 0.03, bracket: 3264 },
      { rate: 0.035, bracket: 4352 },
      { rate: 0.04, bracket: 5440 },
      { rate: 0.045, bracket: 6528 },
      { rate: 0.05, bracket: 7616 },
      { rate: 0.054, bracket: 8704 },
    ],
    'married-filing-jointly': [
      { rate: 0.015, bracket: 108 },
      { rate: 0.02, bracket: 1088 },
      { rate: 0.025, bracket: 2176 },
      { rate: 0.03, bracket: 3264 },
      { rate: 0.035, bracket: 4352 },
      { rate: 0.04, bracket: 5440 },
      { rate: 0.045, bracket: 6528 },
      { rate: 0.05, bracket: 7616 },
      { rate: 0.054, bracket: 8704 },
    ],
  },
  Montana: {
    single: [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 3100 },
      { rate: 0.03, bracket: 5500 },
      { rate: 0.04, bracket: 8400 },
      { rate: 0.05, bracket: 11400 },
      { rate: 0.06, bracket: 14600 },
      { rate: 0.0675, bracket: 18800 },
    ],
    'married-filing-jointly': [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 3100 },
      { rate: 0.03, bracket: 5500 },
      { rate: 0.04, bracket: 8400 },
      { rate: 0.05, bracket: 11400 },
      { rate: 0.06, bracket: 14600 },
      { rate: 0.0675, bracket: 18800 },
    ],
  },
  Nebraska: {
    single: [
      { rate: 0.0246, bracket: 0 },
      { rate: 0.0351, bracket: 3440 },
      { rate: 0.0501, bracket: 20590 },
      { rate: 0.0684, bracket: 33180 },
    ],
    'married-filing-jointly': [
      { rate: 0.0246, bracket: 0 },
      { rate: 0.0351, bracket: 6860 },
      { rate: 0.0501, bracket: 41190 },
      { rate: 0.0684, bracket: 66360 },
    ],
  },
  Nevada: {},
  'New Hampshire': {},
  'New Jersey': {
    single: [
      { rate: 0.014, bracket: 0 },
      { rate: 0.0175, bracket: 20000 },
      { rate: 0.035, bracket: 35000 },
      { rate: 0.05525, bracket: 40000 },
      { rate: 0.0637, bracket: 75000 },
      { rate: 0.0897, bracket: 500000 },
      { rate: 0.1075, bracket: 1000000 },
    ],
    'married-filing-jointly': [
      { rate: 0.014, bracket: 0 },
      { rate: 0.0175, bracket: 20000 },
      { rate: 0.0245, bracket: 50000 },
      { rate: 0.035, bracket: 70000 },
      { rate: 0.05525, bracket: 80000 },
      { rate: 0.0637, bracket: 150000 },
      { rate: 0.0897, bracket: 500000 },
      { rate: 0.1075, bracket: 1000000 },
    ],
  },
  'New Mexico': {
    single: [
      { rate: 0.017, bracket: 0 },
      { rate: 0.032, bracket: 5500 },
      { rate: 0.047, bracket: 11000 },
      { rate: 0.049, bracket: 16000 },
      { rate: 0.059, bracket: 210000 },
    ],
    'married-filing-jointly': [
      { rate: 0.017, bracket: 0 },
      { rate: 0.032, bracket: 8000 },
      { rate: 0.047, bracket: 16000 },
      { rate: 0.049, bracket: 24000 },
      { rate: 0.059, bracket: 315000 },
    ],
  },
  'New York': {
    single: [
      { rate: 0.04, bracket: 0 },
      { rate: 0.045, bracket: 8500 },
      { rate: 0.0525, bracket: 11700 },
      { rate: 0.0585, bracket: 13900 },
      { rate: 0.0625, bracket: 80650 },
      { rate: 0.0685, bracket: 215400 },
      { rate: 0.0965, bracket: 1077550 },
      { rate: 0.103, bracket: 5000000 },
      { rate: 0.109, bracket: 25000000 },
    ],
    'married filing jointly': [
      { rate: 0.04, bracket: 0 },
      { rate: 0.045, bracket: 17150 },
      { rate: 0.0525, bracket: 23600 },
      { rate: 0.0585, bracket: 27900 },
      { rate: 0.0625, bracket: 161550 },
      { rate: 0.0685, bracket: 323200 },
      { rate: 0.0965, bracket: 2155350 },
      { rate: 0.103, bracket: 5000000 },
      { rate: 0.109, bracket: 25000000 },
    ],
  },
  'North Carolina': {
    single: [{ rate: 0.0499, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0499, bracket: 0 }],
  },
  'North Dakota': {
    single: [
      { rate: 0.011, bracket: 0 },
      { rate: 0.0204, bracket: 40525 },
      { rate: 0.0227, bracket: 98100 },
      { rate: 0.0264, bracket: 204675 },
      { rate: 0.029, bracket: 445000 },
    ],
    'married-filing-jointly': [
      { rate: 0.011, bracket: 0 },
      { rate: 0.0204, bracket: 67700 },
      { rate: 0.0227, bracket: 163550 },
      { rate: 0.0264, bracket: 249150 },
      { rate: 0.029, bracket: 445000 },
    ],
  },
  Ohio: {
    single: [
      { rate: 0.02765, bracket: 25000 },
      { rate: 0.03226, bracket: 44250 },
      { rate: 0.03688, bracket: 88450 },
      { rate: 0.0399, bracket: 110650 },
    ],
    'married-filing-jointly': [
      { rate: 0.02765, bracket: 25000 },
      { rate: 0.03226, bracket: 44250 },
      { rate: 0.03688, bracket: 88450 },
      { rate: 0.0399, bracket: 110650 },
    ],
  },
  Oklahoma: {
    single: [
      { rate: 0.0025, bracket: 0 },
      { rate: 0.0075, bracket: 1000 },
      { rate: 0.0175, bracket: 2500 },
      { rate: 0.0275, bracket: 3750 },
      { rate: 0.0375, bracket: 4900 },
      { rate: 0.0475, bracket: 7200 },
    ],
    'married-filing-jointly': [
      { rate: 0.0025, bracket: 0 },
      { rate: 0.0075, bracket: 2000 },
      { rate: 0.0175, bracket: 5000 },
      { rate: 0.0275, bracket: 7500 },
      { rate: 0.0375, bracket: 9800 },
      { rate: 0.0475, bracket: 12200 },
    ],
  },
  Oregon: {
    single: [
      { rate: 0.0475, bracket: 0 },
      { rate: 0.0675, bracket: 3650 },
      { rate: 0.0875, bracket: 9200 },
      { rate: 0.099, bracket: 125000 },
    ],
    'married-filing-jointly': [
      { rate: 0.0475, bracket: 0 },
      { rate: 0.0675, bracket: 7300 },
      { rate: 0.0875, bracket: 18400 },
      { rate: 0.099, bracket: 250000 },
    ],
  },
  Pennsylvania: {
    single: [{ rate: 0.0307, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0307, bracket: 0 }],
  },
  'Rhode Island': {
    single: [
      { rate: 0.01, bracket: 0 },
      { rate: 0.02, bracket: 18650 },
      { rate: 0.04, bracket: 44214 },
    ],
    'married-filing-jointly': [
      { rate: 0.03, bracket: 0 },
      { rate: 0.05, bracket: 10000 },
      { rate: 0.055, bracket: 50000 },
    ],
  },
  'South Carolina': {
    single: [
      { rate: 0.0, bracket: 0 },
      { rate: 0.03, bracket: 3200 },
      { rate: 0.04, bracket: 6410 },
      { rate: 0.05, bracket: 9620 },
      { rate: 0.06, bracket: 12820 },
      { rate: 0.07, bracket: 16040 },
    ],
    'married-filing-jointly': [
      { rate: 0.0, bracket: 0 },
      { rate: 0.03, bracket: 3200 },
      { rate: 0.04, bracket: 6410 },
      { rate: 0.05, bracket: 9620 },
      { rate: 0.06, bracket: 12820 },
      { rate: 0.07, bracket: 16040 },
    ],
  },
  'South Dakota': {},
  Tennessee: {},
  Texas: {},
  Utah: {
    single: [{ rate: 0.0495, bracket: 0 }],
    'married-filing-jointly': [{ rate: 0.0495, bracket: 0 }],
  },
  Vermont: {
    single: [
      { rate: 0.0335, bracket: 0 },
      { rate: 0.066, bracket: 40950 },
      { rate: 0.076, bracket: 99200 },
      { rate: 0.0875, bracket: 206950 },
    ],
    'married-filing-jointly': [
      { rate: 0.0335, bracket: 0 },
      { rate: 0.066, bracket: 68400 },
      { rate: 0.076, bracket: 165350 },
      { rate: 0.0875, bracket: 251950 },
    ],
  },
  Virginia: {
    single: [
      { rate: 0.02, bracket: 0 },
      { rate: 0.03, bracket: 3000 },
      { rate: 0.05, bracket: 5000 },
      { rate: 0.0575, bracket: 17000 },
    ],
    'married-filing-jointly': [
      { rate: 0.02, bracket: 0 },
      { rate: 0.03, bracket: 3000 },
      { rate: 0.05, bracket: 5000 },
      { rate: 0.0575, bracket: 17000 },
    ],
  },
  Washington: {},
  'West Virginia': {
    single: [
      { rate: 0.03, bracket: 0 },
      { rate: 0.04, bracket: 10000 },
      { rate: 0.045, bracket: 25000 },
      { rate: 0.06, bracket: 40000 },
      { rate: 0.065, bracket: 60000 },
    ],
    'married-filing-jointly': [
      { rate: 0.03, bracket: 0 },
      { rate: 0.04, bracket: 10000 },
      { rate: 0.045, bracket: 25000 },
      { rate: 0.06, bracket: 40000 },
      { rate: 0.065, bracket: 60000 },
    ],
  },
  Wisconsin: {
    single: [
      { rate: 0.0354, bracket: 0 },
      { rate: 0.0465, bracket: 12760 },
      { rate: 0.053, bracket: 25520 },
      { rate: 0.0765, bracket: 280950 },
    ],
    'married-filing-jointly': [
      { rate: 0.0354, bracket: 0 },
      { rate: 0.0465, bracket: 17010 },
      { rate: 0.053, bracket: 34030 },
      { rate: 0.0765, bracket: 374600 },
    ],
  },
  Wyoming: {},
  'District of Columbia': {
    single: [
      { rate: 0.04, bracket: 0 },
      { rate: 0.06, bracket: 10000 },
      { rate: 0.065, bracket: 40000 },
      { rate: 0.085, bracket: 60000 },
      { rate: 0.0925, bracket: 250000 },
      { rate: 0.0975, bracket: 500000 },
      { rate: 0.1075, bracket: 1000000 },
    ],
    'married-filing-jointly': [
      { rate: 0.04, bracket: 0 },
      { rate: 0.06, bracket: 10000 },
      { rate: 0.065, bracket: 40000 },
      { rate: 0.085, bracket: 60000 },
      { rate: 0.0925, bracket: 250000 },
      { rate: 0.0975, bracket: 500000 },
      { rate: 0.1075, bracket: 1000000 },
    ],
  },
}

export const stateStandardDeductions = {
  Alabama: {
    single: 2500,
    'married-filing-jointly': 7500,
  },
  Alaska: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Arizona: {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Arkansas: {
    single: 2200,
    'married-filing-jointly': 4400,
  },
  California: {
    single: 4803,
    'married-filing-jointly': 9606,
  },
  Colorado: {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Connecticut: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Delaware: {
    single: 3250,
    'married-filing-jointly': 6500,
  },
  Florida: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Georgia: {
    single: 4600,
    'married-filing-jointly': 6000,
  },
  Hawaii: {
    single: 2200,
    'married-filing-jointly': 4400,
  },
  Idaho: {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Illinois: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Indiana: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Iowa: {
    single: 2210,
    'married-filing-jointly': 5450,
  },
  Kansas: {
    single: 3500,
    'married-filing-jointly': 8000,
  },
  Kentucky: {
    single: 2770,
    'married-filing-jointly': 5540,
  },
  Louisiana: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Maine: {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Maryland: {
    single: 2350,
    'married-filing-jointly': 4700,
  },
  Massachusetts: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Michigan: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Minnesota: {
    single: 12900,
    'married-filing-jointly': 25800,
  },
  Mississippi: {
    single: 2300,
    'married-filing-jointly': 4600,
  },
  Missouri: {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Montana: {
    single: 4830,
    'married-filing-jointly': 9660,
  },
  Nebraska: {
    single: 7350,
    'married-filing-jointly': 14700,
  },
  Nevada: {
    single: 0,
    'married-filing-jointly': 0,
  },
  'New Hampshire': {
    single: 0,
    'married-filing-jointly': 0,
  },
  'New Jersey': {
    single: 0,
    'married-filing-jointly': 0,
  },
  'New Mexico': {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  'New York': {
    single: 8000,
    'married-filing-jointly': 16050,
  },
  'North Carolina': {
    single: 12750,
    'married-filing-jointly': 25500,
  },
  'North Dakota': {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  Ohio: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Oklahoma: {
    single: 6350,
    'married-filing-jointly': 12700,
  },
  Oregon: {
    single: 2420,
    'married-filing-jointly': 4840,
  },
  Pennsylvania: {
    single: 0,
    'married-filing-jointly': 0,
  },
  'Rhode Island': {
    single: 9300,
    'married-filing-jointly': 18600,
  },
  'South Carolina': {
    single: 12950,
    'married-filing-jointly': 25900,
  },
  'South Dakota': {
    single: 0,
    'married-filing-jointly': 0,
  },
  Tennessee: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Texas: {
    single: 0,
    'married-filing-jointly': 0,
  },
  Utah: {
    single: 777,
    'married-filing-jointly': 1554,
  },
  Vermont: {
    single: 6350,
    'married-filing-jointly': 12700,
  },
  Virginia: {
    single: 4500,
    'married-filing-jointly': 9000,
  },
  Washington: {
    single: 250000,
    'married-filing-jointly': 250000,
  },
  'West Virginia': {
    single: 0,
    'married-filing-jointly': 0,
  },
  Wisconsin: {
    single: 11790,
    'married-filing-jointly': 21820,
  },
  Wyoming: {
    single: 0,
    'married-filing-jointly': 0,
  },
  'District of Columbia': {
    single: 12950,
    'married-filing-jointly': 25900,
  },
}
