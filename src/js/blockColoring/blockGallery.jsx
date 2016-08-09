class Gallery extends React.Component {
    render() {
        console.log(this.props)
        console.log(this.props.URLList)
        console.log(this.props.Names)
        // var i = 1
        var ret = []
        for(var i = 0; i < this.props.URLList.length; ++i ) {
            ret.push(
                <div className="col s12 m6 l4">
                    <div  className="card">
                        <div className="card-image waves-effect waves-block waves-light">
                            <img className="activator" src={this.props.URLList[i]} alt="user bg"/>
                        </div>
                        <div className="card-content" style={{height: "2px", marginTop: "-20px"}}>
                            Filename: {this.props.Names[i]}
                            <a href={"blockColoring.html#" + this.props.IdList[i]} style={{marginTop: "-40px"}} className="btn-floating waves-effect waves-light  purple right">
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

    var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
    var user = JSON.parse(localStorage.getItem('amazingpixel::user'))

    var svgImgList = null
    var svgImgURLList = []
    var svgImgNames = []
    firebaseRef.child('users').child(user.uid).child('svgImgList').once('value', function (snapshot) {
        svgImgList  = snapshot.val()
        console.log(svgImgList)
        svgImgList.forEach(function (imgId) {
            firebaseRef.child('svgColored').child(imgId).child('url').once('value', function (snapshot) {
                svgImgURLList.push(snapshot.val())
            })
            firebaseRef.child('svgColored').child(imgId).child('fileName').once('value', function (snapshot) {
                svgImgNames.push(snapshot.val())
                ReactDOM.render(
                    <MyComponents.Gallery
                        IdList = {svgImgList}
                        URLList = {svgImgURLList}
                        Names = {svgImgNames}/>,
                    document.getElementById('gallery')
                );
            })
        })
        console.log(svgImgURLList.length)
    })

})



