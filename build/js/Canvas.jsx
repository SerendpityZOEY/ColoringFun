class Canvas extends React.Component {
    render() {
        return (
            <div id="sketch">
                <canvas id="paint"></canvas>
            </div>
            //console.log(this.props.data.drawing)
        );
    }
    componentDidMount(){
        var canvas = document.querySelector('#paint');
        var ctx = canvas.getContext('2d');

        var sketch = document.querySelector('#sketch');
        var sketch_style = getComputedStyle(sketch);
        canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        canvas.height = parseInt(sketch_style.getPropertyValue('height'));
        console.log(canvas.width,canvas.height)

        var tool = 'brush';
        var sprayIntervalID;

        /*Canvas Attribute*/
        var tmp_canvas = document.createElement('canvas');
        var tmp_ctx = tmp_canvas.getContext('2d');
        tmp_canvas.id='tmp_canvas';
        /*Customize for specific size*/
        tmp_canvas.width = canvas.width-20;
        tmp_canvas.height = canvas.height-20;
        console.log(tmp_canvas.width,tmp_canvas.height)

        sketch.appendChild(tmp_canvas);

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        var Ref = new Firebase('https://reactresume.firebaseio.com/drawing');

        /*Read from firebase then draw*/
        var drawPixel = function(snapshot) {
            var coords = snapshot.key().split(":");
            //console.log("last",coords[0],coords[1]);
            var newdot = snapshot.val();
            //console.log("cur",newdot.nx,newdot.ny);
            ctx.globalCompositeOperation = 'source-over';
            ctx.lineWidth = 5;
            ctx.fillStyle = newdot.color;
            ctx.strokeStyle = newdot.color;
            if(newdot.tool=='pencil'){
                ctx.lineWidth = 1;
            }else if(newdot.tool=='brush' || newdot.tool=='spray'){
                ctx.lineWidth = newdot.size;
            }
            ctx.globalAlpha = newdot.opacity;
            if(newdot.tool!='spray'){
                ctx.beginPath();
                ctx.moveTo(parseInt(coords[0]), parseInt(coords[1]));
                ctx.lineTo(parseInt(newdot.nx), parseInt(newdot.ny));
                ctx.closePath();
                ctx.stroke();
            }else{
                console.log('reading as spray')
                generateSprayParticles(parseInt(coords[0]), parseInt(coords[1]),newdot.size);
            }
        };

        /*Functions handle reset and erase with firebase*/
        var clearPixel = function(snapshot) {
            ctx.clearRect(0,0,canvas.width,canvas.height);
        };

        Ref.on('child_added', drawPixel);
        Ref.on('child_changed', drawPixel);
        Ref.on('child_removed', clearPixel);
    }
}
MyComponents.Canvas = Canvas