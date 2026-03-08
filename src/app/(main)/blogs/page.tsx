import { Suspense } from "react";
import BlogListingContent from "@/components/blogs/BlogListingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - Trimurti",
  description: "Read the latest news and stories from Trimurti.",
};

export default function BlogListingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogListingContent />
    </Suspense>
  );
}
