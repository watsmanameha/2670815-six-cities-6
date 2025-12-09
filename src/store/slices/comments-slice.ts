import { createSlice } from '@reduxjs/toolkit';
import { Comment } from '../../types/comment';
import { fetchComments, postComment } from '../action';

type CommentsSliceState = {
  comments: Comment[];
  isCommentsLoading: boolean;
  hasCommentsError: boolean;
  isCommentPosting: boolean;
};

const initialState: CommentsSliceState = {
  comments: [],
  isCommentsLoading: false,
  hasCommentsError: false,
  isCommentPosting: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isCommentsLoading = true;
        state.hasCommentsError = false;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isCommentsLoading = false;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isCommentsLoading = false;
        state.hasCommentsError = true;
      })
      .addCase(postComment.pending, (state) => {
        state.isCommentPosting = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isCommentPosting = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.isCommentPosting = false;
      });
  },
});

export default commentsSlice.reducer;
