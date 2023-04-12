import { DEFAULT_USER, User } from "./user";

export type CommentForm = {
  body: string;
};

export const DEFAULT_COMMENT_VALUES: CommentForm = {
  body: "",
};

export type CommentResponse = {
    id: number;
    createdAt: string;
    updatedAt: string;
    body: string;
    author: User & {
        following: boolean;
    }
}