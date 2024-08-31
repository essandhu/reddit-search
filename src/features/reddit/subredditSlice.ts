import { createSlice } from "@reduxjs/toolkit"
import { redditAPI } from "./redditAPI"
import type { AppThunk } from "../../app/store"

export interface SubredditState {
  subreddits: any[]
  loading: boolean
  error: boolean
}

const initialState: SubredditState = {
  subreddits: [],
  loading: false,
  error: false,
}

export const subredditSlice = createSlice({
  name: "subreddits",
  initialState,
  reducers: {
    fetchSubredditsStart(state) {
      state.loading = true
      state.error = false
    },
    fetchSubredditsSuccess(state, action) {
      state.loading = false
      state.subreddits = action.payload
    },
    fetchSubredditsFailure(state) {
      state.loading = false
      state.error = true
    },
  },
  selectors: {
    selectSubreddits: state => state.subreddits,
    selectLoading: state => state.loading,
    selectError: state => state.error,
  },
})

export const {
  fetchSubredditsStart,
  fetchSubredditsSuccess,
  fetchSubredditsFailure,
} = subredditSlice.actions

export const { selectSubreddits, selectLoading, selectError } =
  subredditSlice.selectors

export const fetchSubreddits = (): AppThunk => async dispatch => {
  try {
    dispatch(fetchSubredditsStart())
    const subreddits = await redditAPI.getSubreddits()
    dispatch(fetchSubredditsSuccess(subreddits))
  } catch (error: any) {
    dispatch(fetchSubredditsFailure())
  }
}

export default subredditSlice.reducer
