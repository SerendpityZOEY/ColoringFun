class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            value: 'DOWNLOAD',
            user: JSON.parse(localStorage.getItem('amazingpixel::user'))
        };
    }

    expand() {
        this.setState({expanded: true});
    }

    collapse() {
        this.setState({expanded: false});
    }

    handleItemClick(e) {
        this.setState({
            expanded: false,
            value: e.target.innerText,
        });
        this.props.actions.download(e.target.innerText);
    }

    handleTriggerClick() {
        this.setState({expanded: !this.state.expanded});
    }

    render() {
        let dropdown = undefined;
        if (this.state.expanded) {
            if (this.state.user == null) {
                var pubFiles = [];
                var objs = this.props.options;
                console.log(objs)
                for (var key in objs) {
                    pubFiles.push(objs[key].fileName)
                }
                dropdown = (
                    <div className="content">
                        {
                            pubFiles.map(item => {
                                return <div onClick={(e) => { this.handleItemClick(e); }} className="item">{item}</div>;
                            })
                        }
                    </div>
                );
            } else {
                var personalFiles = [];
                var objs = this.props.data.userlist[this.state.user.uid];
                for (var key in objs) {
                    personalFiles.push(objs[key].fileName)
                }
                dropdown = (
                    <div className="content">
                        {
                            personalFiles.map(item => {
                                return <div onClick={(e) => { this.handleItemClick(e); }} className="item">{item}</div>;
                            })
                        }
                    </div>
                );
            }

        }

        return (
            <div className="row" id="dl">
                <div className="right col l1 pull-l3">
                    <div className={`dropdown ${this.state.expanded ? 'active' : ''}`}
                         tabIndex="0"
                         onBlur={() => { this.collapse(); }}>
                        <div className="trigger" onClick={() => { this.handleTriggerClick(); }}>
                            {this.state.value}
                        </div>
                        {dropdown}
                    </div>
                </div>
            </div>
        );
    }
}
MyComponents.Dropdown = Dropdown