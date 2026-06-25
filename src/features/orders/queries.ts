import { orderService } from "./services/orderService";

export async function getOrders() {
  return orderService.list();
}
