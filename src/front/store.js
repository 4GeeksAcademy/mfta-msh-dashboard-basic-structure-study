export const initialStore=()=>{
  return{
    user: {
      id: null,
      username: null,
      email: null,
      role: null,
    }
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
      case 'login':
        return {
          ...store,
          user: {
            ...store.user,
            id: action.payload.id,
            username: action.payload.username,
            email: action.payload.email,
            role: action.payload.role
          }
        }
      case 'logout':
        return {
          ...store,
          user: {
            ...store.user,
            id: null,
            username: null,
            email: null,
            role: null
          }
        }
    default:
      throw Error('Unknown action.');
  }    
}
