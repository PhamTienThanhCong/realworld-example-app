import { DEFAULT_USER, User } from "./user";

export const DEFAULT_ARTICLE: Article = {
    title: '',
    description: '',
    body: '',
    tagList: []
};

export type Article = {
    title: string;
    description: string;
    body: string;
    tagList: string[];
};

export type ArticleResponse = Article & {
    slug: string;
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: User
};

export const DEFAULT_ARTICLE_RESPONSE: ArticleResponse = {
    slug: '',
    ...DEFAULT_ARTICLE,
    createdAt: '',
    updatedAt: '',
    favorited: false,
    favoritesCount: 0,
    author: DEFAULT_USER
};