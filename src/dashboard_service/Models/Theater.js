const mongoose = require("mongoose");

const timeschema = new mongoose.Schema({time:String,capacity_max:Number,capacity_consumed:Number},{ _id : false });
const moviestimeschema = new mongoose.Schema({id:String,timings:[timeschema]},{ _id : false });

const theaterschema = mongoose.Schema({
    "_id": {
      "type": "String"
    },
    "name": {
      "type": "String"
    },
    "email": {
      "type": "String"
    },
    "phone": {
      "type": "String"
    },
    "country": {
      "type": "String"
    },
    "address": {
      "type": "String"
    },
    "State": {
      "type": "String"
    },
    "City": {
      "type": "String"
    },
    "Zip": {
      "type": "Number"
    },
    "lat": {
      "type": "Number"
    },
    "long": {
      "type": "Number"
    },
    showings:{movies:[moviestimeschema]}
  });

const Theater =mongoose.model("theater", theaterschema);
module.exports = Theater;

// sample theater document

// {
//     _id: 'a1488c05-fee1-498c-84f2-ea0fb924315f',
//     name: 'Littel-Pacocha Cinema',
//     email: 'edauby12@newyorker.com',
//     phone: '260-573-1854',
//     country: 'United States',
//     address: '4 Packers Junction',
//     State: 'Indiana',
//     City: 'Fort Wayne',
//     Zip: 46852,
//     lat: 41.07,
//     long: -85.14,
//     showings: {
//       movies: [
//         {
//           id: '1000727',
//           timings: [
//             { time: '9:00', capacity_max: 250, capacity_consumed: 50 },
//             {
//               time: '12:00',
//               capacity_max: 150,
//               capacity_consumed: 149
//             },
//             {
//               time: '14:00',
//               capacity_max: 250,
//               capacity_consumed: 149
//             },
//             {
//               time: '17:00',
//               capacity_max: 200,
//               capacity_consumed: 100
//             },
//             { time: '20:00', capacity_max: 250, capacity_consumed: 80 }
//           ]
//         },
//         {
//           id: '1005486',
//           timings: [
//             { time: '9:00', capacity_max: 230, capacity_consumed: 149 },
//             {
//               time: '12:00',
//               capacity_max: 170,
//               capacity_consumed: 149
//             },
//             {
//               time: '14:00',
//               capacity_max: 230,
//               capacity_consumed: 149
//             }
//           ]
//         }
//       ]
//     },
//     __v: 0
//   }