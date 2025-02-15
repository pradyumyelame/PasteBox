import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removefromPastes } from "../Redux/counterSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.counter.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    if (window.confirm('Are you sure you want to delete this paste?')) {
      dispatch(removefromPastes(pasteId));
      toast.success('Paste deleted successfully');
    }
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const handleShare = async (pasteId) => {
    const shareableUrl = `${window.location.origin}/pastes/${pasteId}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Check out this paste",
          text: "Here's a useful paste I wanted to share with you.",
          url: shareableUrl,
        });
        toast.success("Shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareableUrl);
        toast.success("Shareable link copied!");
      }
    } catch (err) {
      toast.error("Failed to share");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <input
          className="w-full px-4 py-3"
          type="search"
          placeholder="Search pastes..."
          onChange={handleSearchChange}
        />
      </div>

      <div className="space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div key={paste._id} className="card hover:shadow-xl">
              <div className="mb-4">
                <h3 className="text-xl font-semibold">{paste.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                  {paste.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  View
                </button>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleCopy(paste.content)}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Copy
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Share
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No pastes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;