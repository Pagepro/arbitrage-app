import mongoose from "mongoose";

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
        required: true,
        index: true
    }
});

spreadDataSchema.index({ time: -1, spread: -1 });

const Spread = mongoose.model("Spread", spreadDataSchema);

export default Spread;