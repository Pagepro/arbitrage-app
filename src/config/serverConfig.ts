import path from "path";
import { Application } from "express";
import GreenlockExpress from "greenlock-express";

export default {
  get staticFilesDir () {
    return path.join(__dirname, "..", "public");
  },

  getGreenlockConfig: (app: Application): GreenlockExpress.IGreenlockExpressConfig => ({
    // Let's Encrypt v2 is ACME draft 11
    version: "draft-11",

    // Note: If at first you don't succeed, switch to staging to debug
    // https://acme-staging-v02.api.letsencrypt.org/directory
    server: "https://acme-staging-v02.api.letsencrypt.org/directory",

    // Where the certs will be saved, MUST have write access
    configDir: "../../certs",

    // You MUST change this to a valid email address
    email: "tomasz.chmiel+1@pagepro.co",

    // You MUST change these to valid domains
    // NOTE: all domains will validated and listed on the certificate
    approveDomains: [ "test-api-arbmonitor.com", "www.test-api-arbmonitor.com" ],

    // You MUST NOT build clients that accept the ToS without asking the user
    agreeTos: true,

    app,

    // Join the community to get notified of important updates
    communityMember: false,

    // Contribute telemetry data to the project
    telemetry: true,

    debug: true
  })
};

export const expireTime = 86400;
export const highSpreadValue = 0.5;