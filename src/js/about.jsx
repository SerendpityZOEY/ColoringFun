MyComponents.School = React.createClass({
    render: function(){
        return(
            <li className="collection-item avatar">
                <img src={"img/"+this.props.school.name+".png"} alt="" className="circle"/>
                <span className="title">{this.props.school.name}</span>
                <p><b>Degree: </b>{this.props.school.degree}<br></br>
                    <b>Major: </b>{this.props.school.major}
                </p>
            </li>
        )
    }
});

class About extends React.Component {
    render(){
        var schElements = this.props.schools.map(function (s, i) {
            return <MyComponents.School school={s} key={i}/>
        });

        console.log(this.props.schools)
        return (
            <div>
                <h1>{this.props.title}</h1>
                <ul className="collection">{schElements}</ul>
            </div>
        );        
    }
}

MyComponents.About = About