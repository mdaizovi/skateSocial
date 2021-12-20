import settings from "../config/settings";
import client from "./client";

const getSearchResults = (searchQuery) => client.get(settings.SearchURL, {'search':searchQuery});

export default {
  getSearchResults,
};
