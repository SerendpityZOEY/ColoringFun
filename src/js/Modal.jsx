class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'none'
        }
    }

    componentWillMount() {
        this.props.openbtn || this.showModal();
    }

    showModal() {
        this.setState({display: 'block'});
    }

    hideModal() {
        this.setState({display: 'none'});
    }

    closeOnBackground(e) {
        if (e.target.id == 'modal') {
            this.hideModal();
        }
    }

    render() {
        console.log('this.props.openbtn', this.props.openbtn)
        console.log('this.props.opentext', this.props.opentext)
        console.log('this.props.content', this.props.content)

        var button;
        if (this.props.openbtn) {
            var button = <button id='modal-open-btn'
                                 onClick={(e) => this.showModal(e)}>{this.props.opentext || 'Open modal'}</button>;
        }
        console.log('button', button)
        return (
            <span>
		    {button}
                <div id="modal" style={this.state} onClick={(e) => this.closeOnBackground(e)}>
          <span className="modal-close" onClick={(e) => this.hideModal(e)}>x</span>
                    {this.props.content}
        </div>
      </span>
        );
    }
}

MyComponents.Modal = Modal

