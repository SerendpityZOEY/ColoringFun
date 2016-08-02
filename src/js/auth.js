import React from 'react';


class Auth extends React.Component {
    constructor() {
        super()
        this.state ={
            user: JSON.parse(localStorage.getItem('amazingpixel::user'))
        }
    }
    
    login()
    {
        var react = this
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            var user = result.user
            console.log(user)
            react.setState(
                {
                    user: {
                        uid: user.uid,
                        displayName: user.displayName
                    }
                }
            )

            localStorage.setItem('amazingpixel::user', JSON.stringify(react.state.user))
            
            var firebaseRef = new Firebase('https://reactresume.firebaseio.com/')
            var userRef = firebaseRef.child(react.state.user.uid)
            userRef.set(react.state.user)
            react.setState({user:true})
        }).catch(function(error) {

        });
    }

    logout()
    {
        var react = this
        if (react.state.user){
            var react = this
            firebase.auth().signOut().then(function() {
                localStorage.removeItem('amazingpixel::user')
                react.setState({user:null})
            }, function(error) {
                
            });

        }
    }
    render() {
            if (this.state.user == null) {
                return (
                    <li><a href="#" onClick={this.login.bind(this)}>Login Google</a></li>
                );
            } else  {
                return (
                    <li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>
                );
            }
        }
}
export default Auth;
