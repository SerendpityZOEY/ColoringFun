class Skill extends React.Component {

    deleteSkill(){
        console.log('remove')
    }

    render(){
        var Objs = this.props.skills;
        var skillSet = Object.keys(Objs).map((k, idx) => {
            return (
                <div className="chip">{Objs[k]}
                    <i className="material-icons" onClick={this.deleteSkill.bind(this)}>close</i>
                </div>
            );
        });
        return(
            <div>
                <h1>{this.props.title}</h1>
                {skillSet}
                <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s12">
                                <input placeholder="Add New Skill" id="add" type="text" className="validate"/>
                                <label for="add">Add New Skill</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="submit">
                <a className="waves-effect waves-light btn">button</a>
                </div>
            </div>
        )
    }

    componentDidMount() {
        $('.submit').click(function() {
            var skill = $('#add').val();
            var firebaseRef = new Firebase('https://reactresume.firebaseio.com/')
            firebaseRef.child('skill').push(skill)
            Materialize.toast('You add a new skill!', 3000, 'rounded')

        })

    }
}

MyComponents.Skill = Skill