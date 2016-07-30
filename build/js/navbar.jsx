class NavBar extends React.Component {
    render() {
        var display = "Login Via Google"
        console.log(this.props.user)
        console.log("Test 2")
        var user = null
        user = this.props.user
        if (user != null){
            console.log("user valid")
            display = "Welcome, " + user.displayName;
        }
        return (
            <nav className="deep-purple">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Amazing Pixel</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right">
                        <li><a href="#" onClick={this.props.actions.login}>{display}</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
MyComponents.NavBar = NavBar