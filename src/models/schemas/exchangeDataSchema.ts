import mongoose from "mongoose";

const exchangeDataSchema = new mongoose.Schema({
    time: {
        type: Date,
        required: true
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

const Exchange = mongoose.model("Exchange", exchangeDataSchema);

export default Exchange;