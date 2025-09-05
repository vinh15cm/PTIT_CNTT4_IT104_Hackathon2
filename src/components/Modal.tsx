import React, { useState } from "react";

interface ModalProps {
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Thêm bài viết</h2>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Tiêu đề"
          className="w-full border p-2 mb-3 rounded-lg"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung"
          className="w-full border p-2 mb-3 rounded-lg"
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300"
          >
            Hủy
          </button>
          <button
            onClick={() => onSave(title, content)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white"
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;