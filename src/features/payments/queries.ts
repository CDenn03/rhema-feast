import { paymentService } from "./services/paymentService";

export async function getPayments() {
  return paymentService.list();
}
