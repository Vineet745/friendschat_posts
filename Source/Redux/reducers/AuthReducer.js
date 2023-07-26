
const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST': 
      return {...state, isLoading: true};
    case 'LOGIN_REQUEST':
      return {...state, isLoading: true};
    case 'REGISTER_SUCCESS':
      return {...state, user: action.payload, isLoading: false, error: null};
    case 'LOGIN_SUCCESS':
      return {...state, user: action.payload, isLoading: false, error: null};
    case 'REGISTER_FAIL':
      return {...state, user: null, isLoading: false, error: action.payload};
    case 'LOGIN_FAIL':
      return {...state, user: null, isLoading: false, error: action.payload};
      case 'EXISTINGUSER_SUCCESS':
        return {...state, user:action.payload, isLoading:false, error:null}
        case 'LOGOUT':
          return{...state, user:null,isLoading:false,error:null}
    default:
      return state;
  }
};
