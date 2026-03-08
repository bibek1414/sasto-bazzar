import BlogDetailsContent from "@/components/blogs/BlogDetailsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News Details - Trimurti",
  description: "Read the full story at Trimurti.",
};

export default function BlogDetailPage() {
  return <BlogDetailsContent />;
}
