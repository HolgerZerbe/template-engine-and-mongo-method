const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Aqmpoint = require('./models/Aqmpoints');
const User = require("./models/User");
const aqmData = require("./out3.json");


require('dotenv').config();

app.use("/", express.static('views'));



mongoose.connect(process.env.MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const userData = [{ email: "admin@example.com" }, { email: "user@example.com" }];

(async () => {
    await Aqmpoint.deleteMany();
    await User.deleteMany();
    const createdUser = await User.insertMany(userData);
    
    for (elem of aqmData) {
        elem.user = createdUser[Math.floor(Math.random() * createdUser.length)]._id
        console.log(elem);
    }

    await Aqmpoint.insertMany(aqmData);
  })()


app.get("/:userId?", async (req, res) => {
    const query = req.params.userId ? {user: req.params.userId} : {}
    let aqmList = await Aqmpoint.find(query).populate('user');
    let users = await User.find();
    res.render("index", { aqmList, users });
  });



app.listen(3000);