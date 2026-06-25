import type { Campaign } from "./types";

export const MOCK_CAMPAIGNS: Campaign[] = [
  { id: "cmp_001", name: "Event Announcement", subject: "Join us at Rhema Feast 2026!", body: "We are excited to invite you to Rhema Feast 2026...", channel: "EMAIL", status: "SENT", scheduledAt: "2026-07-01T08:00:00Z", sentAt: "2026-07-01T08:05:00Z" },
  { id: "cmp_002", name: "Early Bird Reminder", subject: "Early bird tickets closing soon!", body: "Don't miss out on discounted early bird tickets...", channel: "EMAIL", status: "SENT", scheduledAt: "2026-06-10T09:00:00Z", sentAt: "2026-06-10T09:02:00Z" },
  { id: "cmp_003", name: "VIP Invitation SMS", subject: undefined, body: "You are cordially invited to the VIP lounge at Rhema Feast. Present this message for access.", channel: "SMS", status: "SENT", scheduledAt: "2026-08-28T10:00:00Z", sentAt: "2026-08-28T10:01:00Z" },
  { id: "cmp_004", name: "Event Day Push", subject: undefined, body: "Rhema Feast is live! Check the schedule and find your way.", channel: "PUSH", status: "SCHEDULED", scheduledAt: "2026-08-31T07:00:00Z", sentAt: undefined },
  { id: "cmp_005", name: "Post-Event Follow-up", subject: "Thank you for attending Rhema Feast!", body: "We hope you had a wonderful time. Share your feedback...", channel: "EMAIL", status: "DRAFT", scheduledAt: "2026-09-05T10:00:00Z", sentAt: undefined },
  { id: "cmp_006", name: "Guest Reminder SMS", subject: undefined, body: "Dear guest, we look forward to hosting you at Rhema Feast. Your VIP access is confirmed.", channel: "SMS", status: "SCHEDULED", scheduledAt: "2026-08-29T14:00:00Z", sentAt: undefined },
];

export function getMockCampaigns(): Campaign[] {
  return MOCK_CAMPAIGNS;
}
