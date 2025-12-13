"use client";

import { use } from "react";
import BlogDetailPageView from "@/page-views/blog/detail-page-view";

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { id } = use(params);
  return <BlogDetailPageView blogId={id} />;
}
