class Auth extends React.Component {
    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {
        this.setState({user: JSON.parse(localStorage.getItem('amazingpixel::user'))})
    }

    login() {
        var react = this
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user.providerData[0]
            console.log(result)
            console.log(user)
            react.setState(
                {
                    user: {
                        uid: result.user.uid,
                        email: user.email,
                        displayName: user.displayName,
                        avatar: user.photoURL
                    }
                }
            )

            localStorage.setItem('amazingpixel::user', JSON.stringify(react.state.user))

            var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/')
            var userRef = firebaseRef.child('users').child(react.state.user.uid)
            userRef.set(react.state.user)
        }).catch(function (error) {
            console.log(error)
        });
    }

    logout() {
        var react = this
        if (react.state.user) {
            var react = this
            firebase.auth().signOut().then(function () {
                localStorage.removeItem('amazingpixel::user')
                react.setState({user: null})
            }, function (error) {
                console.log(error)
            });
        }
    }

    render() {
        if (this.state.user == null) {
            return (
                <ul id="nav-mobile" className="right">
                    <li><a href="#" id = "loginBtn" onClick={this.login.bind(this)}>Login Via Google</a></li>
                </ul>
            );
        } else {
            return (
                <ul id="nav-mobile" className="right">
                    <li style={{marginBottom:-15}}><img src={this.state.user.avatar} style={{width:35,height:35,borderRadius:18,marginTop:15,marginRight:3}}/></li>
                    <li>{this.state.user.displayName}</li>
                    <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                </ul>
            );
        }
    }
}

MyComponents.Auth = Auth
