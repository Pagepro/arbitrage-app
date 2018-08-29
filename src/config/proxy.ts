import { BINANCE, BITFINEX, BITSTAMP, BITTREX, OKEX, POLONIEX, GDAX } from "./exchanges";

const URLsArray = process.env.PROXY_URL.split(",");

interface IProxyConfigUsage {
    [key: string]: boolean;
}

interface IProxyConfig {
    usage: IProxyConfigUsage;
    URLs: string[];
}

const proxyConfig: IProxyConfig = {
    usage: {
        [BINANCE]: true,
        [BITFINEX]: true,
        [BITSTAMP]: false,
        [BITTREX]: true,
        [OKEX]: false,
        [POLONIEX]: false,
        [GDAX]: false
    },
    URLs: URLsArray
};

export default proxyConfig;
