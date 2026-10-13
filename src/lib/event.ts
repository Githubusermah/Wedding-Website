import { weddingConfig } from "../../config/wedding";

export const event = {
  brideName: weddingConfig.groomFa, // Note: bride/groom aliases in existing event object
  brideNameEn: weddingConfig.groomEn.toUpperCase(),
  groomName: weddingConfig.brideFa,
  groomNameEn: weddingConfig.brideEn.toUpperCase(),
  coupleDisplayName: weddingConfig.coupleDisplayNameFa,
  pageTitle: weddingConfig.pageTitle,
  invitationDateFa: `${weddingConfig.weekdayFa}، ${weddingConfig.solarHijriDateFa}`,
  invitationDateGregorian: weddingConfig.gregorianDateEn,
  startTimeFa: weddingConfig.startTimeFa,
  endTimeFa: weddingConfig.endTimeFa,
  startDateTimeISO: weddingConfig.startDateTimeISO,
  endDateTimeISO: weddingConfig.endDateTimeISO,
  venueName: weddingConfig.venueNameFa,
  venueNameEn: weddingConfig.venueNameEn,
  venueShortName: "Taj Continental",
  venueAddressFa: weddingConfig.venueAddressFa,
  venueAddressEn: weddingConfig.venueAddressEn,
  venueWebsite: weddingConfig.venueWebsite,
  cityFa: weddingConfig.cityFa,
  mapsUrl: weddingConfig.mapsUrl,
  latitude: weddingConfig.latitude,
  longitude: weddingConfig.longitude,
  rsvpDeadlineFa: weddingConfig.rsvpDeadlineFa,
  contactPhoneDisplay: weddingConfig.phoneDisplay,
  contactPhoneHref: weddingConfig.phoneHref,
  familyLine: weddingConfig.hostsFa,
  hashtag: weddingConfig.hashtag,
  dressCodeFa: weddingConfig.dressCodeFa,
  photos: weddingConfig.photos
} as const;
