import OrderSuccessContent from "@/components/checkout/OrderSuccessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Success - Trimurti",
  description: "Your order has been placed successfully at Trimurti.",
};

export default function OrderSuccessPage() {
  return <OrderSuccessContent />;
}
