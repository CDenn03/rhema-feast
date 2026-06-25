import { communicationsService } from "./services/communicationsService";
export async function getCampaigns() { return communicationsService.listCampaigns(); }
