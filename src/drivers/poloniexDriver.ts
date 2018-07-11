import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { POLONIEX } from "../config/exchanges";

export default class PoloniexDriver extends Driver {

    prepareUrl(): string {
        return `https://poloniex.com/public?command=returnTicker`;
    }

    transformData(data: any): any {
        const fixedPair = `${this.pair.split("/")[1]}_${this.pair.split("/")[0]}`;
        const exchange = data[fixedPair];
        return new Exchange({time: Date.now(), pairName: this.pair, ask: exchange.lowestAsk, bid: exchange.highestBid, exchangeName: POLONIEX});
    }

}