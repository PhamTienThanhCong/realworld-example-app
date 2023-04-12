import { POST, DELETE, GET } from "./config";

export const getComments = (slug: string) => GET(`/articles/${slug}/comments`);

export const postComment = (slug: string, body: string) =>
    POST(`/articles/${slug}/comments`, { comment: { body } });

export const deleteComment = (slug: string, id: number) =>
    DELETE(`/articles/${slug}/comments/${id}`);
