import { BINANCE, BITFINEX, BITSTAMP, BITTREX, OKEX, POLONIEX, GDAX } from "./exchanges";
import { BinanceDriver } from "../drivers/binanceDriver";

export const driversConfig = {
    exchangesMapping: [
        {
            pair: "ETH/BTC",
            exchanges: [BINANCE, BITFINEX, BITSTAMP, BITTREX, POLONIEX, OKEX, GDAX],
        },
        {
            pair: "XLM/BTC",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX],
        },
        {
            pair: "XLM/ETH",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX],
        },
        {
            pair: "NEO/BTC",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX],
        },
        {
            pair: "NEO/ETH",
            exchanges: [BINANCE, BITFINEX, BITTREX, OKEX],
        },
        {
            pair: "LTC/BTC",
            exchanges: [BINANCE, BITFINEX, BITSTAMP, BITTREX, POLONIEX, OKEX, GDAX],
        },
        {
            pair: "LTC/ETH",
            exchanges: [BINANCE, BITTREX, OKEX],
        }
    ],
    driversMapping: {
        [BINANCE]: BinanceDriver
    },
    timeInterval: 5000
};