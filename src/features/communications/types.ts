export type CampaignStatus = "DRAFT" | "SCHEDULED" | "SENT";
export type CampaignChannel = "EMAIL" | "SMS" | "PUSH";

export interface Campaign {
  id: string;
  name: string;
  subject?: string;
  body: string;
  channel: CampaignChannel;
  status: CampaignStatus;
  scheduledAt?: string;
  sentAt?: string;
}
