 const mongoose = require('mongoose');

 const Aqmpoint = mongoose.Schema;

 const postSchema = new Aqmpoint({
     aqm: {
         r3000: Number,
         r5000: Number,
         noxevent: Number,
         r2000: Number,
         coevent: Number
     },
     gps: {
         system_time: {
             type: Date,
             default: Date.now
         },
         gps_time: String,
         latitude: String,
         longitude: String
     },
     user: {type: mongoose.Schema.ObjectId, ref: `User`}
 });

 module.exports = mongoose.model('Aqmpoint', postSchema);