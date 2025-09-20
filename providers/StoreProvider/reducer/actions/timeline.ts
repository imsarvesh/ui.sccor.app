const timeline = (state) => ({
  loadTimeline: (action) => {
    return {
      ...state,
      timeline: {
        ...action.payload,
      },
    };
  },
  loadMoreTimeline: (action) => {
    const { posts, nextToken } = action.payload;
    return {
      ...state,
      timeline: {
        posts: [...state.timeline.posts, ...posts],
        nextToken,
      },
    };
  },
});

export default timeline;
