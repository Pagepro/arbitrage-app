import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BINANCE } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class BinanceDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "");
        return `${createURL(BINANCE)}${fixedPair}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.askPrice, bid: data.bidPrice, exchangeName: BINANCE});
    }

}