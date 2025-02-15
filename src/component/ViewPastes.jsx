import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

const ViewPastes = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPastes = useSelector((state) => state.counter.pastes);
  const paste = allPastes.find((p) => p._id === id);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (paste) {
      setTitle(paste.title);
      setContent(paste.content);
    } else {
      navigate('/pastes');
    }
  }, [paste, navigate]);

  if (!paste) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Created: {new Date(paste.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code>{content}</code>
          </pre>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate('/pastes')}
            className="bg-gray-600 hover:bg-gray-700 text-white"
          >
            Back to Pastes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPastes;