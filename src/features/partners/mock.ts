import type { Partner } from "./types";

export const MOCK_PARTNERS: Partner[] = [
  { id: "prt_001", name: "Safaricom PLC", type: "SPONSOR", email: "partnerships@safaricom.co.ke", phone: "+254 711 000 000", logoUrl: "", status: "ACTIVE" },
  { id: "prt_002", name: "Hope TV", type: "MEDIA", email: "info@hopetv.co.ke", phone: "+254 722 000 000", logoUrl: "", status: "ACTIVE" },
  { id: "prt_003", name: "Nation Media Group", type: "MEDIA", email: "events@nmg.co.ke", phone: "+254 733 000 000", logoUrl: "", status: "ACTIVE" },
  { id: "prt_004", name: "African Leadership Institute", type: "SPONSOR", email: "info@alinstitute.org", phone: "+254 744 000 000", logoUrl: "", status: "ACTIVE" },
  { id: "prt_005", name: "Equity Bank", type: "SPONSOR", email: "corporate@equitybank.co.ke", phone: "+254 755 000 000", logoUrl: "", status: "PENDING" },
  { id: "prt_006", name: "Coca-Cola Beverages Africa", type: "VENDOR", email: "events@ccba.co.ke", phone: "+254 766 000 000", logoUrl: "", status: "ACTIVE" },
  { id: "prt_007", name: "KCB Group", type: "SPONSOR", email: "sponsorship@kcb.co.ke", phone: "+254 777 000 000", logoUrl: "", status: "INACTIVE" },
];

export function getMockPartners(): Partner[] {
  return MOCK_PARTNERS;
}
