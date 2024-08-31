import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit"

// create a slice with async thunks
export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})
