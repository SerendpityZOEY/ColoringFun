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
        console.log(curUser)
        var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');

        firebaseRef.child('userImages').on('value', function (snapshot) {
            var userlist = snapshot.val()
            var list = userlist[curUser]
            for(var key in list){
                console.log('key',key)
                console.log('next',list[key].fileName)
                console.log('next',list[key].url)
            }
        });
    }


    render() {
        return (
            <a className="waves-effect waves-light btn orange darken-1 col s3" onClick={this.loading.bind(this)}>Click</a>
        );
    }
}
MyComponents.Gallery = Gallery
ReactDOM.render(
    <MyComponents.Gallery/>,
    document.getElementById('gallery')
);