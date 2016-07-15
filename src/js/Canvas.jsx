class Canvas extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col s7 l7">
                        <div id="sketch">
                            <canvas id="paint"></canvas>
                        </div>
                    </div>
                    <div className="col s5 l5 push-s1">
                        <a className="waves-effect waves-light btn orange darken-1 col s3 push-s4" id="brush">Brush</a>
                        <br></br><br></br>
                        <a className="waves-effect waves-light btn orange darken-1 col s3 push-s4" id="pencil">Pencil</a>
                        <br></br><br></br>
                        <a className="waves-effect waves-light btn orange darken-1 col s3 push-s4" id="spray">Spray</a>
                        <br></br><br></br>
                        <a className="waves-effect waves-light btn orange darken-1 col s3 push-s4" onClick={this.props.actions.resetCanvas}>Reset</a>
                    </div>

                    <div className="col m2 l2 push-l1 push-m2" id="color-picker" style={{margin:'3em'}}>
                        <button id="#fff" style={{background:"#fff"}}> </button>
                        <button id = '#000' style={{background:"#000"}}> </button>
                        <button id = '#f00' style={{background:"#f00"}}> </button>
                        <button id = '#0f0' style={{background:"#0f0"}}> </button>
                        <button id = '#00f' style={{background:"#00f"}}> </button>
                        <button id = '#88f' style={{background:"#88f"}}> </button>
                        <button id = '#f8d' style={{background:"#f8d"}}> </button>
                        <button id=  "#f88" style={{background:"#f88"}}> </button>
                        <button id = '#f05' style={{background:"#f05"}}> </button>
                        
                        <button id = '#f80' style={{background:"#f80"}}> </button>
                        <button id = '#0f8' style={{background:"#0f8"}}> </button>
                        <button id = '#cf0' style={{background:"#cf0"}}> </button>
                        <button id = '#08f' style={{background:"#08f"}}> </button>
                        <button id = '#408' style={{background:"#408"}}> </button>
                        <button id="#ff8" style={{background:"#ff8"}}> </button>
                        <button id = '#8ff' style={{background:"#8ff"}}> </button>
                        <button id = '#aed081' style={{background: "#aed081"}}> </button>
                        <button id = '#eee' style={{background:"#eee"}}> </button>
                    </div>
                </div>
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

        brush.onclick = function(){
            tool = 'brush';
        }
        pencil.onclick = function(){
            tool = 'pencil';
        }
        spray.onclick = function(){
            tool = 'spray';
        }
        var sprayIntervalID;

        /*Canvas Attribute*/
        var tmp_canvas = document.createElement('canvas');
        var tmp_ctx = tmp_canvas.getContext('2d');
        tmp_canvas.id='tmp_canvas';
        /*Customize for specific size*/
        tmp_canvas.width = canvas.width-20;
        tmp_canvas.height = canvas.height-20;
        console.log(tmp_canvas.width,tmp_canvas.height)

        $('#color-picker button').on('click', function(){
            console.log('hit')
            tmp_ctx.strokeStyle = $(this).attr('id');
            tmp_ctx.fillStyle = tmp_ctx.strokeStyle;
            console.log(tmp_ctx.strokeStyle);
        })

        sketch.appendChild(tmp_canvas);

        var mouse = {x: 0, y: 0};
        var last_mouse = {x: 0, y: 0};

        var Ref = new Firebase('https://reactresume.firebaseio.com/drawing');

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
            //mouse.x = e.pageX - this.offsetLeft;
            //mouse.y = e.pageY - this.offsetTop;
        }, false);

        tmp_canvas.addEventListener('mousemove', function(e) {
            last_mouse.x = mouse.x;
            last_mouse.y = mouse.y;

            mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
            mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

        }, false);


        /* Initialize parameters*/
        tmp_ctx.lineWidth = 5;
        tmp_ctx.lineJoin = 'round';
        tmp_ctx.lineCap = 'round';
        tmp_ctx.strokeStyle = 'blue';

        tmp_canvas.addEventListener('mousedown', function(e) {
            tmp_canvas.addEventListener('mousemove', onPaint, false);
            if(tool=='spray'){
                sprayIntervalID = setInterval(onPaint, 50);
            }
        }, false);

        tmp_canvas.addEventListener('mouseup', function() {
            tmp_canvas.removeEventListener('mousemove', onPaint, false);

            ctx.globalCompositeOperation = 'source-over';
            ctx.drawImage(tmp_canvas,0,0);
            tmp_ctx.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);

            clearInterval(sprayIntervalID);
        }, false);

        /*Push to firebase, not drawing process*/
        var onPaint = function(){
            //tmp_ctx.beginPath();
            //tmp_ctx.moveTo(last_mouse.x, last_mouse.y);

            this.props.actions.drawingAction(last_mouse.x,last_mouse.y,mouse.x,mouse.y,tmp_ctx.strokeStyle,tool,tmp_ctx.lineWidth,tmp_ctx.globalAlpha);

            if(tool=='spray'){
                generateSprayParticles(mouse.x,mouse.y),tmp_ctx.lineWidth;
            }
            /*
             tmp_ctx.lineTo(mouse.x, mouse.y);
             tmp_ctx.closePath();
             tmp_ctx.stroke();
             */
        }.bind(this);

        /*Caalculation for spray tool*/
        var getRandomOffset = function(radius) {
            var random_angle = Math.random() * (2*Math.PI);
            var random_radius = Math.random() * radius;

            //console.log(random_angle, random_radius, Math.cos(random_angle), Math.sin(random_angle));

            return {
                x: Math.cos(random_angle) * random_radius,
                y: Math.sin(random_angle) * random_radius
            };
        };

        var generateSprayParticles = function(dotx,doty, radius) {
            // Particle count, or, density
            var density = 50;

            for (var i = 0; i < density; i++) {
                var offset = getRandomOffset(radius);

                var x = dotx + offset.x;
                var y = doty + offset.y;

                ctx.fillRect(x, y, 1, 1);
            }
        };
        /*End of calculation for spray tool*/

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