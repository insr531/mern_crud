const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require('cors');
const UserModel = require('./models/Users');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

const port = process.env.PORT || 8080;

mongoose.connect("mongodb+srv://orange:1234@cluster0.e3gqb.mongodb.net/mern_crud?retryWrites=true&w=majority",
       { useNewUrlParser: true}
);

app.use(express.static("client/build"));

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


app.put("/updateUser/:id", async (req, res) => {
    const user = req.body;
    UserModel.findByIdAndUpdate(req.params.id, req.body, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.delete("/deleteUser/:id", async (req, res) => {
    const user = req.body;
    UserModel.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log("SERVER RUNS!");
});

