import { apiFetch } from "../lib/api";

export function getSnippets() {
  return apiFetch("/overheard/");
}

export function createSnippet(data: {
  content: string;
  theme_color: string;
}) {
  return apiFetch("/overheard/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}