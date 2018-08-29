import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITSTAMP } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class BitstampDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "").toLowerCase();
        return `${createURL(BITSTAMP)}${fixedPair}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITSTAMP});
    }

}