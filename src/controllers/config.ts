import driversConfig from "../config/driversConfig";

const configController = (req: any, res: any) => {
    res.send(driversConfig.exchangesMapping);
};

export default configController;