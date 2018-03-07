import React, { Component } from 'react';
import SearchBar from '../containers/search-bar';
import TaskList from '../containers/tasks_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar/>
        <TaskList />
      </div>
    );
  }
}
