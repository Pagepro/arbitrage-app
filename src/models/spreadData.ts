import mongoose from "mongoose";

export type SpreadData = mongoose.Document & {
    pairName: string,
    buyExchange: string,
    sellExchange: string,
    spread: number,
    time: Date
};