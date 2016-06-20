var data={
  education:[],
  skills:[]
}

var actions=[]

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