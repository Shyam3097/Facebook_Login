const express = require("express");
const app = express();
const route = require("./routes/route");
const mongoose = require("mongoose");

app.use(express.json());

mongoose.connect("mongodb+srv://plutonium-co:Y7XVLNecywgcT8ky@cluster0.ognlwhp.mongodb.net/FbLogin", {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDb is connected"))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000));
})