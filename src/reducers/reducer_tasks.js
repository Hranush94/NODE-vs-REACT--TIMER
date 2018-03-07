import {GET_TASKS} from '../actions/index'

export default function (state = [], action) {
  switch (action.type) {
    case 'GET_TASKS':
      return action.payload;
    case 'FETCH_TASK':
      console.log('saved');
    case 'UPDATE_TASK':
      console.log('updated');
    case 'DELETE_TASK':
      console.log('deleted');
  }
  
  return state;
}