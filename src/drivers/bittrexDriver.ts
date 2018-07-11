import Driver from "./driver";
import Exchange from "../models/schemas/exchangeDataSchema";

import { BITTREX } from "../config/exchanges";

export default class BittrexDriver extends Driver {

    prepareUrl(): string {
        const fixedPair = `${this.pair.split("/")[1]}-${this.pair.split("/")[0]}`;
        return `https://api.finvea.pl/ticker.php?market=bittrex&coin=${fixedPair}`;
    }

    transformData(data: any): any {
        const result = data.result;
        return new Exchange({time: Date.now(), pairName: this.pair, ask: result.Bid, bid: result.Ask, exchangeName: BITTREX});
    }

}