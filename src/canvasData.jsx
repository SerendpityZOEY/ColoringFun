var data = {
    drawing: [],
    user: null,
    userlist:[]
}

var Imgurl=[]
var options=[]

var paths = {}
var actions = {}

function render_svgCanvas() {
    // ReactDOM.render(
    //     <MyComponents.SvgCanvas
    //         />,
    //     $('#svgCanvas').get(0)
    // )
    ReactDOM.render(
        <MyComponents.SvgCanvas
            paths={paths}/>,
        $('#svgCanvas').get(0)
    )
}

function render_nav() {
    ReactDOM.render(
        <MyComponents.NavBar
            actions={actions}
            user={data.user}/>,
        $('#navbar').get(0)
    )
}

function render_canvas() {
    ReactDOM.render(
        <MyComponents.Canvas
            actions={actions}
            data={data}
            openbtn={true} opentext="open demo modal" content={<div id='content'>some demo content for modal</div>}
            Imgurl={Imgurl}
            options={options}
            />,
        $('#canvas').get(0)
    )
}

function render_storage() {
    ReactDOM.render(
        <MyComponents.ImageUpload
            actions={actions}
            data={data}/>,
        $('#storage').get(0)
    )
}

function render_dropdown() {
    ReactDOM.render(
        <MyComponents.Dropdown
            actions={actions}
            data={data}
            options={options}
            />,
        $('#app').get(0)
    )
}

var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');

var draw = new Firebase('https://coloringfun.firebaseio.com/drawing');

var userImgSvgRef

draw.on('value', function (snapshot) {
    data.drawing = snapshot.val()
    render_nav()
    render_canvas()
    render_storage()
    render_dropdown()
})

firebaseRef.child('userImages').on('value', function (snapshot) {
    data.userlist = snapshot.val();
    render_nav();
    render_canvas();
    render_storage();
    render_dropdown();
});

firebaseRef.child('pubImages').on('value', function (snapshot) {
    options = []
    var objs = snapshot.val();
    for (var key in objs) {
        options.push(objs[key])
    }
    render_nav();
    render_canvas();
    render_storage();
    render_dropdown();
});

