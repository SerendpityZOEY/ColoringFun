MyComponents.Child = React.createClass({
    render: function(){
        return(
            <div>Test</div>
        )
    }
});

class Storage extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            childVisible: false,
        };
    }

    onChange(e) {
        console.log("event triggering");
        this.setState({childVisible: !this.state.childVisible});
    }

    render(){

        return <div>
            <form>
                <div className="inputWrap">
                    <a className="btn1" id="confirm">Upload</a>
                    <label className="btn1" htmlFor="files">Choose a file to upload</label>
                    <input className="fileInput" type="file" id="files" name="files[]" onClick={this.onChange.bind(this)} multiple />
                </div>
            </form>
            {
                this.state.childVisible?
                <MyComponents.Child/>:null
            }
            <div id="fileDropBox">
                <output id="list"></output>
            </div>
        </div>
    }
}
MyComponents.Storage = Storage