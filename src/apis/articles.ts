import { POST, DELETE } from "./config";

// vote hoặc bỏ vote cho một bài viết
export const favoriteArticle = (slug: string) => POST(`articles/${slug}/favorite`);

export const unFavoriteArticle = (slug: string) => DELETE(`articles/${slug}/favorite`);