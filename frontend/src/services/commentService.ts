import { apiFetch } from "../lib/api";

export function getComments(postId: string) {
  return apiFetch(`/comments/post/${postId}`);
}

export function createComment(
  postId: string,
  content: string
) {
  return apiFetch(`/comments/post/${postId}`, {
    method: "POST",
    body: JSON.stringify({ content }),
  });
}

export function getMyComments() {
  return apiFetch("/users/me/comments");
}