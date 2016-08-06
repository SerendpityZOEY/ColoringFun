MyComponents.Child = React.createClass({
    render: function () {
        return (
            <div>
                <div className="fileContainer" id="fileContainer">
                    <div dangerouslySetInnerHTML={{__html: this.props.size}}/>
                </div>
            </div>
        )
    }
});

class ImageUpload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {file: '', imagePreviewUrl: '', childVisible: false, sizeCal: 0};
    }

    _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);

        this.props.actions.upload(this.state.file);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];
        var fOutput = '',
            fSize = 0;


        fSize += file.size;
        fOutput += '<div className="selectedFile" id="selectedFile"><span className="fileTitle" id="fileTitle">' + file.name + '</span> - <span className="fileSize" id="fileSize">' + this.updateSize(fSize) + "</span></div>";

        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                childVisible: !this.state.childVisible,
                sizeCal: fOutput
            });
        }

        reader.readAsDataURL(file)

        $(this).parent().find('.fileContainer').html(fOutput);

    }

    // coverts byte size to the closest full size - ie kb's
    updateSize(fSize) {
        for (var aMultiples = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], nMultiple = 0, nApprox = fSize / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
            //console.log(nApprox.toFixed(2) + " " + aMultiples[nMultiple])
            return nApprox.toFixed(2) + " " + aMultiples[nMultiple];
        }
    };

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
        }
        let fileSize = this.state.sizeCal;

        return (
            <div className="row">
                <div className="col l5 m5 s5 right" id="uploadContainer">
                    <div className="previewComponent">
                        <form onSubmit={(e)=>this._handleSubmit(e)}>
                            <button className="waves-effect waves-light btn orange darken-1" id="submitButton"
                                    type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload
                            </button>
                            <input className="fileInput btn1 waves-effect waves-light" type="file" id="file"
                                   onChange={(e)=>this._handleImageChange(e)}/>
                            <label htmlFor="file">Choose a file</label>
                        </form>
                        {
                            this.state.childVisible ?
                                <MyComponents.Child size={fileSize}/> : null
                        }
                        <div className="imgPreview">
                            {$imagePreview}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
MyComponents.ImageUpload = ImageUpload
