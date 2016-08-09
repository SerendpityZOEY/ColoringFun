MyComponents.List = React.createClass({

    render: function() {
        return (
            <div className="col s12 m6 l4">
                <div className="card"style={{height:330,width:"100%"}}>
                    <div className="card-image"style={{height:300,width:"100%"}}>
                        <img src={this.props.imgs.url} style={{height:300,width:"100%"}}/>
                        <span className="card-title">{this.props.imgs.fileName}</span>
                    </div>
                    <div className="card-content"style={{height: "5px"}}>
                    </div>
                </div>
            </div>
        );
    }
});

class Gallery extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user:JSON.parse(localStorage.getItem('amazingpixel::user')),
            userlist:[],
        }
    }

    componentWillMount() {
        console.log('heyheyhey')
        var curUser=this.state.user.uid
        var component = this
        console.log(curUser)
        var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');

        firebaseRef.child('userImages').on('value', function (snapshot) {
            var userlist = snapshot.val()
            component.setState(
                {
                    userlist: userlist
                }
            )
        });
    }


    render() {

        var imglist = this.state.userlist[this.state.user.uid]
        var res=[]
        for(var key in imglist){
            res.push({fileName:imglist[key].fileName,url:imglist[key].url})
        }

        console.log('line 51 ',res)
        var imgs = res.map(function(s,i){
            return <MyComponents.List imgs={s} key={i}/>
        });

        return (
            <div>
                <div className="row">
                    {imgs}
                </div>
            </div>
        );
    }
}
MyComponents.Gallery = Gallery
ReactDOM.render(
    <MyComponents.Gallery/>,
    document.getElementById('gallery')
);