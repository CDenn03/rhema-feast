import { posService } from "./services/posService";

export async function getPOSProducts() {
  return posService.getProducts();
}
