import path from "path";

export default {
  get staticFilesDir () {
    return path.join(__dirname, "..", "public");
  }
};

export const expireTime = 86400;
export const highSpreadValue = 0.5;