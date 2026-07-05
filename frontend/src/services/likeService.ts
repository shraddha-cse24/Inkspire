import { apiFetch } from "../lib/api";

export function toggleLike(postId: string) {
  return apiFetch(`/likes/${postId}`, {
    method: "POST",
  });
}
export function getLikeStatus(postId: string) {
  return apiFetch(`/likes/${postId}/status`);
}