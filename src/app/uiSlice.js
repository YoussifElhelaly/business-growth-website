import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    mobileMenuOpen: false,
    requestDialogService: null,
  },
  reducers: {
    toggleMobileMenu(state) {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    closeMobileMenu(state) {
      state.mobileMenuOpen = false;
    },
    openRequestDialog(state, action) {
      state.requestDialogService = action.payload || "";
    },
    closeRequestDialog(state) {
      state.requestDialogService = null;
    },
  },
});

export const { toggleMobileMenu, closeMobileMenu, openRequestDialog, closeRequestDialog } = uiSlice.actions;
export default uiSlice.reducer;
