/**
 * Created by pepe on 8/3/16.
 */
var svgId = window.location.hash.substr(1)
var paths = {}
var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var svgImgSvgRef = firebaseRef.child('svgColored').child(svgId).child('svgInfo')
svgImgSvgRef.on('value', function (snapshot) {
    var val = snapshot.val()
    _.map(val, function (v, k) {
        paths[k] = {}
        paths[k].id = k
        paths[k].d = v.d
        paths[k].style = v.style
        paths[k].class = v.class
    })
    render_svgCanvas()
})
$(document).ready(function () {
    firebaseRef.child('svgColored').child(svgId).child('fileName').on('value', function (snapshot) {
        var fileName = snapshot.val()
        $('#fileName').val(fileName)
    })
})
function render_svgCanvas() {
    ReactDOM.render(
        <MyComponents.SvgCanvas
            paths={paths}/>,
        $('#svgCanvas').get(0)
    )
}

