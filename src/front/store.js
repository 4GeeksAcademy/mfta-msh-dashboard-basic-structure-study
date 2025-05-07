export const initialStore=()=>{
  return{
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      }
    ],
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
    case 'set_hello':
      return {
        ...store,
        message: action.payload
      };
      
    case 'add_task':

      const { id,  color } = action.payload

      return {
        ...store,
        todos: store.todos.map((todo) => (todo.id === id ? { ...todo, background: color } : todo))
      };
      case "simulate_admin_login":
        return {
          ...store,
          user: {
            id: 1,
            username: "JohnDoe",
            email: "jhondoe@email.com",
            role: "admin"
          }
        };
      case "simulate_user_login":
        return {
          ...store,
          user: {
            id: 2,
            username: "JaneDoe",
            email: "janedoe@email.com",
            role: "user"
          }
        };
      case "simulate_logout":
        return {
          ...store,
          user: {
            id: null,
            username: null,
            email: null,
            role: null
          }
        };
    default:
      throw Error('Unknown action.');
  }    
}
