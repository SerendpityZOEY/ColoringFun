/**
 * Created by pepe on 8/3/16.
 */
var svgId = window.location.hash.substr(1)
var paths = {}
console.log('svgId' + svgId)
function render_svgCanvas() {
    ReactDOM.render(
        <MyComponents.SvgCanvas
            paths = {paths}/>,
        $('#svgCanvas').get(0)
    )
}

var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var svgImgSvgRef = firebaseRef.child('svgTemplate').child(svgId)
svgImgSvgRef.on('value', function (snapshot) {
    var val = snapshot.val()
    _.map(val, function (v, k) {
        // console.log(k)
        paths[k] = {}
        paths[k].id = k
        paths[k].d= v.d
        paths[k].style = v.style
        paths[k].class = v.class
    })
    render_svgCanvas()

})

