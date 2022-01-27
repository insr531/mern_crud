const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require('./models/Users');

const cors = require('cors');

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8080;

mongoose.connect(
    "mongodb+srv://orange:1234@cluster0.e3gqb.mongodb.net/mern_crud?retryWrites=true&w=majority"
);

app.get("/getUsers", (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    })
});

app.post("/createUser", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
});


app.listen(port, () => {
    console.log("SERVER RUNS!");
});

