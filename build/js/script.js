(function() {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    var Ref = new Firebase('https://reactresume.firebaseio.com/drawing');

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);


    /* Drawing on Paint App */
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x+":"+last_mouse.y).set({
            lx: last_mouse.x,
            ly: last_mouse.y,
            nx: mouse.x,
            ny: mouse.y
        });

        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    };

    var drawPixel = function(snapshot) {
        var coords = snapshot.key().split(":");
        console.log("last",coords[0],coords[1]);
        var newdot = snapshot.val();
        console.log("cur",newdot.nx,newdot.ny);

        ctx.beginPath();
        ctx.moveTo(parseInt(coords[0]), parseInt(coords[1]));
        ctx.lineTo(parseInt(newdot.nx), parseInt(newdot.ny));
        ctx.closePath();
        ctx.stroke();
    };

    Ref.on('child_added', drawPixel);
    Ref.on('child_changed', drawPixel);

}());
