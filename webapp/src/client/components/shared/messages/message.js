import React, { Component } from 'react';
import { connect } from 'react-redux';

class Message extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: 'Session Expired',
      body: 'Your 7BOSS session has expired. To reconnect, please reboot your browser and login again.',
    }
  }

  // componentDidMount() {
  //   let message = this.props.location.state ? this.props.location.state : this.props.message;
  //   this.setState({
  //     title: message ? message.title : "",
  //     body: message ? message.body : ""
  //   });

  // }


  componentWillReceiveProps(newProps){
    if(newProps && newProps.title && newProps.body){
      this.setState({
        title: newProps.title,
        body: newProps.body
      })
    }
  }

  closeWindow() {
    window.open("about:blank", "_self");
    window.close();
  }
  render() {
    return (
      <div className="container-body-right error-page full-height">
        <div className="row full-height col">
          <div className="col-sm-8 col-left">
            <div className="center-align error-page-message">
              <h1 className="header">{this.state.title}</h1>
              <p className="content" dangerouslySetInnerHTML={{__html: this.state.body}}></p>
            </div>
          </div>
          <div className="col-sm-4 col-right">
            <span className="icon icon-logo-7eleven-color center-align"><span className="path1"></span><span className="path2"></span><span className="path3"></span><span className="path4"></span><span className="path5"></span><span className="path6"></span><span className="path7"></span><span className="path8"></span><span className="path9"></span><span className="path10"></span></span>
          </div>
          <div className="footer">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return ({
    // body : state.session.messageData && state.session.messageData.payload && state.session.messageData.payload.body ? state.session.messageData.payload.body : "",
    // title : state.session.messageData && state.session.messageData.payload && state.session.messageData.payload.title ? state.session.messageData.payload.title : "",
  }
  );
}

export default connect(
  mapStateToProps
)((Message))
