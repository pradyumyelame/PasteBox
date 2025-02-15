import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../Redux/counterSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.counter.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes?.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  const CreatePaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    try {
      if (pasteId) {
        dispatch(updateToPastes(paste));
        toast.success('Paste updated successfully!');
      } else {
        dispatch(addToPastes(paste));
        toast.success('Paste created successfully!');
      }

      setTitle('');
      setValue('');
      setSearchParams({});
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card">
        <h2 className="mb-6 text-center">
          {pasteId ? 'Update Paste' : 'Create New Paste'}
        </h2>
        
        <div className="space-y-6">
          <div>
            <input
              className="w-full px-4 py-3"
              type="text"
              placeholder="Enter Title here"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <textarea
              className="w-full px-4 py-3 min-h-[400px] resize-y"
              value={value}
              placeholder="Enter content here"
              onChange={(e) => setValue(e.target.value)}
            />
          </div>

          <button
            onClick={CreatePaste}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;