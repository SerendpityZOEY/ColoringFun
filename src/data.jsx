var data={
  education:[],
  skills:[],
  user: null
}

var actions={}

function render_nav(){
  ReactDOM.render(
      <MyComponents.NavBar
          actions={actions}/>,
      $('#navbar').get(0)
  )
}

function render_about(schools){
  ReactDOM.render(
      <MyComponents.About schools={schools} title={"Education"}/>,
      $('#aboutMe').get(0)
  );
}

function render_skill(skills){
  ReactDOM.render(
      <MyComponents.Skill skills={skills} title={"Skills"}/>,
      $('#skill').get(0)
  );
}
console.log('render nav')
//render_nav()
console.log('nav rendered')
var myinfo = new Firebase('https://reactresume.firebaseio.com/');

myinfo.child('education').on('value', function(snapshot){
  var schoolObjs = snapshot.val();
  //console.log(schoolObjs)
  var schools=[]
  for( var item in schoolObjs){
    var curSchool=schoolObjs[item]
    curSchool.ind=item
    data.education.push(curSchool)
  }
  render_nav()
  render_about(data.education)
})

myinfo.child('skill').on('value', function(snapshot){
  data.skills = snapshot.val()
  render_nav()
  render_skill(data.skills)
})

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
