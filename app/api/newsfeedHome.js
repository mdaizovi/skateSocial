import settings from "../config/settings";
import client from "./client";

const getNewsFeed = (payload) => client.get(settings.NewsFeedHomeURL, payload);

export default {
  getNewsFeed,
};
