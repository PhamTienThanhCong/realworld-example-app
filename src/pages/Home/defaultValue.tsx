export interface Params {
  limit: number;
  offset: number;
  tag?: string;
  author?: string;
  favorited?: string;
}

export interface Feeds {
  articles: any[];
  articlesCount: number;
}

export const FEED_DEFAULT:Feeds = {
  articles: [],
  articlesCount: 0,
};
