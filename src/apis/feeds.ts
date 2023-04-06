import { GET } from "./config";

export const getFeeds = (page:number) => GET(`/articles?limit=10&offset=${page * 10 - 10}`);

export const getYourFeed = (page:number) => GET(`/articles/feed?limit=10&offset=${page * 10 - 10}`);