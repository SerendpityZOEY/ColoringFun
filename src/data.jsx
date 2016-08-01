var data={
  education:[],
  skills:[],
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

var myinfo = new Firebase('https://reactresume.firebaseio.com/');


myinfo.child('skill').on('value', function(snapshot){
  data.skills = snapshot.val()
  render_nav()
})

/*
 var firebaseRef = new Firebase('https://reactresume.firebaseio.com/')
 actions.login = function(){
 firebaseRef.authWithOAuthPopup("github", function(error, authData){
 // handle the result of the authentication
 if (error) {
 console.log("Login Failed!", error);
 } else {
 console.log("Authenticated successfully with payload:", authData);
 // create a user object based on authData
 var user = {
 displayName: authData.github.displayName,
 username: authData.github.username,
 id: authData.github.id,
 status: 'online',
 pos: data.center  // position, default to the map center
 }
 var userRef = firebaseRef.child('users').child(user.username)
 // subscribe to the user data
 userRef.on('value', function(snapshot){
 data.user = snapshot.val()
 render()
 })
 // set the user data
 userRef.set(user)
 }
 })
 }
 actions.logout = function(){
 if (data.user){
 firebaseRef.unauth()
 var userRef = firebaseRef
 .child('users')
 .child(data.user.username)
 // unsubscribe to the user data
 userRef.off()
 // set the user's status to offline
 userRef.child('status').set('offline')
 data.user = null
 render()
 }
 }
 */


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

    //         // subscribe to the user data
    var uRef = userRef.child(data.user.uid)
    uRef.set(data.user)
    uRef.on('value', function(snapshot){
      data.user = snapshot.val()
      render_nav()
    })

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

  render_nav()

}
actions.logout = function(){

  if (data.user){

    firebaseRef.unauth()

    var userRef = firebaseRef
        .child('users')
        .child(data.user.username)

    // unsubscribe to the user data
    userRef.off()

    // set the user's status to offline
    userRef.child('status').set('offline')

    data.user = {}

    render()

  }

}