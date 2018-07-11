const axios = require("axios");

export default abstract class Driver {

    pair: string;

    constructor(pair: string) {
        this.pair = pair;
        this.transformData = this.transformData.bind(this);
        this.saveData = this.saveData.bind(this);
    }

    abstract prepareUrl(): string;

    abstract transformData(data: any): any;

    private saveData(exchange: any) {
        exchange.save((error: any) => {
            if (error)
              throw error;
          });
    }

    public sendRequest() {
        axios.get(this.prepareUrl())
        .then(({ data }: { data: any }) => data)
        .then(this.transformData)
        .then(this.saveData)
        .catch((error: any) => {
            console.log(error);
        });
    }

}