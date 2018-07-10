import mongoose from "mongoose";

export type ExchangeData = mongoose.Document & {
    time: Date,
    pairName: string,
    ask: number,
    bid: number,
    exchangeName: string
};