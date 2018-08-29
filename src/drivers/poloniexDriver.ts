import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { POLONIEX } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class PoloniexDriver extends Driver {

    prepareUrl(): string {
        return createURL(POLONIEX);
    }

    transformData(data: any): any {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");
        const fixedPair = `${secondCurrency}_${firstCurrency}`.replace("XLM", "STR");
        const exchange = data[fixedPair];
        return new Exchange({time: Date.now(), pairName: this.pair, ask: exchange.lowestAsk, bid: exchange.highestBid, exchangeName: POLONIEX});
    }

}