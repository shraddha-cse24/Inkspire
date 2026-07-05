import { apiFetch } from "../lib/api";

export function toggleBookmark(postId: string) {
  return apiFetch(`/bookmarks/${postId}`, {
    method: "POST",
  });
}
export function getBookmarkStatus(postId: string) {
  return apiFetch(`/bookmarks/${postId}/status`);
}