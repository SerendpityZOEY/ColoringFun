(function() {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var tool = 'pencil';

    /*Functions handle UI interaction*/
    document.querySelector('#pencil').onchange = function(){
        if(this.checked) {
            tool = 'pencil';
            console.log('pencil is selected.')
        }
        tmp_canvas.style.display = 'block';
    };

    document.querySelector('#eraser').onchange = function(){
        if(this.checked){
            tool = 'eraser';
            console.log('eraser is selected.')
        }
        tmp_canvas.style.display = 'none';
    };


    $('#colors button').on('click', function(){
        tmp_ctx.strokeStyle = $(this).attr('id');
        tmp_ctx.fillStyle = tmp_ctx.strokeStyle;
        console.log(tmp_ctx.strokeStyle);
    })

    $('#reset').on('click', function(){
        Ref.remove();
        //ctx.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
    });

    /*Canvas Attribute*/
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id='tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;

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


    /* Drawing on Paint App */
    tmp_ctx.lineWidth = 5;
    tmp_ctx.lineJoin = 'round';
    tmp_ctx.lineCap = 'round';
    tmp_ctx.strokeStyle = 'blue';

    tmp_canvas.addEventListener('mousedown', function(e) {
        tmp_canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    tmp_canvas.addEventListener('mouseup', function() {
        tmp_canvas.removeEventListener('mousemove', onPaint, false);

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(tmp_canvas,0,0);
        tmp_ctx.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
    }, false);

    /*Push to firebase, not drawing process*/
    var onPaint = function() {
        //tmp_ctx.beginPath();
        //tmp_ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x+":"+last_mouse.y).set({
            lx: last_mouse.x,
            ly: last_mouse.y,
            nx: mouse.x,
            ny: mouse.y,
            color: tmp_ctx.strokeStyle
        });
        /*
        tmp_ctx.lineTo(mouse.x, mouse.y);
        tmp_ctx.closePath();
        tmp_ctx.stroke();
        */
    };

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
        ctx.beginPath();
        ctx.moveTo(parseInt(coords[0]), parseInt(coords[1]));
        ctx.lineTo(parseInt(newdot.nx), parseInt(newdot.ny));
        ctx.closePath();
        ctx.stroke();
    };

    /*Functions handle reset and erase with firebase*/
    var clearPixel = function(snapshot) {
        ctx.clearRect(0,0,canvas.width,canvas.height);
    };

    Ref.on('child_added', drawPixel);
    Ref.on('child_changed', drawPixel);
    Ref.on('child_removed', clearPixel);

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onErase, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onErase, false);

    }, false);

    var onErase = function(){
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x+":"+last_mouse.y).remove();

        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    }


}());
