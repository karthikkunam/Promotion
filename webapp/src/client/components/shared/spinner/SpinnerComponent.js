/* eslint-disable operator-linebreak */
import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import PropTypes from 'prop-types';

export class SpinnerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySpinner: props.displaySpinner
    };
  }


  componentWillReceiveProps(newProps) {
    this.setState({ displaySpinner: newProps.displaySpinner });
  }

  render() {
    const { displaySpinner } = this.state;
    return (
      <div className="spinner-backdrop">
        {displaySpinner &&
          <div className="spinner">
            <Spinner type="grow" className="orange" />
            <Spinner type="grow" className="red" />
            <Spinner type="grow" className="green" />
          </div>
        }
      </div>
    );
  }
}
SpinnerComponent.propTypes = {
  displaySpinner: PropTypes.bool,
};

SpinnerComponent.defaultProps = {
  displaySpinner: true
};
export default SpinnerComponent;
