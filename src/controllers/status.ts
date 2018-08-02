import moment from "moment";
import Exchange from "../models/schemas/exchangeDataSchema";

const statusController = (req: any, res: any) => {
    Exchange.findOne({}, undefined, {sort: {time: -1 }})
    .then((data: any) => {
      res.send(`Last update: ${moment(data.time, "YYYYMMDD").fromNow()} (${data.time})`);
    });
};

export default statusController;