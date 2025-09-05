import React from "react";
import type { Post } from "../App";

interface PostItemProps {
  post: Post;
  toggleLike: (id: number) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, toggleLike }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow flex justify-between items-center">
      <div>
        <h3 className="font-bold text-lg">{post.title}</h3>
        <p className="text-gray-600">{post.content}</p>
        <button onClick={() => toggleLike(post.id)}>
          {post.liked ? "❤️" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default PostItem;