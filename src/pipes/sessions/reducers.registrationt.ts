const initialState = {
  errors: null
};

export default function reducer(state = initialState, action: any) {
  switch (action.type) {
    case 'REGISTRATIONS_ERROR':
      return { ...state, errors: action.errors };

    default:
      return state;
  }
}
