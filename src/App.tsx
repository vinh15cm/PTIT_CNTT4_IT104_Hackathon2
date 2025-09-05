import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import Modal from "./components/Modal";

export interface Post {
  id: number;
  title: string;
  content: string;
  liked: boolean;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("posts");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState<"all" | "liked">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
  }, [posts]);

  const addPost = (title: string, content: string) => {
    if (!title.trim() || !content.trim()) return;
    const newPost: Post = {
      id: Date.now(),
      title,
      content,
      liked: false,
    };
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  const toggleLike = (id: number) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, liked: !p.liked } : p)));
  };

  const filteredPosts =
    filter === "liked" ? posts.filter((p) => p.liked) : posts;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-500">
      <div className="w-full max-w-2xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-lg p-6">
        {/* Thống kê */}
        <div className="grid grid-cols-2 gap-4 text-center mb-6">
          <div className="bg-white/20 rounded-xl p-4">
            <h2 className="text-2xl font-bold text-white">{posts.length}</h2>
            <p className="text-sm text-gray-100">Bài viết</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4">
            <h2 className="text-2xl font-bold text-white">
              {posts.filter((p) => p.liked).length}
            </h2>
            <p className="text-sm text-gray-100">Lượt thích</p>
          </div>
        </div>

        {/* Lọc + Tạo bài viết */}
        <div className="flex justify-between items-center mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as "all" | "liked")}
            className="p-2 rounded-lg"
          >
            <option value="all">Tất cả bài viết</option>
            <option value="liked">Bài viết yêu thích</option>
          </select>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-4 py-2 rounded-xl shadow-lg"
          >
            Tạo bài viết
          </button>
        </div>

        {/* Danh sách bài viết */}
        <PostList posts={filteredPosts} toggleLike={toggleLike} />
      </div>

      {/* Modal thêm bài viết */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)} onSave={addPost} />
      )}
    </div>
  );
};

export default App;