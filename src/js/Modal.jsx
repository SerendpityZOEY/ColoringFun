var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Modal = React.createClass({
    render: function() {
        if(this.props.isOpen){
            return (
                <ReactCSSTransitionGroup transitionName={this.props.transitionName}>
                    <div className="modal">
                        {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>
            );
        } else {
            return <ReactCSSTransitionGroup transitionName={this.props.transitionName} />;
        }
    }
});

class Modall extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen:false
        };
    }

    getInitialState() {
        return { isModalOpen: false };
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        return (
            <div className="app">
                <h1>App</h1>
                <button onClick={this.openModal}>Open modal</button>
                <Modal isOpen={this.state.isModalOpen}
                       transitionName="modal-anim">
                    <h3>My Modal</h3>
                    <div className="body">
                        <p>This is the modal&apos;s body.</p>
                    </div>
                    <button onClick={this.closeModal}>Close modal</button>
                </Modal>
            </div>
        );
    }
}

MyComponents.Modall = Modall

