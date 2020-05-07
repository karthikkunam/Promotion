import React from 'react';
import logo from '../../../assets/imgs/logo.png';
import '../../../assets/scss/page-header.scss';

class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top logged-in">
                <div className="container">
                    <button type="button" className="icon icon-hamburger" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"></button>

                    <a id="header-logo-link" href="non-bs.html" className="navbar-brand header-logo-container">
                        <span src={logo} id="header-logo" id="header-logo" className="navbar-brand-logo header-logo img-fluid" alt="Seven eleven logo"></span>
                    </a>

                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div id="navbarNavDropdown" className="collapse navbar-collapse header-info">
                        <span className="navbar-text header-text">Promo Participation</span>

                        <span className="navbar-nav header-info-container ml-auto">
                            <span className="navbar-text header-name-text">Hi Long Emplyee Name</span>
                        </span>

                        <form className="form-inline logged-out">
                            <button type="submit" className="btn btn-sm btn-outline-primary login">LOGIN</button>
                            <button type="submit" className="btn btn-sm btn-outline-primary clockin">CLOCK IN / OUT</button>
                        </form>

                        <ul className="navbar-nav image-container">
                            <li className="nav-item">
                                <a className="nav-item-icon icon icon-print" href="#"></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-item-icon alert-icon-container slide-out" id="sidebarCollapse" href="#">
                                    <span className="alert-icon">
                                        <span className="alert-icon-circle">
                                            <span className="alert-icon-count">3</span>
                                        </span>
                                    </span>
                                    <span className="icon icon-bell"></span>
                                </a>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link header-name-text 7hub" href="#">7 HUB <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link header-name-text help" href="#">HELP</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;