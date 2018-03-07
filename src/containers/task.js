import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {updateTask, deleteTask, getTasks} from "../actions";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.task.task,
      taskInterval: this.props.task.interval,
      taskStart: this.props.task.startDate
    };
    this.renderTask = this.renderTask.bind(this);
    this.onInputChangeTask = this.onInputChangeTask.bind(this);
    this.onInputChangeInterval = this.onInputChangeInterval.bind(this);
    this.onInputChangeStartDate = this.onInputChangeStartDate.bind(this);
  }
  
  
  onInputChangeTask(event, task) {
    this.setState({taskName: event.target.value});
  }
  
  onInputChangeInterval(event, task) {
    this.setState({taskInterval: event.target.value});
    
  }
  
  onInputChangeStartDate(event, task) {
    this.setState({taskStart: event.target.value});
    
  }
  
  onFormSubmit(event, task) {
    
    event.preventDefault();
    this.props.updateTask(
      task._id,
      this.state.taskName,
      this.state.taskInterval,
      this.state.taskStart
    );
  }
  
  delete(event, id) {
    event.preventDefault();
    this.props.deleteTask(id);
  }
  
  renderTask(task, index) {
    return (
      <tr className="row" key={index}>
        <td className="col-6">
          <input className="taskName" id={"taskName_" + task.id}
                 defaultValue={task.task}
                 style={{width: 200 + 'px'}}
                 onChange={(event) => this.onInputChangeTask(event, task)}
          />
        </td>
        <td className="col-4">
          <input className="startDate" defaultValue={task.startDate} style={{width: 180 + 'px'}}
                 id={"startDate_" + task.id}
                 onChange={(event) => this.onInputChangeStartDate(event, task)}
          />
        </td>
        <td className="col-4">
          <input className="interval" defaultValue={task.interval} style={{width: 100 + 'px'}}
                 id={"interval_" + task.id}
                 onChange={(event) => this.onInputChangeInterval(event, task)}
          />
        </td>
        
        <td className="col-2">
          <button onClick={(event) => this.onFormSubmit(event, task)} className="btn btn-secondary">
            Update
          </button>
        </td>
        <td className="col-2">
          <button onClick={(event) => this.delete(event, task._id)} className="btn btn-secondary">
            Delete
          </button>
        </td>
      
      
      </tr>
    )
  }
  
  render() {
    return (
      this.renderTask(this.props.task, this.props.index));
    
    
  }
  
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateTask: updateTask, deleteTask: deleteTask, getTasks: getTasks}, dispatch);
}

export default connect(null, mapDispatchToProps)(Task);