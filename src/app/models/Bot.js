import mongoose from "mongoose";

const Bot = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

export default mongoose.model("bot", Bot);