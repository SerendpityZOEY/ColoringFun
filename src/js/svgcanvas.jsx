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
            <svg version="1.1"   enable-background="new 0 0 612 792" >
        
            <g id="Color">
                {
                    _.map(paths,function (val, key) {
                        return (
                            <path key = {key} fill="FFFFFF" stroke={val.stroke} stroke-miterlimit={val.stroke_miterlimit} d={val.d} style={{"fill":"#FFFFFF"}}/>
                        )
                    })
                    
                }
            </g>

        </svg>
    )
    }
}
MyComponents.SvgCanvas = SvgCanvas