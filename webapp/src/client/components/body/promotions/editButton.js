import React, {Component} from "react";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getStoreOffersDetails } from '../../../redux/actions/index';

export class EditButtonRenderer extends React.Component {
    constructor(props) {
        super(props);
        //this.props=props; this.props.data.promotionName;       
    }
    
    onClickEdit = () => {
        
      this.props.history.push({ pathname: `/promotionedit`, state: { offer_id: this.props.data.offer_id }});
      this.props.dispatch(getStoreOffersDetails(this.props.data.offer_id));

    }

    render() {
        return (
            <span><button id="edit-button" className="btn btn-sm btn-secondary" onClick={(e)=> {this.onClickEdit()}}>EDIT</button></span>
        );
    }
};

export default connect(
    null
  )(withRouter(EditButtonRenderer))