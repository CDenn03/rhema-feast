import { partnerService } from "./services/partnerService";
export async function getPartners() { return partnerService.list(); }
