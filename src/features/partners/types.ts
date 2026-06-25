export type PartnerType = "SPONSOR" | "VENDOR" | "MEDIA";

export interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  email: string;
  phone?: string;
  logoUrl?: string;
  status: "ACTIVE" | "PENDING" | "INACTIVE";
}
