var data = {
    drawing:[]
}

var actions=[]

function render_canvas(){
    ReactDOM.render(
        <MyComponents.Canvas
        actions={actions}
        data={data}/>,
        $('#canvas').get(0)
    )
}

var draw = new Firebase('https://reactresume.firebaseio.com/drawing');

draw.on('value', function(snapshot){
    data.drawing = snapshot.val()
    render_canvas()
    //console.log(data.drawing)
})

actions.drawingAction = function(last_mouseX,last_mouseY,mouseX,mouseY,color,tool,lineSize,opacity) {
    draw.child(last_mouseX+":"+last_mouseY).set({
        lx: last_mouseX,
        ly: last_mouseY,
        nx: mouseX,
        ny: mouseY,
        color: color,
        tool: tool,
        size: lineSize,
        opacity: opacity
    });
}

actions.resetCanvas = function(){
    draw.remove();
}