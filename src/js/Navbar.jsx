class NavBar extends React.Component {
    render() {
        var user = this.props.user
        if (user != null){
            return (
                <nav className="deep-purple">
                    <div className="nav-wrapper">
                        <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                        <a href="#" className="brand-logo center">Amazing Pixel</a>
                        <ul id="nav-mobile" className="right">
                            <li>{user.displayName}</li>
                            <li><a href="#" onClick={this.props.actions.logout}>Logout</a></li>
                        </ul>
                    </div>
                </nav>
            );
        } else {
            return (
                <nav className="deep-purple">
                    <div className="nav-wrapper">
                        <a href="#" className="brand-logo center">Amazing Pixel</a>
                        <ul id="nav-mobile" className="right">
                            <li><a href="#" onClick={this.props.actions.login}>Login Via Google</a></li>
                        </ul>
                    </div>
                </nav>
            );
        }
    }
}
MyComponents.NavBar = NavBar