import { Request, Response } from "express";
import glob from "glob";
import path from "path";
import serverConfig from "../config/serverConfig";

const getStaticUrls = (extension: string): Promise<string[]> => {
  return new Promise(resolve => {
    glob(path.join(serverConfig.staticFilesDir, `**/*.${extension}`), (_, files) => {
      const serverPaths = files.map(filePath => {
        const serverPathParts = [
          "public",
          ...filePath.split("/").reverse().takeWhile(part => part === "public").reverse()
        ];

        return `/${serverPathParts.join("/")}`;
      });

      resolve(serverPaths);
    });
  });
};

const getScriptsUrls = () => {
  return getStaticUrls("js");
};

const getStylesUrls = () => {
  return getStaticUrls("css");
};

/**
 * GET /
 * Index page.
 */
const index = (_: Request, res: Response) => {
  Promise.all([ getScriptsUrls(), getStylesUrls() ])
    .then(([
      scripts,
      styles
    ]) => {
      res.render("index", {
        scripts,
        styles
      });
    });
};

export {
  index
};
