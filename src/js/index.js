/**
 * Created by pepe on 8/9/16.
 */
var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var empty = false
var svgId;
var path;
$(document).ready(function () {
    $('#blockColoring').on('click', function () {
        var user = JSON.parse(localStorage.getItem('amazingpixel::user'))
        if (user == null) {
            Materialize.toast('Login First', 2000) 
        } else {
            firebaseRef.child('users').child(user.uid).child('svgImgList').once('value', function (snapshot) {
                if (snapshot.val() == null) {
                    empty = true
                    firebaseRef.child('svgTemplate').child('cat').once('value', function (snapshot) {
                        path = snapshot.val()
                        var newSvgImgRef = firebaseRef.child('svgColored').push()
                        svgId = newSvgImgRef.key()
                        firebaseRef.child('svgColored').child(svgId).child('svgInfo').set({});
                        firebaseRef.child('svgColored').child(svgId).child('svgInfo').set(path);
                        window.location = "blockColoring.html#" + svgId
                    })
                } else {

                    window.location = "blockGallery.html"
                }
            });
        }

    })
    $('#drawing').on('click', function () {
        var user = JSON.parse(localStorage.getItem('amazingpixel::user'))
        if (user == null) {
            Materialize.toast('Login First', 2000) 
        } else {
            window.location = "drawingGallery.html"
        }
        
    })

})
