// This file contains a function that recieved the output of the named entity recognition and returns the 0th index of flowData
// The output of the named entiry recognition is like the following:
// const extractedEntities =  {
//     "income": [{"name": [string], "value": [number], "period":[string]}],
//     "expense": [{"name": [string], "value": [number], "period":[string]}],
//     "stocks_portfolio": [{"name": [string], "value":[number]}],
//     "real_estate": [{"name": [string], "value":[number]}],
//     "real_assets: [{"name": [string], "value":[number], "type":[string]}],
//     "cash": [{"name": [string], "value":[number]}],
//     "debt": [{"name": [string], "value":[number], "interest_rate":[number],  "type":[string]}],
// }
import configs from "@/appConfig"
import { template } from "lodash";

const templateFlowData = {
  "elements": [
    {
      "id": "FiNiczq-aDgJi8mMPN7n3",
      "type": "rectangle",
      "x": 370.3125,
      "y": 368.13671875,
      "width": 153,
      "height": 89,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 522996053,
      "version": 144,
      "versionNonce": 1092216235,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "cTxaKPyAcoBg8ddq1oLRo"
        },
        {
          "id": "a7MoLfIM54OUjhtbIQQ4_",
          "type": "arrow"
        },
        {
          "id": "lpg9lrjJOQYNhGzIsygpW",
          "type": "arrow"
        },
        {
          "id": "MN03C-tqja7318kntyJKf",
          "type": "arrow"
        },
        {
          "id": "_coQ5O41ZfALh32TM-sH_",
          "type": "arrow"
        },
        {
          "id": "hc0spWzIta96y84ZoWKgf",
          "type": "arrow"
        },
        {
          "id": "hRYZtPKJGew7pnvP1msul",
          "type": "arrow"
        },
        {
          "id": "yAf5XBLt4PtN8vqGkcEso",
          "type": "arrow"
        },
        {
          "id": "Td5RtAoqGz6kostv5jB07",
          "type": "arrow"
        },
        {
          "id": "me4JJ3qJmoCUHlyQSf3Ks",
          "type": "arrow"
        },
        {
          "id": "IOqCZ8mQ8S5Hq-rpnnoJ-",
          "type": "arrow"
        },
        {
          "id": "m3aykrerPTnnTIeR1qGSx",
          "type": "arrow"
        }
      ],
      "updated": 1679768412624,
      "link": null,
      "locked": false
    },
    {
      "id": "cTxaKPyAcoBg8ddq1oLRo",
      "type": "text",
      "x": 422.8125,
      "y": 400.13671875,
      "width": 52,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1283015349,
      "version": 71,
      "versionNonce": 1366343131,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464927474,
      "link": null,
      "locked": false,
      "text": "Cash",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "FiNiczq-aDgJi8mMPN7n3",
      "originalText": "Cash"
    },
    {
      "id": "C1uYcW8SJ8BCmY9IE8sU2",
      "type": "ellipse",
      "x": 270.03515625,
      "y": 226.14453125,
      "width": 136,
      "height": 81,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 909058299,
      "version": 172,
      "versionNonce": 1596789685,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "1s3ZgLl2Gnadf9NCyA7m2"
        },
        {
          "id": "a7MoLfIM54OUjhtbIQQ4_",
          "type": "arrow"
        }
      ],
      "updated": 1679463982937,
      "link": null,
      "locked": false
    },
    {
      "id": "1s3ZgLl2Gnadf9NCyA7m2",
      "type": "text",
      "x": 305.03515625,
      "y": 254.14453125,
      "width": 66,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1543528059,
      "version": 60,
      "versionNonce": 1151790619,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679463982937,
      "link": null,
      "locked": false,
      "text": "Income",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "C1uYcW8SJ8BCmY9IE8sU2",
      "originalText": "Income"
    },
    {
      "id": "a7MoLfIM54OUjhtbIQQ4_",
      "type": "arrow",
      "x": 365.3617655187521,
      "y": 305.55602704597436,
      "width": 27.301877596412965,
      "height": 60.823094081088584,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 872257589,
      "version": 430,
      "versionNonce": 233982587,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464927492,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          27.301877596412965,
          60.823094081088584
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "C1uYcW8SJ8BCmY9IE8sU2",
        "gap": 1.7881879151407412,
        "focus": -0.14161614898926736
      },
      "endBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 1.7575976229370307,
        "focus": -0.3460491252215555
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "Pn7UZCgu2WulsLTRLzbPL",
      "type": "ellipse",
      "x": 414.31640625,
      "y": 219.50390625,
      "width": 138,
      "height": 89,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1169065013,
      "version": 224,
      "versionNonce": 936816821,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "HWumUuEtHkYY6ySzjJtSG"
        },
        {
          "id": "lpg9lrjJOQYNhGzIsygpW",
          "type": "arrow"
        }
      ],
      "updated": 1679463987139,
      "link": null,
      "locked": false
    },
    {
      "id": "HWumUuEtHkYY6ySzjJtSG",
      "type": "text",
      "x": 438.31640625,
      "y": 251.50390625,
      "width": 90,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1790561755,
      "version": 116,
      "versionNonce": 1521590555,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679463987139,
      "link": null,
      "locked": false,
      "text": "Income 2",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "Pn7UZCgu2WulsLTRLzbPL",
      "originalText": "Income 2"
    },
    {
      "id": "lpg9lrjJOQYNhGzIsygpW",
      "type": "arrow",
      "x": 464.66808036860743,
      "y": 308.53391807820606,
      "width": 32.45780080415432,
      "height": 58.28287589197737,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 2030066741,
      "version": 519,
      "versionNonce": 668549915,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464927492,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          -32.45780080415432,
          58.28287589197737
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "Pn7UZCgu2WulsLTRLzbPL",
        "gap": 1.6665113124231423,
        "focus": -0.08594979769449723
      },
      "endBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 1.319924779816606,
        "focus": -0.3961152944798708
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "XydYueIzacceu5gnZTi6W",
      "type": "ellipse",
      "x": 566.44140625,
      "y": 215.3046875,
      "width": 141,
      "height": 93,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 2071876533,
      "version": 195,
      "versionNonce": 2139562875,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "9ngqmtOQcuE_oRonZ8uN5"
        },
        {
          "id": "MN03C-tqja7318kntyJKf",
          "type": "arrow"
        }
      ],
      "updated": 1679463993376,
      "link": null,
      "locked": false
    },
    {
      "id": "9ngqmtOQcuE_oRonZ8uN5",
      "type": "text",
      "x": 591.94140625,
      "y": 249.3046875,
      "width": 90,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1466181339,
      "version": 111,
      "versionNonce": 2055939509,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679463993376,
      "link": null,
      "locked": false,
      "text": "Income 3",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "XydYueIzacceu5gnZTi6W",
      "originalText": "Income 3"
    },
    {
      "id": "MN03C-tqja7318kntyJKf",
      "type": "arrow",
      "x": 586.9458706727448,
      "y": 297.76296274887295,
      "width": 101.43170437699195,
      "height": 68.02602788986405,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1230091061,
      "version": 627,
      "versionNonce": 664283067,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464927492,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          -101.43170437699195,
          68.02602788986405
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "XydYueIzacceu5gnZTi6W",
        "gap": 2.718670406095057,
        "focus": -0.03792329465263441
      },
      "endBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 2.3477281112629664,
        "focus": -0.2180684571740568
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "Jtg3-OGzyRr-3D2Y5MxGD",
      "type": "ellipse",
      "x": 217.734375,
      "y": 568.80078125,
      "width": 149,
      "height": 93,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1854468443,
      "version": 179,
      "versionNonce": 1538664475,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "pj95hbmmJzjGNPjIJLfEu"
        },
        {
          "id": "yAf5XBLt4PtN8vqGkcEso",
          "type": "arrow"
        }
      ],
      "updated": 1679464993188,
      "link": null,
      "locked": false
    },
    {
      "id": "pj95hbmmJzjGNPjIJLfEu",
      "type": "text",
      "x": 245.734375,
      "y": 602.80078125,
      "width": 93,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 568874037,
      "version": 138,
      "versionNonce": 3422997,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464993188,
      "link": null,
      "locked": false,
      "text": "Expense 1",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "Jtg3-OGzyRr-3D2Y5MxGD",
      "originalText": "Expense 1"
    },
    {
      "id": "yAf5XBLt4PtN8vqGkcEso",
      "type": "arrow",
      "x": 384.86735845733114,
      "y": 458.32162532794416,
      "width": 63.37316158306129,
      "height": 110.43461342805233,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1222305909,
      "version": 424,
      "versionNonce": 1753616501,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464993188,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          -63.37316158306129,
          110.43461342805233
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "focus": 0.3503659281503775,
        "gap": 1.1849065779441617
      },
      "endBinding": {
        "elementId": "Jtg3-OGzyRr-3D2Y5MxGD",
        "focus": 0.03222516444149392,
        "gap": 3.6912069163150534
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "EaX4YwqhGJ8uhG5YQBZgZ",
      "type": "ellipse",
      "x": 376.30078125,
      "y": 568.6640625,
      "width": 144,
      "height": 94,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 306476789,
      "version": 209,
      "versionNonce": 1068955893,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "EmH6rLW_SXTiqdvPpr_Hb"
        },
        {
          "id": "_coQ5O41ZfALh32TM-sH_",
          "type": "arrow"
        }
      ],
      "updated": 1679464991114,
      "link": null,
      "locked": false
    },
    {
      "id": "EmH6rLW_SXTiqdvPpr_Hb",
      "type": "text",
      "x": 397.30078125,
      "y": 603.1640625,
      "width": 102,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1730787419,
      "version": 162,
      "versionNonce": 1980300507,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464991114,
      "link": null,
      "locked": false,
      "text": "Expense 2",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "EaX4YwqhGJ8uhG5YQBZgZ",
      "originalText": "Expense 2"
    },
    {
      "id": "_coQ5O41ZfALh32TM-sH_",
      "type": "arrow",
      "x": 414.6298413083154,
      "y": 458.3530430029332,
      "width": 9.712625435343682,
      "height": 110.47859372688617,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1980266523,
      "version": 583,
      "versionNonce": 321563003,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464991114,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          9.712625435343682,
          110.47859372688617
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 1.2163242529330867,
        "focus": 0.44997761653448043
      },
      "endBinding": {
        "elementId": "EaX4YwqhGJ8uhG5YQBZgZ",
        "gap": 2.4626100242248947,
        "focus": -0.27511794675136664
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "gYAVIixOYl1CTjjXUHzK9",
      "type": "ellipse",
      "x": 529.92578125,
      "y": 571.328125,
      "width": 160,
      "height": 92,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1389644181,
      "version": 229,
      "versionNonce": 1467269627,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "-OIGrBd12LNf4kPbGtipn"
        },
        {
          "id": "hc0spWzIta96y84ZoWKgf",
          "type": "arrow"
        }
      ],
      "updated": 1679464989212,
      "link": null,
      "locked": false
    },
    {
      "id": "-OIGrBd12LNf4kPbGtipn",
      "type": "text",
      "x": 559.42578125,
      "y": 604.828125,
      "width": 101,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 661589947,
      "version": 182,
      "versionNonce": 413970229,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464989212,
      "link": null,
      "locked": false,
      "text": "Expense 3",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "gYAVIixOYl1CTjjXUHzK9",
      "originalText": "Expense 3"
    },
    {
      "id": "hc0spWzIta96y84ZoWKgf",
      "type": "arrow",
      "x": 439.79630617566124,
      "y": 459.3960771120197,
      "width": 126.49562994633698,
      "height": 116.52913012083195,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 2113718139,
      "version": 594,
      "versionNonce": 505086101,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464989212,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          126.49562994633698,
          116.52913012083195
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 2.2593583620196895,
        "focus": 0.4627198372033437
      },
      "endBinding": {
        "elementId": "gYAVIixOYl1CTjjXUHzK9",
        "gap": 2.7317486334904415,
        "focus": 0.013893007889283103
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "VolGD81seXNd-KQYCeRln",
      "type": "ellipse",
      "x": 700.24609375,
      "y": 568.43359375,
      "width": 154.89062500000006,
      "height": 98.49218749999997,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1158329237,
      "version": 181,
      "versionNonce": 1749284437,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "u9TZfAoNkWQ7q2nqUH5-r"
        },
        {
          "id": "hRYZtPKJGew7pnvP1msul",
          "type": "arrow"
        }
      ],
      "updated": 1679464986148,
      "link": null,
      "locked": false
    },
    {
      "id": "u9TZfAoNkWQ7q2nqUH5-r",
      "type": "text",
      "x": 727.69140625,
      "y": 605.1796875,
      "width": 100,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1361141595,
      "version": 54,
      "versionNonce": 652019067,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464986148,
      "link": null,
      "locked": false,
      "text": "Expense 4",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "VolGD81seXNd-KQYCeRln",
      "originalText": "Expense 4"
    },
    {
      "id": "hRYZtPKJGew7pnvP1msul",
      "type": "arrow",
      "x": 480.6312277584134,
      "y": 459.16622611414425,
      "width": 236.83577318191897,
      "height": 124.2568983999339,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1373036315,
      "version": 358,
      "versionNonce": 1773444635,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679464986148,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          236.83577318191897,
          124.2568983999339
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "gap": 2.0295073641442354,
        "focus": 0.3404873269008862
      },
      "endBinding": {
        "elementId": "VolGD81seXNd-KQYCeRln",
        "gap": 2.685562327103906,
        "focus": 0.041656932212374743
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "ol4liQgg4HEeiIko4eqeb",
      "type": "rectangle",
      "x": 608.74609375,
      "y": 447.515625,
      "width": 141.1953125,
      "height": 79.57421875,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 112605653,
      "version": 127,
      "versionNonce": 1289802229,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "JuUAJhMWkNDU5qYnSMOtj"
        },
        {
          "id": "Td5RtAoqGz6kostv5jB07",
          "type": "arrow"
        }
      ],
      "updated": 1679465160838,
      "link": null,
      "locked": false
    },
    {
      "id": "JuUAJhMWkNDU5qYnSMOtj",
      "type": "text",
      "x": 647.34375,
      "y": 474.802734375,
      "width": 64,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1544328437,
      "version": 50,
      "versionNonce": 197473243,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465160838,
      "link": null,
      "locked": false,
      "text": "Debt 1",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "ol4liQgg4HEeiIko4eqeb",
      "originalText": "Debt 1"
    },
    {
      "id": "x2oMEXlRpa3shqFyzqDHB",
      "type": "rectangle",
      "x": 760.5,
      "y": 446.26953125,
      "width": 144.24609374999997,
      "height": 81.3203125,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 1340595157,
      "version": 188,
      "versionNonce": 1135980507,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "lV8pi263EFlNsM0wU3BF_"
        },
        {
          "id": "me4JJ3qJmoCUHlyQSf3Ks",
          "type": "arrow"
        }
      ],
      "updated": 1679465179807,
      "link": null,
      "locked": false
    },
    {
      "id": "lV8pi263EFlNsM0wU3BF_",
      "type": "text",
      "x": 796.123046875,
      "y": 474.4296875,
      "width": 73,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 943006299,
      "version": 22,
      "versionNonce": 1930494293,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465162276,
      "link": null,
      "locked": false,
      "text": "Debt 2",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "x2oMEXlRpa3shqFyzqDHB",
      "originalText": "Debt 2"
    },
    {
      "id": "Y-sq7Eb6aKADbzwVw5NNJ",
      "type": "rectangle",
      "x": 917.49609375,
      "y": 446.5390625,
      "width": 137,
      "height": 83,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 1174168091,
      "version": 193,
      "versionNonce": 651261493,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "lAeyNFbnX4hAKbFfMJyjp"
        },
        {
          "id": "IOqCZ8mQ8S5Hq-rpnnoJ-",
          "type": "arrow"
        }
      ],
      "updated": 1679465214810,
      "link": null,
      "locked": false
    },
    {
      "id": "lAeyNFbnX4hAKbFfMJyjp",
      "type": "text",
      "x": 949.49609375,
      "y": 475.5390625,
      "width": 73,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 1433808795,
      "version": 81,
      "versionNonce": 30405531,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465214810,
      "link": null,
      "locked": false,
      "text": "Debt 3",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "Y-sq7Eb6aKADbzwVw5NNJ",
      "originalText": "Debt 3"
    },
    {
      "id": "Td5RtAoqGz6kostv5jB07",
      "type": "arrow",
      "x": 524.3125,
      "y": 412.62889109052185,
      "width": 121.64835391041402,
      "height": 33.88673390947815,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 899634011,
      "version": 204,
      "versionNonce": 2102460859,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465196533,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          82.5859375,
          11.699233909478153
        ],
        [
          121.64835391041402,
          33.88673390947815
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "focus": -0.1985391807143228,
        "gap": 1
      },
      "endBinding": {
        "elementId": "ol4liQgg4HEeiIko4eqeb",
        "focus": 0.27320685012664486,
        "gap": 1
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "me4JJ3qJmoCUHlyQSf3Ks",
      "type": "arrow",
      "x": 525.4296875,
      "y": 399.33984375,
      "width": 273.87890625,
      "height": 45.19140625,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 54333851,
      "version": 125,
      "versionNonce": 224486267,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465199372,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          219.63671875,
          11.12890625
        ],
        [
          273.87890625,
          45.19140625
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "focus": -0.3572080505183728,
        "gap": 2.1171875
      },
      "endBinding": {
        "elementId": "x2oMEXlRpa3shqFyzqDHB",
        "focus": 0.24988495982802236,
        "gap": 1.73828125
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "IOqCZ8mQ8S5Hq-rpnnoJ-",
      "type": "arrow",
      "x": 524.95703125,
      "y": 386.22265625,
      "width": 428.80524842576745,
      "height": 59.296875,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1067585365,
      "version": 208,
      "versionNonce": 974055317,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465214810,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          351.9453125,
          10.7109375
        ],
        [
          428.80524842576745,
          59.296875
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "focus": -0.6148495535595777,
        "gap": 1.64453125
      },
      "endBinding": {
        "elementId": "Y-sq7Eb6aKADbzwVw5NNJ",
        "focus": 0.26112063717745154,
        "gap": 1.01953125
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    },
    {
      "id": "b0qZ6WOwQg_v8nNLoeBam",
      "type": "rectangle",
      "x": 904.9118923611111,
      "y": 292.28038194444446,
      "width": 140,
      "height": 81,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 1617217595,
      "version": 308,
      "versionNonce": 2116997643,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "34G5fwV72y4kvplSDizvZ"
        }
      ],
      "updated": 1679768374468,
      "link": null,
      "locked": false
    },
    {
      "id": "34G5fwV72y4kvplSDizvZ",
      "type": "text",
      "x": 946.9118923611111,
      "y": 320.28038194444446,
      "width": 56,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 877345813,
      "version": 229,
      "versionNonce": 1583835173,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679768374468,
      "link": null,
      "locked": false,
      "text": "House",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "b0qZ6WOwQg_v8nNLoeBam",
      "originalText": "House"
    },
    {
      "id": "9c7jPjntGnMjNAU87NBJJ",
      "type": "rectangle",
      "x": 722.6497395833334,
      "y": 293.0625,
      "width": 153,
      "height": 85,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 1817447003,
      "version": 191,
      "versionNonce": 1564665163,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "Tk5WS0pfo69YBR6CF6GOK"
        },
        {
          "id": "m3aykrerPTnnTIeR1qGSx",
          "type": "arrow"
        }
      ],
      "updated": 1679768528274,
      "link": null,
      "locked": false
    },
    {
      "id": "Tk5WS0pfo69YBR6CF6GOK",
      "type": "text",
      "x": 739.6497395833334,
      "y": 312.0625,
      "width": 119,
      "height": 46,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 214692501,
      "version": 162,
      "versionNonce": 952183013,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679768528274,
      "link": null,
      "locked": false,
      "text": "Investment \nportfolio",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 40,
      "containerId": "9c7jPjntGnMjNAU87NBJJ",
      "originalText": "Investment portfolio"
    },
    {
      "id": "Bzdmqhu_IPcLRXb66YGHT",
      "type": "rectangle",
      "x": 728.140625,
      "y": 207.3359375,
      "width": 142,
      "height": 76,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 1587160693,
      "version": 130,
      "versionNonce": 1756168219,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "Ez0G8Bc6yySVib_PxZghS"
        }
      ],
      "updated": 1679465365730,
      "link": null,
      "locked": false
    },
    {
      "id": "Ez0G8Bc6yySVib_PxZghS",
      "type": "text",
      "x": 773.640625,
      "y": 232.8359375,
      "width": 51,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 930081333,
      "version": 22,
      "versionNonce": 79094549,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465365731,
      "link": null,
      "locked": false,
      "text": "Car 1",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "Bzdmqhu_IPcLRXb66YGHT",
      "originalText": "Car 1"
    },
    {
      "id": "oAAPZhbBtq1kOAMMwqNsR",
      "type": "rectangle",
      "x": 888.2109375,
      "y": 204.31640625,
      "width": 158.62890625,
      "height": 77.5234375,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 3
      },
      "seed": 582000315,
      "version": 159,
      "versionNonce": 257036187,
      "isDeleted": false,
      "boundElements": [
        {
          "type": "text",
          "id": "s0r5hx-rrcxC64nM1nBEO"
        }
      ],
      "updated": 1679465373076,
      "link": null,
      "locked": false
    },
    {
      "id": "s0r5hx-rrcxC64nM1nBEO",
      "type": "text",
      "x": 937.525390625,
      "y": 230.578125,
      "width": 60,
      "height": 25,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": null,
      "seed": 2127137627,
      "version": 15,
      "versionNonce": 1380748181,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679465373076,
      "link": null,
      "locked": false,
      "text": "Car 2",
      "fontSize": 16,
      "fontFamily": 1,
      "textAlign": "center",
      "verticalAlign": "middle",
      "baseline": 18,
      "containerId": "oAAPZhbBtq1kOAMMwqNsR",
      "originalText": "Car 2"
    },
    {
      "id": "m3aykrerPTnnTIeR1qGSx",
      "type": "arrow",
      "x": 525.0173611111111,
      "y": 381.47842596091255,
      "width": 193.36371527777771,
      "height": 47.012964310397706,
      "angle": 0,
      "strokeColor": "#000000",
      "backgroundColor": "transparent",
      "fillStyle": "hachure",
      "strokeWidth": 1,
      "strokeStyle": "solid",
      "roughness": 1,
      "opacity": 100,
      "groupIds": [],
      "roundness": {
        "type": 2
      },
      "seed": 1503198699,
      "version": 215,
      "versionNonce": 315933765,
      "isDeleted": false,
      "boundElements": null,
      "updated": 1679768528274,
      "link": null,
      "locked": false,
      "points": [
        [
          0,
          0
        ],
        [
          193.36371527777771,
          -47.012964310397706
        ]
      ],
      "lastCommittedPoint": null,
      "startBinding": {
        "elementId": "FiNiczq-aDgJi8mMPN7n3",
        "focus": -0.19182772666612613,
        "gap": 1.7048611111110858
      },
      "endBinding": {
        "elementId": "9c7jPjntGnMjNAU87NBJJ",
        "focus": 0.3393557722557595,
        "gap": 4.268663194444571
      },
      "startArrowhead": null,
      "endArrowhead": "arrow"
    }
  ],
  "metaData": {
    "currentYear": true,
    "year": 2023,
    "month": 3,
    "netWorth": 173000,
    "finData": [
      {
        "id": "FiNiczq-aDgJi8mMPN7n3",
        "type": "cashbox",
        "data": {
          "value": 3000,
          "type": "cash-deposit"
        }
      },
      {
        "id": "cTxaKPyAcoBg8ddq1oLRo",
        "type": "none",
        "data": {
          "value": 3000,
          "type": "cash-deposit"
        }
      },
      {
        "id": "C1uYcW8SJ8BCmY9IE8sU2",
        "type": "income",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "1s3ZgLl2Gnadf9NCyA7m2",
        "type": "none",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "a7MoLfIM54OUjhtbIQQ4_",
        "type": "transaction",
        "data": {
          "value": 3500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "Pn7UZCgu2WulsLTRLzbPL",
        "type": "income",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "HWumUuEtHkYY6ySzjJtSG",
        "type": "none",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "lpg9lrjJOQYNhGzIsygpW",
        "type": "transaction",
        "data": {
          "value": 3500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "XydYueIzacceu5gnZTi6W",
        "type": "income",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "9ngqmtOQcuE_oRonZ8uN5",
        "type": "none",
        "data": {
          "value": 3500,
          "taxable": true,
          "period": "Monthly",
          "type": "employment-salary"
        }
      },
      {
        "id": "MN03C-tqja7318kntyJKf",
        "type": "transaction",
        "data": {
          "value": 3500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "Jtg3-OGzyRr-3D2Y5MxGD",
        "type": "expense",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "pj95hbmmJzjGNPjIJLfEu",
        "type": "none",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "yAf5XBLt4PtN8vqGkcEso",
        "type": "transaction",
        "data": {
          "value": 1500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "EaX4YwqhGJ8uhG5YQBZgZ",
        "type": "expense",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "EmH6rLW_SXTiqdvPpr_Hb",
        "type": "none",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "_coQ5O41ZfALh32TM-sH_",
        "type": "transaction",
        "data": {
          "value": 1500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "gYAVIixOYl1CTjjXUHzK9",
        "type": "expense",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "-OIGrBd12LNf4kPbGtipn",
        "type": "none",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "hc0spWzIta96y84ZoWKgf",
        "type": "transaction",
        "data": {
          "value": 1500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "VolGD81seXNd-KQYCeRln",
        "type": "expense",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "u9TZfAoNkWQ7q2nqUH5-r",
        "type": "none",
        "data": {
          "value": 1500,
          "deductable": true,
          "period": "Monthly",
          "type": "regular"
        }
      },
      {
        "id": "hRYZtPKJGew7pnvP1msul",
        "type": "transaction",
        "data": {
          "value": 1500,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "ol4liQgg4HEeiIko4eqeb",
        "type": "liability",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "JuUAJhMWkNDU5qYnSMOtj",
        "type": "none",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "x2oMEXlRpa3shqFyzqDHB",
        "type": "liability",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "lV8pi263EFlNsM0wU3BF_",
        "type": "none",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "Y-sq7Eb6aKADbzwVw5NNJ",
        "type": "liability",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "lAeyNFbnX4hAKbFfMJyjp",
        "type": "none",
        "data": {
          "type": "mortgage",
          "interestRate": 5,
          "amortization": 25,
          "repaymentSchedule": "Monthly",
          "repaymentValue": 584.59,
          "value": 100000,
          "maxValue": 10000
        }
      },
      {
        "id": "Td5RtAoqGz6kostv5jB07",
        "type": "transaction",
        "data": {
          "value": 584.59,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "me4JJ3qJmoCUHlyQSf3Ks",
        "type": "transaction",
        "data": {
          "value": 584.59,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "IOqCZ8mQ8S5Hq-rpnnoJ-",
        "type": "transaction",
        "data": {
          "value": 584.59,
          "type": "regular",
          "manualEntry": false
        }
      },
      {
        "id": "b0qZ6WOwQg_v8nNLoeBam",
        "type": "assetRealEstate",
        "data": {
          "type": "own",
          "location": 1,
          "valueDate": "Wed Mar 22 2023 07:07:37 GMT+0100",
          "propertyType": "house",
          "value": 350000
        }
      },
      {
        "id": "34G5fwV72y4kvplSDizvZ",
        "type": "none",
        "data": {
          "type": "own",
          "location": 1,
          "valueDate": "Wed Mar 22 2023 07:07:40 GMT+0100",
          "propertyType": "house",
          "value": 350000
        }
      },
      {
        "id": "9c7jPjntGnMjNAU87NBJJ",
        "type": "assetSecurities",
        "data": {
          "value": 120000,
          "type": "401-plan",
          "contribution": 1000,
          "maxContribution": 2000
        }
      },
      {
        "id": "Tk5WS0pfo69YBR6CF6GOK",
        "type": "none",
        "data": {
          "value": 120000,
          "type": "401-plan",
          "contribution": 1000,
          "maxContribution": 2000
        }
      },
      {
        "id": "Bzdmqhu_IPcLRXb66YGHT",
        "type": "assetRealAssets",
        "data": {
          "value": 0,
          "type": null,
          "valueDate": "Wed Mar 22 2023 07:08:39 GMT+0100"
        }
      },
      {
        "id": "Ez0G8Bc6yySVib_PxZghS",
        "type": "none",
        "data": {
          "value": 0,
          "type": "Cash Reserve",
          "valueDate": "Wed Mar 22 2023 07:08:43 GMT+0100"
        }
      },
      {
        "id": "oAAPZhbBtq1kOAMMwqNsR",
        "type": "assetSecurities",
        "data": {
          "value": 0,
          "type": "401-plan",
          "valueDate": "Wed Mar 22 2023 07:09:06 GMT+0100"
        }
      },
      {
        "id": "s0r5hx-rrcxC64nM1nBEO",
        "type": "none",
        "data": {
          "value": 0,
          "type": "Cash Reserve",
          "valueDate": "Wed Mar 22 2023 07:09:18 GMT+0100"
        }
      },
      {
        "id": "m3aykrerPTnnTIeR1qGSx",
        "type": "transaction",
        "data": {
          "value": 500,
          "type": "regular",
          "manualEntry": true
        }
      }
    ]
  }
}

function getMonthYearArray() {
  const currentDate = new Date(); // Get the current date
  let startMonth = currentDate.getMonth() + 1; // Get the current month (1-12)
  const startYear = currentDate.getFullYear(); // Get the current year
  const endYear = startYear + configs.projectionLength; // Calculate the end year

  const monthYearArray = []; // Initialize the result array

  // Loop through each year and month, and add the month number and year to the array
  for (let year = startYear; year <= endYear; year++) {
    const endMonth = year === endYear ? 12 : 12; // If it's the end year, stop at December (month 12)
    for (let month = startMonth; month <= endMonth; month++) {
      monthYearArray.push({ year, month });
    }
    startMonth = 1; // Reset the start month to 1 for the remaining years
  }

  return monthYearArray;
}

const monthArray = getMonthYearArray();

export default function buildFlowData(extractedEntities) {
  const extractedflowData = [];
  // remove items from extractedEntities that have value of null
  for (const key in extractedEntities) {
    extractedEntities[key] = extractedEntities[key].filter((item) => item.value !== null);
  }
  // sort extractedEntities.expense by value
  extractedEntities.expense.sort((a, b) => b.value - a.value);
  extractedEntities.income.sort((a, b) => b.value - a.value);
  //make a copy of templateFlowData
  const tempFlowData = {
    elements: [...templateFlowData.elements.slice(0, 2)],
    metaData: {
      currentYear: false,
      // determine the current year
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      netWorth: 0,
      finData: [...templateFlowData.metaData.finData.slice(0, 2)],
    }
  };
  // set the cash value and name 
  if (extractedEntities.cash.length > 0) {
    tempFlowData.metaData.finData[0].data.value = extractedEntities.cash[0].value;
    tempFlowData.elements[1].text = extractedEntities.cash[0].name ? extractedEntities.cash[0].name : "Cash";
  }
  // replace entities one by one
  let incomeObjects = { elements: [], finData: [] }
  let expenseObjects = { elements: [], finData: [] }
  let liabilityObjects = { elements: [], finData: [] }
  let investmentObjects = { elements: [], finData: [] }
  let realEstateObjects = { elements: [], finData: [] }
  //income elements 

  if (extractedEntities.income.length == 1) {
    incomeObjects = { elements: [...templateFlowData.elements.slice(2, 5)], finData: [...templateFlowData.metaData.finData.slice(2, 5)] }
    incomeObjects.finData[0].data.value = extractedEntities.income[0].value
    incomeObjects.finData[2].data.value = extractedEntities.income[0].value
    if (extractedEntities.income[0].period === "Annually") incomeObjects.finData[0].data.period = "Annually"
    if (extractedEntities.income[0].name !== '') {
      incomeObjects.elements[1].text = extractedEntities.income[0].name
    }
    // incomeObjects.elements[0].x += 50
    // incomeObjects.elements[1].x += 50
    // incomeObjects.elements[2].points[1][0] += 50
  } else if (extractedEntities.income.length == 2) {
    incomeObjects = { elements: [...templateFlowData.elements.slice(2, 8)], finData: [...templateFlowData.metaData.finData.slice(2, 8)] }
    incomeObjects.finData[0].data.value = extractedEntities.income[0].value
    incomeObjects.finData[2].data.value = extractedEntities.income[0].value
    incomeObjects.finData[3].data.value = extractedEntities.income[1].value
    incomeObjects.finData[5].data.value = extractedEntities.income[1].value
    if (extractedEntities.income[0].period === "Annually") incomeObjects.finData[0].data.period = "Annually"
    if (extractedEntities.income[1].period === "Annually") incomeObjects.finData[3].data.period = "Annually"
    if (extractedEntities.income[0].name !== '') incomeObjects.elements[1].text = extractedEntities.income[0].name
    if (extractedEntities.income[1].name !== '') incomeObjects.elements[4].text = extractedEntities.income[1].name
  } else if (extractedEntities.income.length > 2) {
    incomeObjects = { elements: [...templateFlowData.elements.slice(2, 11)], finData: [...templateFlowData.metaData.finData.slice(2, 11)] }
    incomeObjects.finData[0].data.value = extractedEntities.income[0].value
    incomeObjects.finData[2].data.value = extractedEntities.income[0].value
    incomeObjects.finData[3].data.value = extractedEntities.income[1].value
    incomeObjects.finData[5].data.value = extractedEntities.income[1].value
    incomeObjects.finData[6].data.value = extractedEntities.income[2].value
    incomeObjects.finData[8].data.value = extractedEntities.income[2].value
    if (extractedEntities.income[0].period === "Annually") incomeObjects.finData[0].data.period = "Annually"
    if (extractedEntities.income[1].period === "Annually") incomeObjects.finData[3].data.period = "Annually"
    if (extractedEntities.income[2].period === "Annually") incomeObjects.finData[6].data.period = "Annually"
    if (extractedEntities.income[0].name !== '') incomeObjects.elements[1].text = extractedEntities.income[0].name
    if (extractedEntities.income[1].name !== '') incomeObjects.elements[4].text = extractedEntities.income[1].name
    if (extractedEntities.income[2].name !== '') incomeObjects.elements[7].text = extractedEntities.income[2].name
  }

  // expense elements

  if (extractedEntities.expense.length == 1) {
    expenseObjects = { elements: [...templateFlowData.elements.slice(11, 14)], finData: [...templateFlowData.metaData.finData.slice(11, 14)] }
    expenseObjects.finData[0].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[2].data.value = extractedEntities.expense[0].value
    if (extractedEntities.expense[0].period === "Annually") expenseObjects.finData[0].data.period = "Annually"
    if (extractedEntities.expense[0].name !== '') {
      expenseObjects.elements[1].text = extractedEntities.expense[0].name
    }
  } else if (extractedEntities.expense.length == 2) {
    expenseObjects = { elements: [...templateFlowData.elements.slice(11, 17)], finData: [...templateFlowData.metaData.finData.slice(11, 17)] }
    expenseObjects.finData[0].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[2].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[3].data.value = extractedEntities.expense[1].value
    expenseObjects.finData[5].data.value = extractedEntities.expense[1].value
    if (extractedEntities.expense[0].period === "Annually") expenseObjects.finData[0].data.period = "Annually"
    if (extractedEntities.expense[1].period === "Annually") expenseObjects.finData[3].data.period = "Annually"
    if (extractedEntities.expense[0].name !== '') expenseObjects.elements[1].text = extractedEntities.expense[0].name
    if (extractedEntities.expense[1].name !== '') expenseObjects.elements[4].text = extractedEntities.expense[1].name
  } else if (extractedEntities.expense.length == 3) {
    expenseObjects = { elements: [...templateFlowData.elements.slice(11, 20)], finData: [...templateFlowData.metaData.finData.slice(11, 20)] }
    expenseObjects.finData[0].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[2].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[3].data.value = extractedEntities.expense[1].value
    expenseObjects.finData[5].data.value = extractedEntities.expense[1].value
    expenseObjects.finData[6].data.value = extractedEntities.expense[2].value
    expenseObjects.finData[8].data.value = extractedEntities.expense[2].value
    if (extractedEntities.expense[0].period === "Annually") expenseObjects.finData[0].data.period = "Annually"
    if (extractedEntities.expense[1].period === "Annually") expenseObjects.finData[3].data.period = "Annually"
    if (extractedEntities.expense[2].period === "Annually") expenseObjects.finData[6].data.period = "Annually"
    if (extractedEntities.expense[0].name !== '') expenseObjects.elements[1].text = extractedEntities.expense[0].name
    if (extractedEntities.expense[1].name !== '') expenseObjects.elements[4].text = extractedEntities.expense[1].name
    if (extractedEntities.expense[2].name !== '') expenseObjects.elements[7].text = extractedEntities.expense[2].name
  } else if (extractedEntities.expense.length > 3) {
    expenseObjects = { elements: [...templateFlowData.elements.slice(11, 23)], finData: [...templateFlowData.metaData.finData.slice(11, 23)] }
    expenseObjects.finData[0].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[2].data.value = extractedEntities.expense[0].value
    expenseObjects.finData[3].data.value = extractedEntities.expense[1].value
    expenseObjects.finData[5].data.value = extractedEntities.expense[1].value
    expenseObjects.finData[6].data.value = extractedEntities.expense[2].value
    expenseObjects.finData[8].data.value = extractedEntities.expense[2].value
    expenseObjects.finData[9].data.value = extractedEntities.expense[3].value
    expenseObjects.finData[11].data.value = extractedEntities.expense[3].value
    if (extractedEntities.expense[0].period === "Annually") expenseObjects.finData[0].data.period = "Annually"
    if (extractedEntities.expense[1].period === "Annually") expenseObjects.finData[3].data.period = "Annually"
    if (extractedEntities.expense[2].period === "Annually") expenseObjects.finData[6].data.period = "Annually"
    if (extractedEntities.expense[3].period === "Annually") expenseObjects.finData[9].data.period = "Annually"
    if (extractedEntities.expense[0].name !== '') expenseObjects.elements[1].text = extractedEntities.expense[0].name
    if (extractedEntities.expense[1].name !== '') expenseObjects.elements[4].text = extractedEntities.expense[1].name
    if (extractedEntities.expense[2].name !== '') expenseObjects.elements[7].text = extractedEntities.expense[2].name
    if (extractedEntities.expense[3].name !== '') expenseObjects.elements[10].text = extractedEntities.expense[3].name
  }

  // liability elements
  const debtTypes = ['mortgage', 'auto-loan', 'credit-card', 'student-loan', 'personal-loan']
  if (extractedEntities.debt.length == 1) {
    liabilityObjects = { elements: [...templateFlowData.elements.slice(23, 25), ...templateFlowData.elements.slice(29, 30)], finData: [...templateFlowData.metaData.finData.slice(23, 25), ...templateFlowData.metaData.finData.slice(29, 30)] }
    liabilityObjects.finData[0].data.value = extractedEntities.debt[0].value
    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[0].data.interestRate = extractedEntities.debt[0].interest_rate
    if (debtTypes.some(x => x === extractedEntities.debt[0].type)) liabilityObjects.finData[0].data.type = extractedEntities.debt[0].type
    liabilityObjects.finData[2].data.value = 0 // needs to be calculated from the financial model
    if (extractedEntities.debt[0].name !== '') {
      liabilityObjects.elements[1].text = extractedEntities.debt[0].name
    }
  } else if (extractedEntities.debt.length == 2) {
    liabilityObjects = { elements: [...templateFlowData.elements.slice(23, 27), ...templateFlowData.elements.slice(29, 31)], finData: [...templateFlowData.metaData.finData.slice(23, 27), ...templateFlowData.metaData.finData.slice(29, 31)] }
    liabilityObjects.finData[0].data.value = extractedEntities.debt[0].value
    liabilityObjects.finData[2].data.value = extractedEntities.debt[1].value

    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[0].data.interestRate = extractedEntities.debt[0].interest_rate
    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[2].data.interestRate = extractedEntities.debt[1].interest_rate
    if (debtTypes.some(x => x === extractedEntities.debt[0].type)) liabilityObjects.finData[0].data.type = extractedEntities.debt[0].type
    if (debtTypes.some(x => x === extractedEntities.debt[1].type)) liabilityObjects.finData[2].data.type = extractedEntities.debt[1].type
    if (extractedEntities.debt[0].name !== '') liabilityObjects.elements[1].text = extractedEntities.debt[0].name
    if (extractedEntities.debt[1].name !== '') liabilityObjects.elements[3].text = extractedEntities.debt[1].name
  } else if (extractedEntities.debt.length > 2) {
    liabilityObjects = { elements: [...templateFlowData.elements.slice(23, 32)], finData: [...templateFlowData.metaData.finData.slice(23, 32)] }
    liabilityObjects.finData[0].data.value = extractedEntities.debt[0].value
    liabilityObjects.finData[2].data.value = extractedEntities.debt[1].value
    liabilityObjects.finData[4].data.value = extractedEntities.debt[2].value
    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[0].data.interestRate = extractedEntities.debt[0].interest_rate
    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[2].data.interestRate = extractedEntities.debt[1].interest_rate
    if (extractedEntities.debt[0].interest_rate !== null && extractedEntities.debt[0].interest_rate !== "") liabilityObjects.finData[4].data.interestRate = extractedEntities.debt[2].interest_rate
    if (debtTypes.some(x => x === extractedEntities.debt[0].type)) liabilityObjects.finData[0].data.type = extractedEntities.debt[0].type
    if (debtTypes.some(x => x === extractedEntities.debt[1].type)) liabilityObjects.finData[2].data.type = extractedEntities.debt[1].type
    if (debtTypes.some(x => x === extractedEntities.debt[2].type)) liabilityObjects.finData[4].data.type = extractedEntities.debt[2].type
    if (extractedEntities.debt[0].name !== '') liabilityObjects.elements[1].text = extractedEntities.debt[0].name
    if (extractedEntities.debt[1].name !== '') liabilityObjects.elements[3].text = extractedEntities.debt[1].name
    if (extractedEntities.debt[2].name !== '') liabilityObjects.elements[5].text = extractedEntities.debt[2].name
  }

  // add investment elements

  if (extractedEntities.stocks_portfolio.length > 0) {
    investmentObjects = { elements: [...templateFlowData.elements.slice(34, 36), ...templateFlowData.elements.slice(40)], finData: [...templateFlowData.metaData.finData.slice(34, 36), ...templateFlowData.metaData.finData.slice(40)] }
    investmentObjects.finData[0].data.value = extractedEntities.stocks_portfolio[0].value
    if (extractedEntities.stocks_portfolio[0].name !== '') investmentObjects.elements[1].text = extractedEntities.stocks_portfolio[0].name
  }
  // add real estate elements
  if (extractedEntities.real_estate.length > 0) {
    realEstateObjects = { elements: [...templateFlowData.elements.slice(32, 34)], finData: [...templateFlowData.metaData.finData.slice(32, 34)] }
    realEstateObjects.finData[0].data.value = extractedEntities.real_estate[0].value
    if (extractedEntities.real_estate[0].name !== '') realEstateObjects.elements[1].text = extractedEntities.real_estate[0].name
  }

  // set all elements originaltext to be the same as the text

  tempFlowData.elements = [...tempFlowData.elements, ...incomeObjects.elements, ...expenseObjects.elements, ...liabilityObjects.elements, ...investmentObjects.elements, ...realEstateObjects.elements]
  tempFlowData.metaData.finData = [...tempFlowData.metaData.finData, ...incomeObjects.finData, ...expenseObjects.finData, ...liabilityObjects.finData, ...investmentObjects.finData, ...realEstateObjects.finData]
  // sett all elements originaltext to be the same as the text
  tempFlowData.elements.forEach(element => { element.originalText = element.text })

  extractedflowData[0] = tempFlowData;

  for (let i = 0; i < configs.projectionLength * 12; i++) {
    extractedflowData[i] = JSON.parse(JSON.stringify(tempFlowData));
    let year = Math.floor(i / 12)
    extractedflowData[i].metaData.year = monthArray[i].year
    extractedflowData[i].metaData.month = monthArray[i].month;
  }
  extractedflowData[0].metaData.currentYear = true;
  return extractedflowData
}

