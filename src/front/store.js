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
    },
    usersList: [
      { id: 1, name: 'Mark', lastName: 'Otto', username: '@mdo' },
      { id: 2, name: 'Jacob', lastName: 'Thornton', username: '@jth' },
      { id: 3, name: 'John', lastName: 'Doe', username: '@jdoe' },
      { id: 4, name: 'Jane', lastName: 'Doe', username: '@jane' },
      { id: 5, name: 'Mary', lastName: 'Smith', username: '@marysmith' },
      { id: 6, name: 'James', lastName: 'Bond', username: '@jbond007' },
      { id: 7, name: 'Bruce', lastName: 'Wayne', username: '@bruce' },
      { id: 8, name: 'Clark', lastName: 'Kent', username: '@ckent' },
      { id: 9, name: 'Peter', lastName: 'Park', username: '@spider' },
      { id: 10, name: 'Wade', lastName: 'Wilson', username: '@anoldsoul' },
      { id: 11, name: 'Natasha', lastName: 'Romanoff', username: '@natinatasha' },
      { id: 12, name: 'Steve', lastName: 'Rogers', username: '@steve' },
      { id: 13, name: 'Thor', lastName: 'Odinson', username: '@thor' },
      { id: 14, name: 'Wanda', lastName: 'Maximoff', username: '@wmsocial' },
      { id: 15, name: 'Stephen', lastName: 'Strange', username: '@strange' },
      { id: 16, name: 'Peter', lastName: 'Quill', username: '@quillpeter' },
      { id: 17, name: 'Gamora', lastName: 'Zen Whoberi', username: '@gamora' },
      { id: 18, name: 'Drax', lastName: 'the Destroyer', username: '@drax' },
      { id: 19, name: 'Rocket', lastName: 'Raccoon', username: '@rocketsocial' },
      { id: 20, name: 'Groot', lastName: '', username: '@grootsocial' },
      { id: 21, name: 'Nick', lastName: 'Fury', username: '@myfury' },
      { id: 22, name: 'Maria', lastName: 'Hill', username: '@mariahill' },
      { id: 23, name: 'Phil', lastName: 'Coulson', username: '@phil001' },
      { id: 24, name: 'Clint', lastName: 'Barton', username: '@barton' },
      { id: 25, name: 'Nati', lastName: 'Romanoff', username: '@natiroma' },
      { id: 26, name: 'Scott', lastName: 'Lang', username: '@langlang' },
      { id: 27, name: 'Hope', lastName: 'van Dyne', username: '@myhope' },
      { id: 28, name: 'Hank', lastName: 'Pym', username: '@hankpym' },
      { id: 29, name: 'Janet', lastName: 'van Dyne', username: '@jvd000' },
      { id: 30, name: 'Sam', lastName: 'Wilson', username: '@samsocial' }
  ]
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
