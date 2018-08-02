import Spread from "../models/schemas/spreadDataSchema";

const historyController = (req: any, res: any) => {
    Spread.findOne({ pairName: req.params.pair.replace("-", "/"), time: { $gte: Date.now() - 86400000 } }, undefined, {sort: {spread: -1 }})
    .then((spread: any) => {
        if (spread) {
        spread.time = spread.time.valueOf();
        res.send(spread !== undefined ? spread : 0);
        } else {
        res.end();
        }
    });
};

export default historyController;