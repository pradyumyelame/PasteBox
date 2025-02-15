import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes") 
    ? JSON.parse(localStorage.getItem("pastes")) 
    : []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Check if paste already exists
      const exists = state.pastes.some(item => item._id === paste._id);
      if (exists) {
        toast.error("Paste already exists!");
        return;
      }

      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));  // ✅ Correct
      toast.success("Paste Created Successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));  // Fixed
        toast.success("Paste Updated Successfully");
      } else {
        toast.error("Paste not found!");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes reset successfully.");
    },
    removefromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted successfully");
      } else {
        toast.error("Paste not found!");
      }
    }
  }
});

// Action creators are generated for each case reducer function
export const { addToPastes, updateToPastes, resetAllPastes, removefromPastes } = counterSlice.actions;

export default counterSlice.reducer;
