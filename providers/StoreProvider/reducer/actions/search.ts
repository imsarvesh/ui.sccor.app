const search = (state) => ({
  loadSearch: (action) => {
    return {
      ...state,
      search: {
        ...action.payload,
      },
    };
  },
  loadMoreSearch: (action) => {
    const { results, nextToken } = action.payload;
    return {
      ...state,
      search: {
        results: [...state.search.results, ...results],
        nextToken,
      },
    };
  },
});

export default search;
