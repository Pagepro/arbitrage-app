import mongoose from "mongoose";
import { expireTime } from "../../config/serverConfig";

const spreadDataSchema = new mongoose.Schema({
    pairName: {
        type: String,
        required: true
    },
    buyExchange: {
        type: String,
        required: true
    },
    sellExchange: {
        type: String,
        required: true
    },
    spread: {
        type: Number,
        required: true,
        index: true
    },
    time: {
        type: Date,
        default: Date.now(),
        required: true,
        index: true,
        expires: expireTime
    }
});

spreadDataSchema.index({ time: -1, spread: -1 });

const Spread = mongoose.model("Spread", spreadDataSchema);

export default Spread;