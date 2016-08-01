var data = {
    drawing:[],
    user: null
}

var options = []

var paths = {}
var actions={}

function render_svgCanvas() {
    // ReactDOM.render(
    //     <MyComponents.SvgCanvas
    //         />,
    //     $('#svgCanvas').get(0)
    // )
    ReactDOM.render(
        <MyComponents.SvgCanvas
            paths = {paths}/>,
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
        <MyComponents.ImageUpload
        actions={actions}
        data={data}/>,
        $('#storage').get(0)
    )
}

function render_dropdown(){
    ReactDOM.render(
        <MyComponents.Dropdown
        actions={actions}
        data={data}
        options={options}/>,
        $('#app').get(0)
    )
}


var firebaseRef = new Firebase('https://reactresume.firebaseio.com/');

var draw = new Firebase('https://reactresume.firebaseio.com/drawing');

var userImgSvgRef

draw.on('value', function(snapshot){
    data.drawing = snapshot.val()
    render_nav()
    render_canvas()
    render_storage()
})

firebaseRef.child('userImages').on('value', function(snapshot){
    data.userlist = snapshot.val();
    console.log('rendering personal list',data.userlist)
    render_nav();
    render_canvas();
    render_storage();
    render_dropdown();
});

firebaseRef.child('pubImages').on('value', function(snapshot){
    var objs = snapshot.val();
    for (var key in objs) {
        options.push(objs[key])
    }
    render_nav();
    render_canvas();
    render_storage();
    render_dropdown();
});

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

actions.upload = function(file){
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storageRef = firebase.storage().ref();

    // Points to 'images'
    var imagesRef = storageRef.child('images');

    // Points to 'images/space.jpg'
    // Note that you can use variables to create child values
    var fileName = 'chart.jpeg';
    var spaceRef = imagesRef.child(fileName);

    // File path is 'images/space.jpg'
    var path = spaceRef.fullPath

    // File name is 'space.jpg'
    var name = spaceRef.name

    var bucket = spaceRef.bucket;

    //console.log('properties',path,name,bucket)

    // Points to 'images'
    var imagesRef = spaceRef.parent;

    // Create a reference to 'mountains.jpg'
    var mountainsRef = storageRef.child('mountains.jpg');

    // Create a reference to 'images/mountains.jpg'
    var mountainImagesRef = storageRef.child('images/mountains.jpg');

    // While the file names are the same, the references point to different files
    mountainsRef.name === mountainImagesRef.name            // true
    mountainsRef.fullPath === mountainImagesRef.fullPath    // false

    //console.log('name',mountainsRef.name)
    //console.log('path',mountainsRef.fullPath)

    // File or Blob, assume the file is called rivers.jpg
    //var file = evt.target.files; // FileList object

    // Create file metadata including the content type
    var metadata = {
        contentType: 'image/jpeg',
    };

    //Upload images to pub or user
    if(data.user==null){
        var uploadTask = storageRef.child('images/' + file.name).put(file,metadata);
    }else{
        uploadTask = storageRef.child(data.user.uid+'/images/' + file.name).put(file,metadata);

    }

    //Upload file names to pub or user
    if(data.user==null){
        firebaseRef.child('pubImages').push(file.name);
    }else{
        firebaseRef.child('userImages').child(data.user.uid).push(file.name);
    }


    uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // See below for more detail
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log('download url',downloadURL);
    });

}


var provider = new firebase.auth.GoogleAuthProvider();
//
// firebaseRef.child('svg_template').child("cat").once('value', function (snapshot) {
//     var val = snapshot.val()
//     _.map(val, function (v, k) {
//         paths[k] = {} 
//         paths[k].d= v.d
//         paths[k].stroke = v.stroke
//         paths[k].stroke_miterlimit = v.stroke_miterlimit
//     })
//     render_svgCanvas()
// })


var imgKey

var svgImgSvgRef
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
        if (data.user != null)
        {
            // userImgSvgRef = firebaseRef.child('userImages').child(data.user.uid).child('svg').push()
            imgKey = '-KO1YIEkBU1H0ort7I17'
            svgImgSvgRef = firebaseRef.child('userImages').child(data.user.uid).child('svg').child(imgKey)
            console.log(imgKey)
            // userImgSvgRef.set(paths)
            svgImgSvgRef.on('value', function (snapshot) {
                var val = snapshot.val()
                _.map(val, function (v, k) {
                    paths[k] = {}
                    paths[k].d= v.d
                    paths[k].stroke = v.stroke
                    paths[k].stroke_miterlimit = v.stroke_miterlimit
                    paths[k].style = v.style
                })
                render_svgCanvas()

            })
        }
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