import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BINANCE } from "../config/exchanges";

export default class BinanceDriver extends Driver {

    prepareUrl(): string {
        // return `https://api.finvea.pl/ticker.php?market=binance&coin=${this.pair.replace("/", "")}`;
        return `https://api.binance.com/api/v3/ticker/bookTicker?symbol=${this.pair.replace("/", "")}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.askPrice, bid: data.bidPrice, exchangeName: BINANCE});
    }

}