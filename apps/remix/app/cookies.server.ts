import { createCookie } from "@remix-run/node";

const secrets = (process.env.COOKIES_SECRET || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
// console.log("secrets", secrets);

export const userMailboxCookie = createCookie("userMailbox", {
  maxAge: 60 * 60 * 24 * 1,
  secrets: secrets,
  httpOnly: true,
});
