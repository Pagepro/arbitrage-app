import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITTREX } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class BittrexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        const fixedPair = `${secondCurrency}-${firstCurrency}`;
        return `${createURL(BITTREX)}${fixedPair}`;
    }

    transformData(data: any): any {
        const result = data.result;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: result.Ask, bid: result.Bid, exchangeName: BITTREX});
    }

}