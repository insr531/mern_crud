const mongoose = require('mongoose');

var minuteFromNow = function () {
    var timeObject = new Date();
    timeObject.setTime(timeObject.getTime() + 1000 * 60);
    return timeObject;
};

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;