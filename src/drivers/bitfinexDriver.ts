import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITFINEX } from "../config/exchanges";

export default class BitfinexDriver extends Driver {

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        const marketsURLs = [
            `https://api.bitfinex.com/v1/pubticker/${firstCurrency}${secondCurrency}`,
            `http://pagepro.civ.pl/ticker.php?market=bitfinex&coin=${firstCurrency}${secondCurrency}`,
            `http://pagepro.civ.pl/ticker.php?market=bitfinex&coin=${firstCurrency}${secondCurrency}`
        ];

        const marketRandom = Math.floor(Math.random() * marketsURLs.length);
        return marketsURLs[marketRandom];
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}