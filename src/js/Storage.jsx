class Storage extends React.Component{

    handleChange(e) {
        console.log("event triggering")
    }
    render(){
        return <div>
            <form>
                <div className="inputWrap">
                    <a className="btn1" id="confirm">Upload</a>
                    <label className="btn1" htmlFor="files">Choose a file to upload</label>
                    <input className="fileInput" type="file" id="files" name="files[]" onChange={this.handleChange} multiple />
                </div>
            </form>

            <div id="fileDropBox">
                <output id="list"></output>
            </div>
        </div>
    }
}
MyComponents.Storage = Storage