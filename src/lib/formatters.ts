import { event } from "./event";

export function toEasternArabicNumerals(str: string | number): string {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(str).replace(/[0-9]/g, (d) => digits[parseInt(d, 10)]);
}

export function generateGoogleCalendarUrl(): string {
  const title = encodeURIComponent(event.pageTitle);
  const details = encodeURIComponent(
    `با دلِ شاد، شما را به جشن آغاز زندگی مشترک ${event.coupleDisplayName} دعوت می‌کنیم.`
  );
  const location = encodeURIComponent(event.venueAddressFa);

  const startISO = new Date(event.startDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endISO = new Date(event.endDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startISO}/${endISO}&details=${details}&location=${location}&sf=true&output=xml`;
}

export function generateIcsContent(): string {
  const startISO = new Date(event.startDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endISO = new Date(event.endDateTimeISO).toISOString().replace(/-|:|\.\d\d\d/g, "");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Farhad and Adeeba Wedding//Dari Invitation//FA",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `SUMMARY:${event.pageTitle}`,
    `DESCRIPTION:جشن پیوند ${event.coupleDisplayName}`,
    `LOCATION:${event.venueAddressFa}`,
    `DTSTART:${startISO}`,
    `DTEND:${endISO}`,
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
