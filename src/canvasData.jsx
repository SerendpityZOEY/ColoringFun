var data = {
    drawing:[],
    user: null
}

var actions={}

function render_nav(){
    ReactDOM.render(
        <MyComponents.NavBar
            actions={actions}
            user = {data.user}/>,
        $('#navbar').get(0)
    )
}

function render_canvas(){
    ReactDOM.render(
        <MyComponents.Canvas
        actions={actions}
        data={data}/>,
        $('#canvas').get(0)
    )
}

function render_storage(){
    ReactDOM.render(
        <MyComponents.Storage
        actions={actions}
        data={data}/>,
        $('#storage').get(0)
    )
}

var draw = new Firebase('https://reactresume.firebaseio.com/drawing');

draw.on('value', function(snapshot){
    data.drawing = snapshot.val()
    render_nav()
    render_canvas()
    render_storage()
})


actions.drawingAction = function(last_mouseX,last_mouseY,mouseX,mouseY,color,tool,lineSize,opacity) {
    draw.child(last_mouseX+":"+last_mouseY).set({
        lx: last_mouseX,
        ly: last_mouseY,
        nx: mouseX,
        ny: mouseY,
        color: color,
        tool: tool,
        size: lineSize,
        opacity: opacity
    });
}

actions.resetCanvas = function(){
    draw.remove();
}


var firebaseRef = new Firebase('https://reactresume.firebaseio.com/')
var provider = new firebase.auth.GoogleAuthProvider();

actions.login = function(){
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        data.user = {}
        data.user.displayName = user.displayName
        data.user.uid = user.uid
        console.log(data.user)
        var userRef = firebaseRef.child('users')
        // userRef.on('value', function(snapshot){
        //     userRef.set(data.user)
        // })
        // userRef.on('value', function(snapshot){
        //     data.user = snapshot.val()
        //     console.log('new data.user')
        //     console.log(data.user)
        //     render()
        // })
        //         var userRef = firebaseRef.child('users').child(user.username)
        //
        //         // subscribe to the user data
        var uRef = userRef.child(data.user.uid)
        uRef.set(data.user)
                uRef.on('value', function(snapshot){
                    data.user = snapshot.val()
                    render_nav()
                })
        //
        //         // set the user data
        //         // data.user =user
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });

    // firebaseRef.authWithOAuthPopup("github", function(error, authData){
    //
    //     console.log(authData)
    //     // handle the result of the authentication
    //     if (error) {
    //         console.log("Login Failed!", error);
    //     } else {
    //         console.log("Authenticated successfully with payload:", authData);
    //
    //         // create a user object based on authData
    //         var user = {
    //             displayName: authData.github.displayName,
    //             username: authData.github.username,
    //             id: authData.github.id,
    //             status: 'online',
    //             pos: data.center  // position, default to the map center
    //         }
    //
    //         var userRef = firebaseRef.child('users').child(user.username)
    //
    //         // subscribe to the user data
    //         userRef.on('value', function(snapshot){
    //             data.user = snapshot.val()
    //             render()
    //         })
    //
    //         // set the user data
    //         // data.user =user 
    //         userRef.set(user)
    //
    //     }
    // })
    render_nav()

}
actions.logout = function(){

    if (data.user){

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            var userRef = firebaseRef
                .child('users')
                .child(data.user.uid)

            // unsubscribe to the user data
            userRef.off()

            // set the user's status to offline
            userRef.child('status').set('offline')

            data.user = {}
            render_nav()
        }, function(error) {
            // An error happened.
        });

    }

}