import OrderSuccessContent from "@/components/checkout/OrderSuccessContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Order Success - SastoBazzar",
    description: "Your order has been placed successfully at SastoBazzar.",
};

export default function OrderSuccessPage() {
    return <OrderSuccessContent />;
}
