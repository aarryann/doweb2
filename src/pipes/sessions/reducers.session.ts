const initialState = {
  isAuthenticated: false,
  currentUser: null,
  socket: null,
  channel: null,
  error: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        isAuthenticated: true,
        currentUser: action.currentUser,
        socket: action.socket,
        channel: action.channel,
        error: null
      };

    case 'USER_SIGNED_OUT':
      return initialState;

    case 'SESSIONS_ERROR':
      return { ...state, error: action.error };

    default:
      return state;
  }
}
