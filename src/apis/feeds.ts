import { GET } from "./config";

export const getFeeds = () => GET("/articles?limit=10&offset=0");