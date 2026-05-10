import backendApi from "./backendApi";

// ── Contact Us ────────────────────────────────────────────
export const sendContactMessage = async ({ name, email, subject, message }) => {
  const response = await backendApi.post("/contact", { name, email, subject, message });
  return response.data;
};

// ── About Page ────────────────────────────────────────────
export const fetchAboutData = async () => {
  const response = await backendApi.get("/about");
  return response.data; // { team: [...], features: [...] }
};
