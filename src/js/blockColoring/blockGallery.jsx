var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var user = JSON.parse(localStorage.getItem('amazingpixel::user'))
class Gallery extends React.Component {
    render() {
        // var i = 1
        var ret = []
        for (var i = 0; i < this.props.URLList.length; ++i) {
            ret.push(
                <div className="col s12 m6 l4">
                    <div className="card" style={{height:330,width:"100%"}}>
                        <div className="card-image waves-effect waves-block waves-light"
                             style={{height:300,width:"100%"}}>
                            <img className="activator" src={this.props.URLList[i]} alt="user bg"/>
                            <span className="card-title">{this.props.Names[i]}</span>
                        </div>
                        <div className="card-content" style={{height: 10}}>
                            <a href={"blockColoring.html#" + this.props.IdList[i]} style={{marginTop: "-40px"}}
                               className="btn-floating waves-effect waves-light  purple right">
                                <i className="mdi-editor-mode-edit"></i>
                            </a>
                        </div>
                    </div>
                </div>)
        }
        return (
            <div className="row">{ret}</div>
        )
    }
}
MyComponents.Gallery = Gallery

$(document).ready(function () {


    var svgImgList = null
    var svgImgURLList = []
    var svgImgNames = []
    firebaseRef.child('users').child(user.uid).child('svgImgList').once('value', function (snapshot) {
        svgImgList = snapshot.val()
        if (svgImgList != null) {
            svgImgList.forEach(function (imgId) {
                firebaseRef.child('svgColored').child(imgId).child('url').once('value', function (snapshot) {
                    svgImgURLList.push(snapshot.val())
                })
                firebaseRef.child('svgColored').child(imgId).child('fileName').once('value', function (snapshot) {
                    svgImgNames.push(snapshot.val())
                    ReactDOM.render(
                        <MyComponents.Gallery
                            IdList={svgImgList}
                            URLList={svgImgURLList}
                            Names={svgImgNames}/>,
                        document.getElementById('gallery')
                    );
                })
            })
        }
    })
})


$('#addBtn').on('click', function () {
    var path;
    firebaseRef.child('svgTemplate').child('cat').once('value', function (snapshot) {
        path = snapshot.val()
        var newSvgImgRef = firebaseRef.child('svgColored').push()
        var svgId = newSvgImgRef.key()
        firebaseRef.child('svgColored').child(svgId).child('svgInfo').set({});
        firebaseRef.child('svgColored').child(svgId).child('svgInfo').set(path);
        window.location = "blockColoring.html#" + svgId
    })
})

