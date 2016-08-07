var CheckLink = React.createClass({
    render: function() {
        return <a>Test</a>;
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
    }


    render() {

        var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');

        firebaseRef.child('userImages').on('value', function (snapshot) {
            console.log(snapshot.val())
        });

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