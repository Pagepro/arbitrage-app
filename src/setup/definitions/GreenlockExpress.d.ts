declare module "greenlock-express" {
  import { Application } from "express";

  namespace GreenlockExpress {
    interface IGreenlockExpressConfig {
      version: string;
      server: string;
      configDir: string;
      email: string;
      approveDomains: string[];
      agreeTos: boolean;
      app: Application;
      communityMember: boolean;
      telemetry: boolean;
      debug: boolean;
    }

    function create (config: IGreenlockExpressConfig): any;
  }

  export default GreenlockExpress;
}