actions.drawingAction = function (last_mouseX, last_mouseY, mouseX, mouseY, color, tool, lineSize, opacity) {
    draw.child(last_mouseX + ":" + last_mouseY).set({
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

actions.eraserAction = function(last_mouseX, last_mouseY, mouseX, mouseY, color, tool, lineSize, opacity){
    console.log(last_mouseX,last_mouseY)
    draw.child(last_mouseX + ":" + last_mouseY).remove();
    firebaseRef.child('erase').child(last_mouseX + ":" + last_mouseY).set({
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

actions.saveCanvas = function (canvas, filename) {

    var lnk = document.createElement('a'), e;

    lnk.download = filename;

    lnk.href = canvas.toDataURL();

    if (document.createEvent) {

        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window,
            0, 0, 0, 0, 0, false, false, false,
            false, 0, null);

        lnk.dispatchEvent(e);

    } else if (lnk.fireEvent) {

        lnk.fireEvent("onclick");
    }
}

actions.upload = function (file) {
    // Get a reference to the storage service, which is used to create references in your storage bucket
    var storageRef = firebase.storage().ref();

    var lastIndex = file.name.lastIndexOf(".");
    var fileNameDir = file.name.substring(0, lastIndex);

    console.log('upload file type',file.name.substring(lastIndex+1));

    if(file.name.substring(lastIndex+1)=='svg'){
        var metadata = {
            contentType: 'image/svg+xml',
        };
    }else{
        var metadata = {
            contentType: 'image/jpeg',
        };
    }


    data.user = JSON.parse(localStorage.getItem('amazingpixel::user'));

    //Upload images to pub or user
    if (data.user == null) {
        var uploadTask = storageRef.child('public/' + file.name).put(file, metadata);
    } else {
        console.log('user id', data.user.uid)
        uploadTask = storageRef.child(data.user.uid + '/images/' + file.name).put(file, metadata);
    }


    uploadTask.on('state_changed', function (snapshot) {
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
    }, function (error) {
        // Handle unsuccessful uploads
    }, function () {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        alert("Upload succeed!");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log('download url', downloadURL);
        if(data.user==null){
            firebaseRef.child('pubImages').child(fileNameDir).set({
                fileName:file.name,
                url:downloadURL
            });
        }
        firebaseRef.child('userImages').child(data.user.uid).child(fileNameDir).set({
            fileName:file.name,
            url:downloadURL
        });
    });

}

actions.download = function (fileName) {
    data.user = JSON.parse(localStorage.getItem('amazingpixel::user'));

    var starsRef = firebase.storage().ref();

    if (data.user == null) {
        // Get the download URL
        starsRef.child('public/' + fileName).getDownloadURL().then(function (url) {
            // Insert url into an <img> tag to "download"
            SaveToDisk(url, fileName)
            console.log('downloading', url)
        }).catch(function (error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    } else {
        // Get the download URL
        starsRef.child(data.user.uid + '/images/' + fileName).getDownloadURL().then(function (url) {
            // Insert url into an <img> tag to "download"
            SaveToDisk(url, fileName)
            console.log('downloading', fileName)
        }).catch(function (error) {
            switch (error.code) {
                case 'storage/object_not_found':
                    // File doesn't exist
                    break;

                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;

                case 'storage/canceled':
                    // User canceled the upload
                    break;

                case 'storage/unknown':
                    // Unknown error occurred, inspect the server response
                    break;
            }
        });
    }


    function SaveToDisk(fileURL, fileName) {
        // for non-IE
        if (!window.ActiveXObject) {
            var save = document.createElement('a');
            save.href = fileURL;
            save.target = '_blank';
            save.download = fileName || 'unknown';

            var event = document.createEvent('Event');
            event.initEvent('click', true, true);
            save.dispatchEvent(event);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }
    }
}


actions.getImageURL = function (fileName) {
    Imgurl = []
    data.user = JSON.parse(localStorage.getItem('amazingpixel::user'));

    var starsRef = firebase.storage().ref();
    // Get the download URL
    if (data.user == null) {
        starsRef.child('public/' + fileName).getDownloadURL().then(function (url) {
            Imgurl = url
            render_canvas();
        });
    } else {
        starsRef.child(data.user.uid + '/images/' + fileName).getDownloadURL().then(function (url) {
            Imgurl = url
            render_canvas();
        });
    }


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

// var svgImgSvgRef
// actions.login = function () {
//     firebase.auth().signInWithPopup(provider).then(function (result) {
//         // This gives you a GitHub Access Token. You can use it to access the GitHub API.
//         var token = result.credential.accessToken;
//         // The signed-in user info.
//         var user = result.user;
//         data.user = {}
//         data.user.displayName = user.displayName
//         data.user.uid = user.uid
//         localStorage.setItem('amazingpixel::user', JSON.stringify(data.user))
//         console.log('>>>>', data.user)
//         var userRef = firebaseRef.child('users')
//
//         var uRef = userRef.child(data.user.uid)
//         uRef.set(data.user)
//         uRef.on('value', function (snapshot) {
//             data.user = snapshot.val()
//             render_nav()
//             render_canvas()
//             render_storage()
//         })
//         if (data.user != null) {
//             // userImgSvgRef = firebaseRef.child('userImages').child(data.user.uid).child('svg').push()
//             imgKey = '-KO1YIEkBU1H0ort7I17'
//             svgImgSvgRef = firebaseRef.child('userImages').child(data.user.uid).child('svg').child(imgKey)
//             console.log('line 336', imgKey)
//             // userImgSvgRef.set(paths)
//             svgImgSvgRef.on('value', function (snapshot) {
//                 var val = snapshot.val()
//                 _.map(val, function (v, k) {
//                     paths[k] = {}
//                     paths[k].d = v.d
//                     paths[k].stroke = v.stroke
//                     paths[k].stroke_miterlimit = v.stroke_miterlimit
//                     paths[k].style = v.style
//                 })
//                 render_svgCanvas()
//
//             })
//         }
//     }).catch(function (error) {
//
//     });
//
//     render_nav()
//
// }

actions.logout = function () {

    if (data.user) {

        firebase.auth().signOut().then(function () {
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
        }, function (error) {
            // An error happened.
        });

    }

}