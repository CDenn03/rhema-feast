import { merchService } from "./services/merchService";
export async function getMerchInventory() { return merchService.list(); }
