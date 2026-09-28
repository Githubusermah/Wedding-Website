import { NextResponse } from "next/server";

const GOOGLE_RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbySqOSZWaqsAnelCcL4do6ihtRZ6Fp6CjZ55VxZ6UYUD9P7jdEC9jJ85AVULsXFNoJa/exec";

type RsvpPayload = {
  fullName?: unknown;
  phone?: unknown;
  attending?: unknown;
  companionCount?: unknown;
  message?: unknown;
};

const text = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let payload: RsvpPayload;

  try {
    payload = (await request.json()) as RsvpPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "درخواست نامعتبر است." }, { status: 400 });
  }

  const fullName = text(payload.fullName);
  const phone = text(payload.phone);
  const attending = text(payload.attending);
  const message = text(payload.message);
  const companionCount = attending === "yes" ? text(payload.companionCount) || "1" : "0";

  if (fullName.length < 2) {
    return NextResponse.json({ ok: false, error: "لطفاً نام و نام خانوادگی خود را کامل بنویسید." }, { status: 400 });
  }

  if (phone.length < 7) {
    return NextResponse.json({ ok: false, error: "لطفاً شماره تماس معتبر وارد کنید." }, { status: 400 });
  }

  if (attending !== "yes" && attending !== "no") {
    return NextResponse.json({ ok: false, error: "لطفاً وضعیت حضور خود را انتخاب کنید." }, { status: 400 });
  }

  try {
    const postResponse = await fetch(GOOGLE_RSVP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: new URLSearchParams({ fullName, phone, attending, companionCount, message }).toString(),
      redirect: "manual",
      cache: "no-store",
    });

    // Apps Script responds to POST with a 302 and a one-time googleusercontent
    // URL. The redirect target must be fetched with GET; preserving POST gives
    // Google a 405 even though doPost has already run.
    const redirectLocation = postResponse.headers.get("location");
    const response = redirectLocation
      ? await fetch(redirectLocation, { method: "GET", cache: "no-store" })
      : postResponse;
    const responseText = await response.text();
    let result: { ok?: boolean; error?: string } = {};

    try {
      result = JSON.parse(responseText) as { ok?: boolean; error?: string };
    } catch {
      return NextResponse.json(
        { ok: false, error: "گوگل شیت پاسخ قابل خواندن نداد. لطفاً دوباره تلاش کنید." },
        { status: 502 },
      );
    }

    if (!response.ok || result.ok === false) {
      return NextResponse.json(
        { ok: false, error: result.error || "ثبت پاسخ در گوگل شیت انجام نشد." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("RSVP Google Sheets submission failed:", error);
    return NextResponse.json(
      { ok: false, error: "ارتباط با گوگل شیت برقرار نشد. لطفاً دوباره تلاش کنید." },
      { status: 502 },
    );
  }
}
