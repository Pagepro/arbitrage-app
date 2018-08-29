import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITFINEX } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class BitfinexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        const fixedPair = `${firstCurrency}${secondCurrency}`;
        return `${createURL(BITFINEX)}${fixedPair}`;
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}