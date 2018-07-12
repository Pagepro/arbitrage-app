import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITSTAMP } from "../config/exchanges";

export default class BitstampDriver extends Driver {

    prepareUrl(): string {
        return `https://www.bitstamp.net/api/v2/ticker/${this.pair.replace("/", "").toLowerCase()}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITSTAMP});
    }

}