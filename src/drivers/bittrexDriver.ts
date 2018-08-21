import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITTREX } from "../config/exchanges";

export default class BittrexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");
        const fixedPair = `${secondCurrency}-${firstCurrency}`;
        return `https://bittrex.com/api/v1.1/public/getticker?market=${fixedPair}`;
    }

    transformData(data: any): any {
        const result = data.result;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: result.Ask, bid: result.Bid, exchangeName: BITTREX});
    }

}