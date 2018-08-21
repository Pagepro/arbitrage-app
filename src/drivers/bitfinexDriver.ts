import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITFINEX } from "../config/exchanges";

export default class BitfinexDriver extends Driver {

    private marketRandom: number;

    prepareUrl(): string {
        const [
            firstCurrency,
            secondCurrency
        ] = this.pair.split("/");

        if (this.pair === "EOS/BTC" || this.pair === "EOS/ETH") {
            return `https://api.bitfinex.com/v1/pubticker/${firstCurrency}${secondCurrency}`;
        }

        this.marketRandom = Math.floor(Math.random() * 3);

        if (this.marketRandom === 0) {
            return `https://api.bitfinex.com/v1/pubticker/${firstCurrency}${secondCurrency}`;
        } else if (this.marketRandom === 1) {
            return `http://pagepro.civ.pl/ticker.php?market=bitfinex&coin=${firstCurrency}${secondCurrency}`;
        } else {
            return `http://pagepro.civ.pl/ticker.php?market=bitfinex&coin=${firstCurrency}${secondCurrency}`;
        }
    }

    transformData(data: any): any {
        return new Exchange({time: Date.now(), pairName: this.pair, ask: data.ask, bid: data.bid, exchangeName: BITFINEX});
    }

}