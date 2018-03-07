export const GET_TASKS = 'GET_TASKS';
import React from 'react';
import axios from 'axios';

const API_KEY = '6a78596d062df78380eff5944c4e5567';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const ROOT_URL_GET = `http://localhost:3020/api/`;
const ROOT_URL_POST = `http://localhost:3020/api/tasks`;

export function addTask(task, interval, startDate) {
  const dataHistory = JSON.stringify({
    task: task,
    interval: interval,
    start: startDate,
  });
  
  return function (dispatch) {
    
    axios.post(ROOT_URL_POST, dataHistory, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        dispatch({
          type: 'FETCH_TASK',
          payload: response,
          
        })
      });
    
  }
}

export function getTasks() {
  const tasks = [];
  
  return function (dispatch) {
    
    axios.get(ROOT_URL_GET)
      
      .then(function (response) {
        response.data.map((task, index) => {
          tasks.push({
            _id: task._id,
            id: index,
            task: task.taskName,
            interval: task.interval,
            startDate: task.startTime
          });
          
        });
        dispatch({
          type: 'GET_TASKS',
          payload: tasks,
          
        })
      });
    
    
  }
}

export function updateTask(id, task, interval, startDate) {
  const ROOT_URL_UPDATE = `http://localhost:3020/api/tasks/${id}`;
  
  const dataUpdate = JSON.stringify({
    task: task,
    interval: interval,
    start: startDate,
  });
  
  
  return function (dispatch) {
    axios.put(ROOT_URL_UPDATE, dataUpdate, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(function (response) {
        dispatch({
          type: 'UPDATE_TASK',
          payload: response,
          
        })
      });
    
  }
}

export function deleteTask(id) {
  const ROOT_URL_DELETE = `http://localhost:3020/api/${id}`;
  const tasks = [];
  return function (dispatch) {
    axios.delete(ROOT_URL_DELETE)
      .then(function (response) {
        axios.get(ROOT_URL_GET)
          .then(function (response) {
            response.data.map((task, index) => {
              tasks.push({
                _id: task._id,
                id: index,
                task: task.taskName,
                interval: task.interval,
                startDate: task.startTime
              });
            });
            dispatch({
              type: 'GET_TASKS',
              payload: tasks,
              
            })
          });
        
        dispatch({
          type: 'DELETE_TASK',
          payload: response,
          
        })
      });
    
  }
}
