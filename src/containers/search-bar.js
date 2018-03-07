import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTask} from "../actions/index";
import {getTasks} from "../actions/index";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      termTime: '',
      termInterval: ''
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputChangeStartTime = this.onInputChangeStartTime.bind(this);
    this.onInputChangeInterval = this.onInputChangeInterval.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    let count = 0;
    
  }
  
  onInputChange(event) {
    this.setState({term: event.target.value});
  }
  
  onInputChangeStartTime(event) {
    this.setState({termTime: event.target.value});
  }
  
  onInputChangeInterval(event) {
    this.setState({termInterval: event.target.value});
  }
  
  onFormSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state.term, this.state.termInterval, this.state.termTime);
    this.setState({term: ''});
    this.setState({termTime: ''});
    this.setState({termInterval: ''});
    
  }
  
  render() {
    
    return (
      <div>
        <form onSubmit={this.onFormSubmit} className="input-group">
          <input
            placeholder="Put task here"
            className="form-control"
            value={this.state.term}
            onChange={this.onInputChange}
          />
          <input
            placeholder="Put startTime here.ex:MM-DD-YYYY HH:MM:SS"
            className="form-control"
            value={this.state.termTime}
            onChange={this.onInputChangeStartTime}
          />
          <input
            placeholder="Put interval here"
            className="form-control"
            value={this.state.termInterval}
            onChange={this.onInputChangeInterval}
          />
          <span className="input-group-btn ">
    <button type="submit" className="btn btn-secondary">Submit</button>
    </span>
        
        </form>
        <span className="input-group-btn ">
    
      <button onClick={this.props.getTasks} className="btn btn-secondary">TASKS</button>
  </span>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addTask: addTask, getTasks: getTasks}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);