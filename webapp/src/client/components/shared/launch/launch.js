import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';
import './launch.css';
import { LoginReducer } from '../../../redux/actions';
import SpinnerComponent from '../spinner/SpinnerComponent';
import * as types from '../../../redux/constants/actionTypes';
import { UNAUTHORIZED_TITLE, UNAUTHORIZED_MSG } from '../../utility/constants';


class Launch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rToken: this.props.match.params.uuid,
            displayLoadingSpinner: true
        }
    }

    componentDidMount() {
        const { loginData } = this.props;
        const { token = '' } = loginData;
        let launchToken = this.state.rToken;
        console.log("launch loaded");

        Axios.get(`${types.BASE_SERVICE_URI}/${launchToken}`)
            .then(res => {
                const token = res.data;
                this.setState({ displayLoadingSpinner: false });
                this.props.dispatch(LoginReducer(token));
                this.props.history.push({ pathname: '/home' });
            })
            .catch((error) => {
                this.setState({ displayLoadingSpinner: false });
                this.props.history.push({
                    pathname: '/message',
                    state: { title: UNAUTHORIZED_TITLE, body: UNAUTHORIZED_MSG }
                });
            });
    }

    render() {
        const { displayLoadingSpinner } = this.state;

        return (
            <div className="launch-spinner" >
                <SpinnerComponent displaySpinner={displayLoadingSpinner} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return ({
        loginData: state.login,
    });
}
export default connect(
    mapStateToProps
)(withRouter(Launch))
