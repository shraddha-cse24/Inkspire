import { apiFetch } from "../lib/api";

export function getPosts() {
  return apiFetch("/posts/");
}

export function getPost(id: string) {
  return apiFetch(`/posts/${id}`);
}

export function createPost(data: {
  title: string;
  content: string;
  cover_image?: string;
  published?: boolean;
}) {
  return apiFetch("/posts/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function updatePost(
  id: string,
  data: {
    title?: string;
    content?: string;
    cover_image?: string;
    published?: boolean;
  }
) {
  return apiFetch(`/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function deletePost(id: string) {
  return apiFetch(`/posts/${id}`, {
    method: "DELETE",
  });
}