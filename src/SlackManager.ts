import axios from "axios";
import { WebClient } from "@slack/client";
import moment from "moment";

import { channelsListURL } from "./config/SlackConfig";
/*
const web = new WebClient(process.env.SLACK_TOKEN);
  web.chat.postMessage({
    channel: process.env.SLACK_CHANNEL,
    text: "Hello there!\nThis is Arbitrage App notification.\nPlease don't answer to this message. Have a good day!",
    username: "Arbitrage App",
    attachments: [
      {
        footer: "Arbitrage App © 2018",
        title: "Arbitrage App Notifications Bot",
        title_link: "https://www.google.com"
      }
    ]
  })
  .then((res) => {
    console.log("Message sent. :)");
  })
  .catch((error) => {
    if (error) {
      console.log("Sending message went wrong. :(");
    }
  });
  */

  class SlackManager {

    private webClient: WebClient;
    private channelsList: Array<any> = [];

    private static manager: SlackManager;

    private constructor() {
        this.webClient = new WebClient(process.env.SLACK_TOKEN);
        this.prepareChannelsList();
    }

    public static getInstance(): SlackManager {
        return this.manager || (this.manager = new SlackManager());
    }

    private prepareChannelsList() {
        return axios.get(channelsListURL)
        .then(({ data }: { data: any }) => data.channels)
        .then((channels: any) => {
            return channels;
        });
    }

    public sendNotifications(spreadTicker: any) {
        this.webClient.chat.postMessage({
            channel: process.env.SLACK_GENERAL_CHANNEL,
            text: `An opportunity appeared on ${spreadTicker.pairName} currency pair. Here are some details:\n
            Buy exchange: ${spreadTicker.buyExchange}\n
            Sell exchange: ${spreadTicker.sellExchange}\n
            Spread value: ${spreadTicker.spread}%\n
            Time: ${moment(spreadTicker.time.valueOf()).format("MMMM Do YYYY, HH:mm:ss")}`,
            username: "Arbitrage App",
            attachments: [
                {
                footer: "Arbitrage App © 2018",
                title: "Arbitrage App Notifications Bot",
                title_link: "http://172.104.230.32"
                }
            ]
        })
        .then((res) => {
            console.log("Message sent to general channel. :)");
            })
            .catch((error) => {
            if (error) {
                console.log("An error occurred while sending message. :(");
            }
        });

        /* OR */

        /*

        this.prepareChannelsList()
        .then((channels) => {
            for (const channel of channels) {
                this.webClient.chat.postMessage({
                    channel: channel.id,
                    text: "Hello there!\nThis is Arbitrage App notification.\nPlease don't answer to this message. Have a good day!",
                    username: "Arbitrage App",
                    attachments: [
                      {
                        footer: "Arbitrage App © 2018",
                        title: "Arbitrage App Notifications Bot",
                        title_link: "https://www.google.com"
                      }
                    ]
                  })
                  .then((res) => {
                    console.log(`Message sent to channel ${channel.id}. :)`);
                  })
                  .catch((error) => {
                    if (error) {
                      console.log(`An error ocurred while sending message to channel ${channel.id}. :(`);
                    }
                  });
            }
        });

        */

    }

}

export default SlackManager;