import React from "react";

import { useParams } from "react-router-dom";

export default function BlogPage() {
  const { blogId } = useParams();

  console.log(blogId);
  return <div>TODO Build the read blog page</div>;
}
