import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getTasks} from "../actions";
import Task from "./task";
class TaskList extends Component {
 
 
  render() {
    return (
      <table className="table table-hover">
        <thead>
        <tr>
          <th>TaskName</th>
          <th>StartDate</th>
          <th>Interval</th>
        </tr>
        </thead>
        <tbody>
        {this.props.tasks.map((task,index) => <Task key={index} task={task} index={index}/>)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getTasks: getTasks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);