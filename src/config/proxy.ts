import { BINANCE, BITFINEX, BITSTAMP, BITTREX, OKEX, POLONIEX, GDAX } from "./exchanges";

const proxyConfig = {
    usage: {
        [BINANCE]: true,
        [BITFINEX]: true,
        [BITSTAMP]: false,
        [BITTREX]: true,
        [OKEX]: false,
        [POLONIEX]: false,
        [GDAX]: false
    },
    URLs: [
        process.env.PROXY_URL_1,
        process.env.PROXY_URL_2,
        process.env.PROXY_URL_3,
        process.env.PROXY_URL_4,
        process.env.PROXY_URL_5
    ]
};

export default proxyConfig;