class NavBar extends React.Component {
    render() 
    {
       return (
           <nav className="deep-purple">
               <div className="nav-wrapper">
                   <a href="index.html" className="brand-logo center">Amazing Pixel</a>
                   <MyComponents.Auth></MyComponents.Auth>
               </div>
           </nav>
       );
    }
}
MyComponents.NavBar = NavBar