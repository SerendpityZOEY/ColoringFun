class NavBar extends React.Component {
    render() {
        return (
            <nav className="deep-purple">
                <div className="nav-wrapper">
                    <a href="#" className="brand-logo center">Yue ZHANG</a>
                    <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><a href="#skills-heading">Skills</a></li>
                        <li><a href="canvas.html">Canvas</a></li>
                        <li><a href="reactCanvas.html">ReactCanvas</a></li>
                    </ul>
                    <ul className="side-nav" id="mobile-demo">
                        <li><a href="#skills-heading">Skills</a></li>
                    </ul>
                </div>
            </nav>
        );
    }
}
MyComponents.NavBar = NavBar