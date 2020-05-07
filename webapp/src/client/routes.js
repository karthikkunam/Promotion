import React, { Component } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../client/components/Home';
import Launch from './components/shared/launch/launch';
import PromotionEdit from '../client/components/body/promotions/PromotionEdit';
import { Header, SessionManager } from '@7eleven/7boss-components';
import Sidenav from './components/shared/sidenav/sidenav.jsx';
import Message from './components/shared/messages/message';

export class routes extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { loginData } = this.props;
        const { token = '', refreshToken='', userName = '', userId = '', storeId = '' } = loginData;
        const storeDetails = [ { storeId: storeId, userId: userId, fullName: userName } ];
        const AUTH_URL = "https://7bossauth.ris-dev.7-eleven.com"
        const tokenDetails = {
            authorization: token,
            payLoad: {
                storeId: storeId,
                userId: userId,
                refreshToken: refreshToken,
            },
            refreshTokenUrl: `${AUTH_URL}/7boss/promo/auth/refresh/token`,
        };
        return (
            <BrowserRouter basename = "/7boss/promo">
                <Header 
                  headerType={token ? "loggedIn" : "loggedOut"}
                  hideHamburgerMenu={true}
                  hideNotifications={true}
                  storeDetails={storeDetails}
                />
                <SessionManager
                  eventDebounceTime={3000}
                  refreshTokenEnabled={true}
                  sessionTimeout={13000}
                  setSession = {token? true: false}
                  tokenDetails={tokenDetails}
                  tokenRefreshTime={5000}
                >
                </SessionManager>
                <div className = "container container-body">
                <Sidenav />
                {token && !(window.location && window.location.pathname.includes('/launch/')) ?
                    
                    <Switch>
                        <Route path="/home" component={Home} />
                        <Route path="/promotionedit" component={PromotionEdit} />
                        <Route path="/message" render={(props) => <Message message={this.props.message}{...props} />} />
                        <Redirect from='/' to='/home' />
                    </Switch>
                    :
                    <Switch>
                        <Route path="/launch/:uuid" component={Launch} />
                        <Route exact path="/message" render={(props) => <Message message={this.props.message}{...props} />} />
                        {token &&
                        <Route exact path="/home" component={Home} />
                        }
                        {/* <Route path="/home" component={Home} /> */}
                        <Redirect from='*' to='/message' />
                    </Switch> 
                }
                </div>
            </BrowserRouter>
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
)((routes))
