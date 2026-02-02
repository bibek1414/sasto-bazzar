import BlogDetailsContent from "@/components/blogs/BlogDetailsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "News Details - SastoBazzar",
    description: "Read the full story at SastoBazzar.",
};

export default function BlogDetailPage() {
    return <BlogDetailsContent />;
}
