import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { redditAPI } from "./redditAPI"

export interface RedditState {
    posts: Post[];
    searchTerm: string;
    curSubreddit: string;
    loading: boolean;
    error: boolean;
}

interface Post {
    id: string;
    title: string;
    author: string;
    score: number;
    url: string;
    index: number;
    permalink: string;
    loadingComments: boolean;
    showingComments: boolean;
    errorComments: boolean;
    error: boolean;
    comments: Comment[];
}

interface Comment {
    id: string;
    postId: string;
    text: string;
    author: string;
}

const initialState: RedditState = {
    posts: [],
    searchTerm: '',
    curSubreddit: '',
    loading: false,
    error: false,
};

export const redditSlice = createAppSlice({
    name: 'redditPosts',
    initialState,
    reducers: create => ({
        fetchPostsStart: create.reducer(state => {
            state.loading = true;
            state.error = false;
        }),
        fetchPostsSuccess: create.reducer((state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
            state.loading = false;
        }),
        fetchPostsFailure: create.reducer((state) => {
            state.loading = false;
            state.error = true;
        }),
        fetchCommentsStart: create.reducer((state, action: PayloadAction<number>) => {
            state.posts[action.payload].showingComments = !state.posts[action.payload].showingComments;
            if (!state.posts[action.payload].showingComments) {
                return;
            } 
            state.posts[action.payload].loadingComments = true;
            state.posts[action.payload].error = false;
        }),
        fetchCommentsSuccess: create.reducer((state, action: PayloadAction<{ index: number, comments: Comment[] }>) => {
            state.posts[action.payload.index].comments = action.payload.comments;
            state.posts[action.payload.index].loadingComments = false;
        }),
        fetchCommentsFailure: create.reducer((state, action: PayloadAction<number>) => {
            state.posts[action.payload].loadingComments = false;
            state.posts[action.payload].error = true;
        }),
        setSearchTerm: create.reducer((state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        }),
        setCurSubreddit: create.reducer((state, action: PayloadAction<string>) => {
            state.curSubreddit = action.payload;
            state.searchTerm = '';
        }),
    }),
    selectors: {
        selectPosts: (state) => state.posts,
        //selectComments: (state) => state.comments,
        selectSearchTerm: (state) => state.searchTerm,
        selectCurSubreddit: (state) => state.curSubreddit,
        selectLoading: (state) => state.loading,
        selectError: (state) => state.error,
    },
});

export const {
    fetchPostsStart,
    fetchPostsSuccess,
    fetchPostsFailure,
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchCommentsFailure,
    setSearchTerm,
    setCurSubreddit,
} = redditSlice.actions;

export const {
    selectPosts, 
    //selectComments, 
    selectSearchTerm, 
    selectCurSubreddit, 
    selectLoading, 
    selectError
} = redditSlice.selectors;

export const fetchPosts = (subreddit: string): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchPostsStart());
        const posts = await redditAPI.getPosts(subreddit);
        const postsWithMetadata = posts.map((post: Post) => ({
            ...post,
            showingComments: false,
            comments: [],
            loadingComments: false,
            errorComments: false,
          }));
        dispatch(fetchPostsSuccess(postsWithMetadata));
    } catch (error: any) {
        dispatch(fetchPostsFailure());
    }
};

export const fetchComments = (index: number, permalink: string): AppThunk => async (dispatch) => {
    try {
        dispatch(fetchCommentsStart(index));
        const comments = await redditAPI.getPostComments(permalink);
        dispatch(fetchCommentsSuccess({ index, comments })); 
    } catch (error: any) {
        dispatch(fetchCommentsFailure(index));
    }
};

export default redditSlice.reducer;