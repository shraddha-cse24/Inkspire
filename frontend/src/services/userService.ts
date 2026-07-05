import { apiFetch } from "../lib/api";

export function getCurrentUser() {
  return apiFetch("/users/me");
}

export function getMyPosts() {
  return apiFetch("/users/me/posts");
}

export function getMyComments() {
  return apiFetch("/users/me/comments");
}