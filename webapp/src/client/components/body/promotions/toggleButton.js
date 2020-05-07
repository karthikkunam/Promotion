import React from 'react';


export class ToggleButton extends React.Component {
  constructor(props) {
      super(props);  
      this.state = {
        isOn: this.props.isOn || false
      }    
      this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle = () => {
    this.setState({
      isOn: !this.state.isOn
    }, () => {
        this.props.toggleValue(this.state.isOn);
    });
  }

  render() {
  const {isOn} = this.state;
  return (
    <label className="switch round">
        <input type="checkbox" checked={isOn} onClick={(e)=> {this.handleToggle()}} />
        <span className="slider round">
        <span className="switch-text on">Yes</span>
        <span className="switch-text off">No</span>
        </span>
    </label>
  )};
};

export default ToggleButton;