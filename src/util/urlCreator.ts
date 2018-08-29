import driversConfig from "../config/driversConfig";
import proxyConfig from "../config/proxy";
import { POLONIEX } from "../config/exchanges";


const createURL = (exchangeName: string) => {
    const {
        URLsMapping
    } = driversConfig;

    const exchangeURL: string = URLsMapping[exchangeName];

    if (!proxyConfig.usage[exchangeName]) {
        return exchangeURL;
    } else {
        exchangeName = exchangeName.toLowerCase();
        const {
            URLs: proxyURLs
        } = proxyConfig;

        const proxyRandom = Math.floor(Math.random() * (proxyURLs.length + 1));

        if (proxyRandom < proxyURLs.length) {
            const url = `${proxyURLs[proxyRandom]}market=${exchangeName}`;
            if (exchangeName !== POLONIEX) {
                return `${url}&coin=`;
            } else {
                return url;
            }
        } else {
            return exchangeURL;
        }
    }
};

export default createURL;
