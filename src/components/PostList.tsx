import React from "react";
import type { Post } from "../App";
import PostItem from "./PostItem";

interface PostListProps {
  posts: Post[];
  toggleLike: (id: number) => void;
}

export default function PostList({ posts, toggleLike }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} toggleLike={toggleLike} />
      ))}
    </div>
  );
}
