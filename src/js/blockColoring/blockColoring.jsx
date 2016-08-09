/**
 * Created by pepe on 8/3/16.
 */
var svgId = window.location.hash.substr(1)
var paths = {}
// console.log('svgId' + svgId)
var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var svgImgSvgRef = firebaseRef.child('svgColored').child(svgId).child('svgInfo')
svgImgSvgRef.on('value', function (snapshot) {
    var val = snapshot.val()
    _.map(val, function (v, k) {
        // console.log(k)
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
        console.log(fileName)
        $('#fileName').val(fileName)
    })
})
// console.log('svgId' + svgId)
function render_svgCanvas() {
    ReactDOM.render(
        <MyComponents.SvgCanvas
            paths={paths}/>,
        $('#svgCanvas').get(0)
    )
}

