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
            ticker
        } = data;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: ticker[0].ask, bid: ticker[0].bid, exchangeName: COINBENE});
    }

}
