var myPath = React.createClass({
    onClick: function (event) {
        this.props.onClick(event.target.value);
        console.log(event.target.id);
    },

    render: function () {
        var style = {"fill":"#FFDDFD"}
        return (
        <path key = {this.props.key} id = {this.props.key} onClick={this.onClick} fill="FFFFFF" stroke={this.props.stroke} strokeMiterlimit={this.props.stroke_miterlimit} d={this.props.d} style={style}/>
        );
    }
});


class SvgCanvas extends React.Component {
    
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        element.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        element.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink" );
        element.setAttribute('x', "500px" );
        element.setAttribute('y', "500px" );
        element.setAttribute('width', "300px" );
        element.setAttribute('height', "500px" );
        element.setAttribute('viewBox', "0 0 612 792" );
        
    }

    render() {
        var paths = this.props.paths
        return (
            <svg version="1.1"   enableBackground="new 0 0 612 792" >
            <g id="Color">
                {
                    _.map(paths,function (val, key) {
                        return (
                            <path key = {key} id = {key} fill="FFFFFF" stroke={val.stroke} strokeMiterlimit={val.stroke_miterlimit} d={val.d} style={{"fill":"#FFDDFF"}}/>
                        )
                    })
                    
                }
            </g>

        </svg>
    )
    }
}
MyComponents.SvgCanvas = SvgCanvas