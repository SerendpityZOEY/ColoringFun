class NavBar extends React.Component {
    render() {
        var color = "deep-purple"
        if (this.props.color != null)
        {
            color = this.props.color;
        }
        return (
            <nav className={color}>
                <div className="nav-wrapper">
                    <a href="index.html" className="brand-logo center">Coloring Fun</a>
                    <MyComponents.Auth></MyComponents.Auth>
                </div>
            </nav>
        );
    }
}
MyComponents.NavBar = NavBar
ReactDOM.render(
    <MyComponents.NavBar />,
    document.getElementById('navbar')
);