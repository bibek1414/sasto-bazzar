import ProductDetailsView from "@/components/products/ProductDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Product Details - SastoBazzar",
    description: "View product details and purchase at SastoBazzar.",
};

export default function ProductDetailsPage() {
    return <ProductDetailsView />;
}
