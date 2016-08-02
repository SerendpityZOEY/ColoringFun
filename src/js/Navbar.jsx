// import React from 'react';
// import { render } from 'react-dom';
// import * as Auth from './Auth';
import Auth from './Auth'

class NavBar extends React.Component {
    render() {
            return (
                <nav className="deep-purple">
                    <div className="nav-wrapper">
                        <a href="index.html" className="brand-logo center">Amazing Pixel</a>
                        <ul id="nav-mobile" className="right">
                            <Auth></Auth>
                        </ul>
                    </div>
                </nav>
            );
        }
}
MyComponents.NavBar = NavBar