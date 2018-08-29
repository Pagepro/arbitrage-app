import { BINANCE, BITFINEX, BITSTAMP, BITTREX, OKEX, POLONIEX, GDAX } from "./exchanges";
import BinanceDriver from "../drivers/binanceDriver";
import BitfinexDriver from "../drivers/bitfinexDriver";
import BitstampDriver from "../drivers/bitstampDriver";
import BittrexDriver from "../drivers/bittrexDriver";
import PoloniexDriver from "../drivers/poloniexDriver";
import OkexDriver from "../drivers/okexDriver";
import GdaxDriver from "../drivers/gdaxDriver";
import Driver from "../drivers/driver";

interface IURLsMapping {
    [key: string]: string;
}

interface IExchangeMapping {
    pair: string;
    exchanges: string[];
}

interface IDriversMapping {
    [key: string]: typeof Driver;
}

interface IDriversConfig {
    URLsMapping: IURLsMapping;
    exchangesMapping: IExchangeMapping[];
    driversMapping: IDriversMapping;
    timeout: number;
    retryInterval: number;

}

const driversConfig: IDriversConfig = {
    exchangesMapping: [
        {
            pair: "ETH/BTC",
            exchanges: [BINANCE, BITFINEX, BITSTAMP, BITTREX, POLONIEX, OKEX, GDAX]
        },
        {
            pair: "XLM/BTC",
            exchanges: [BINANCE, BITFINEX, BITTREX, POLONIEX, OKEX]
        },
        {
            pair: "NEO/BTC",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX]
        },
        {
            pair: "NEO/ETH",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX]
        },
        {
            pair: "EOS/BTC",
            exchanges: [BINANCE, BITFINEX, OKEX]
        },
        {
            pair: "EOS/ETH",
            exchanges: [BINANCE, BITFINEX, OKEX]
        }
    ],
    driversMapping: {
        [BINANCE]: BinanceDriver,
        [BITFINEX]: BitfinexDriver,
        [BITSTAMP]: BitstampDriver,
        [BITTREX]: BittrexDriver,
        [POLONIEX]: PoloniexDriver,
        [OKEX]: OkexDriver,
        [GDAX]: GdaxDriver
    },
    URLsMapping: {
        [BINANCE]: "https://api.binance.com/api/v3/ticker/bookTicker?symbol=",
        [BITFINEX]: "https://api.bitfinex.com/v1/pubticker/",
        [BITSTAMP]: "https://www.bitstamp.net/api/v2/ticker/",
        [BITTREX]: "https://bittrex.com/api/v1.1/public/getticker?market=",
        [POLONIEX]: "https://poloniex.com/public?command=returnTicker",
        [OKEX]: "https://www.okex.com/api/v1/ticker.do?symbol=",
        [GDAX]: "https://api.pro.coinbase.com/products/"
    },
    timeout: 4000,
    retryInterval: 5000
};

export default driversConfig;