import mongoose from "mongoose";
import { expireTime } from "../../config/serverConfig";

const exchangeDataSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now(),
        required: true,
        index: true,
        expires: expireTime
    },
    pairName: {
        type: String,
        required: true
    },
    ask: {
        type: Number,
        required: true
    },
    bid: {
        type: Number,
        required: true
    },
    exchangeName: {
        type: String,
        required: true
    }
});

exchangeDataSchema.index({ time: -1 });

const Exchange = mongoose.model("Exchange", exchangeDataSchema);

export default Exchange;