import { NextResponse } from "next/server";
import { verifyCaptcha } from "../../lib/captcha";
import { whatsappLink } from "../../lib/site";

export const runtime = "nodejs";

const hits = new Map<string, { count: number; at: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now - record.at > 60_000) {
    hits.set(ip, { count: 1, at: now });
    return false;
  }
  record.count += 1;
  return record.count > 5;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Try again in a minute." },
      { status: 429 },
    );
  }

  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a filled hidden field is treated as a quiet success.
  if (text(payload.website, 10)) {
    return NextResponse.json({ ok: true, id: `TA-${Date.now()}` });
  }

  const errors: Record<string, string> = {};
  const name = text(payload.name, 100);
  const email = text(payload.email, 160);
  const organisation = text(payload.organisation, 120);
  const topic = text(payload.topic, 80) || "General question";
  const message = text(payload.message, 1200);

  if (name.length < 2) errors.name = "Give your name.";
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(email)) errors.email = "Check the email address.";
  if (message.length < 20) errors.message = "Add a little more detail.";

  const captcha = await verifyCaptcha(
    typeof payload.captchaToken === "string" ? payload.captchaToken : undefined,
    typeof payload.captchaProvider === "string" ? payload.captchaProvider : undefined,
  );
  if (!captcha.ok) errors.captcha = "Complete the spam check.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const id = `TA-${Date.now().toString(36).toUpperCase()}`;
  const summary = [
    `Theophilus Atlas message ${id}`,
    `Topic: ${topic}`,
    organisation ? `Organisation: ${organisation}` : "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Message: ${message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  let delivered = false;
  if (webhook) {
    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "contact", id, summary, payload }),
      });
      delivered = response.ok;
    } catch {
      delivered = false;
    }
  }

  return NextResponse.json({ ok: true, id, delivered, waLink: whatsappLink(summary) });
}
