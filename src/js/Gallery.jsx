MyComponents.List = React.createClass({

    render: function() {
        return (
            <div className="col l3">
            <div className="card">
            <div className="card-image">
            <img src={this.props.imgs} style={{height:300,width:300}}/>
            <span className="card-title">Card Title</span>
        </div>
        <div className="card-content">
            <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
        <div className="card-action">
            <a href="#">This is a link</a>
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

    loading() {
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

        console.log(this.state.userlist[this.state.user.uid])
        var imglist = this.state.userlist[this.state.user.uid]
        var fileNames=[]
        var urls=[]
        for(var key in imglist){
            console.log('key',key)
            console.log('next',imglist[key].fileName)
            console.log('next',imglist[key].url)
            fileNames.push(imglist[key].fileName)
            urls.push(imglist[key].url)
        }

        console.log('line 51 ',fileNames)
        var imgs = urls.map(function(s,i){
            return <MyComponents.List imgs={s} key={i}/>
        });

        return (
            <div>
            <a className="waves-effect waves-light btn orange darken-1 col s3" onClick={this.loading.bind(this)}>Click</a>
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