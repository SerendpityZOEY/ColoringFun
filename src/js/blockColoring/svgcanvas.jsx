

class SvgCanvas extends React.Component {

    
    componentDidMount() {
        const element = ReactDOM.findDOMNode(this);
        element.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        element.setAttribute('xmlns:xlink', "http://www.w3.org/1999/xlink" );
        element.setAttribute('x', "500px" );
        element.setAttribute('y', "500px" );
        element.setAttribute('width', "612px" );
        element.setAttribute('height', "792px" );
        element.setAttribute('viewBox', "0 0 612 792" );
        
    }

    render() {
        var paths = this.props.paths
        return (
            <svg version="1.1"   enableBackground="new 0 0 612 792" >
                {
                    _.map(paths,function (val, key) {
                        return (
                            <path key = {key} id={val.id} className={val.class}  d={val.d} style={val.style}/>
                        )
                    })
                    
                }
        </svg>
    )
    }
}
MyComponents.SvgCanvas = SvgCanvas