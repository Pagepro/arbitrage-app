import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITFINEX } from "../config/exchanges";

export default class BitfinexDriver extends Driver {

    prepareUrl(): string {
        return `https://api.bitfinex.com/v1/pubticker/${this.pair.replace("/", "")}`;
        // return `https://api.finvea.pl/ticker.php?market=bitfinex&coin=${this.pair.replace("/", "")}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}