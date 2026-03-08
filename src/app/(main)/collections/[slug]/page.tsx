import ProductDetailsView from "@/components/products/ProductDetailsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details - Trimurti",
  description: "View product details and purchase at Trimurti.",
};

export default function ProductDetailsPage() {
  return <ProductDetailsView />;
}
