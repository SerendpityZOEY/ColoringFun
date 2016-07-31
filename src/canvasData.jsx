var data = {
    drawing:[],
    user: null
}

var actions={}

function render_svgCanvas() {
    // ReactDOM.render(
    //     <MyComponents.SvgCanvas
    //         />,
    //     $('#svgCanvas').get(0)
    // )
    ReactDOM.render(
        <MyComponents.SvgCanvas
            actions={actions}
            user = {data.user}/>,
        $('#svgCanvas').get(0)
    )
}

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
    render_svgCanvas()
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

        var uRef = userRef.child(data.user.uid)
        uRef.set(data.user)
                uRef.on('value', function(snapshot){
                    data.user = snapshot.val()
                    render_nav()
                    render_canvas()
                    render_storage()
                })
    }).catch(function(error) {

    });


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