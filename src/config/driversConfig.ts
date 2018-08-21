import { BINANCE, BITFINEX, BITSTAMP, BITTREX, OKEX, POLONIEX, GDAX } from "./exchanges";
import BinanceDriver from "../drivers/binanceDriver";
import BitfinexDriver from "../drivers/bitfinexDriver";
import BitstampDriver from "../drivers/bitstampDriver";
import BittrexDriver from "../drivers/bittrexDriver";
import PoloniexDriver from "../drivers/poloniexDriver";
import OkexDriver from "../drivers/okexDriver";
import GdaxDriver from "../drivers/gdaxDriver";

const driversConfig = {
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
    timeInterval: 5000
};

export default driversConfig;