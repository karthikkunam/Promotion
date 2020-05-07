import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.initialModalState,
      msgTitle: props.msgTitle || '',
      msgBody: props.msgBody || '',
      showModal: props.showModal,
      isPageValidation: props.isPageValidation || false,
      isCrpValidation: props.isCrpValidation || false
    }
   
    this.toggle = this.toggle.bind(this);

  }

  componentDidMount() {
    this.setState({
      // modifiedItems: this.props.modifiedItems
    })
    this.toggle();
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      // modifiedItems: newProps.modifiedItems
    })
  }

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }), () => {
      if (this.props.modalAction) {
        this.props.modalAction(this.state.modal);
      }
    });
  }

  onClickRedirect = () => {
    this.props.redirectToHome();
  }
  
  render() {
    const {  msgBody, msgTitle, isPageValidation, isCrpValidation } = this.state;
    return (
      <div className="message-box">
        <Modal
          show={this.state.showModal}
          isOpen={this.state.modal}
          toggle={this.toggle}
          centered={false}
          className={this.props.className}
          backdrop="static" >
          { msgTitle &&
          <ModalHeader >{msgTitle}</ModalHeader> 
          }  
          <ModalBody>
            {msgBody}
          </ModalBody>
          <ModalFooter>
           
            { isPageValidation &&         
              <div className="modal-footer-inner">
                <Button id="btn-sideNav-stay-on-page" className="btn btn-secondary" onClick={this.toggle}>No, Stay On Page</Button>
                <Button className="btn btn-danger" onClick={this.onClickRedirect}>Yes, Discard</Button>
              </div>
            }
            
            { isCrpValidation &&
              <div className="modal-footer-inner modal-footer-centered ">
                <Button id="btn-sideNav-ok" className="btn btn-success" onClick={this.toggle}>OK</Button>
              </div>
            }
           
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}


export default connect(
  null
)(withRouter(MessageBox))