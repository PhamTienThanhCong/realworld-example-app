import { Article } from "../models/article";
import { POST, DELETE, GET } from "./config";

// tìm kiếm bài viết
export const getFeeds = (page:number, params?:{}) => GET(`/articles`, params);

export const getYourFeed = (page:number, params?:{}) => GET(`/articles/feed`, params);

export const getFeed = (slug: string) => GET(`/articles/${slug}`);

// vote hoặc bỏ vote cho một bài viết
export const favoriteArticle = (slug: string) => POST(`/articles/${slug}/favorite`);

export const unFavoriteArticle = (slug: string) => DELETE(`/articles/${slug}/favorite`);

// Tạo bài viết mới
export const createArticle = (data:Article) => {
    return POST("/articles", { article: data });
  };
  