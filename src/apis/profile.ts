import { GET, DELETE, POST } from "./config";

// vote hoặc bỏ vote cho một bài viết
export const getProfile = (slug: string) => GET(`/profiles/${slug}`);

export const followProfile = (slug: string) => POST(`/profiles/${slug}/follow`);

export const unFollowProfile = (slug: string) => DELETE(`/profiles/${slug}/follow`);
