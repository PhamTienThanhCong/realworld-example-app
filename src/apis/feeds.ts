import { GET } from "./config";

export const getFeeds = (page:number, params?:{}) => GET(`/articles`, params);

export const getYourFeed = (page:number, params?:{}) => GET(`/articles/feed`, params);