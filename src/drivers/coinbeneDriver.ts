import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { COINBENE } from "../config/exchanges";
import createURL from "../util/urlCreator";

export default class CoinbeneDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = this.pair.replace("/", "");
        return `${createURL(COINBENE)}${fixedPair}`;
    }

    transformData(data: any): any {
        const {
            ticker: [
                tickerData
            ]
        } = data;
        return new Exchange({
            time: Date.now(),
            pairName: this.pair,
            ask: tickerData.ask,
            bid: tickerData.bid,
            exchangeName: COINBENE
        });
    }

}
