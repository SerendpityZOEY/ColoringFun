(function() {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var img = new Image();
    img.src = 'http://cssdeck.com/uploads/media/items/3/3yiC6Yq.jpg';
    ctx.drawImage(img, 20, 20);

    var tool = 'pencil';

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
    tmp_canvas.addEventListener('mousemove', function(e) {

        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    }, false);

    canvas.addEventListener('mousemove', function(e) {

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
    tmp_ctx.fillStyle = 'blue';

    tmp_canvas.addEventListener('mousedown', function(e) {
        tmp_canvas.addEventListener('mousemove', onPaint, false);

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    }, false);

    tmp_canvas.addEventListener('mouseup', function() {
        tmp_canvas.removeEventListener('mousemove', onPaint, false);

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(tmp_canvas,0,0);
        tmp_ctx.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
    }, false);

    var onPaint = function() {
        tmp_ctx.beginPath();
        tmp_ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x+":"+last_mouse.y).set({
            lx: last_mouse.x,
            ly: last_mouse.y,
            nx: mouse.x,
            ny: mouse.y
        });

        tmp_ctx.lineTo(mouse.x, mouse.y);
        tmp_ctx.closePath();
        tmp_ctx.stroke();
    };

    canvas.addEventListener('mousedown', function(e) {
        canvas.addEventListener('mousemove', onErase, false);

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;

    }, false);

    canvas.addEventListener('mouseup', function() {
        tmp_canvas.removeEventListener('mousemove', onErase, false);

    }, false);

    var onErase = function(){
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);
        console.log('removng from firebase')
        console.log('x and y ',last_mouse.x,last_mouse.y)

        Ref.child(last_mouse.x+":"+last_mouse.y).remove();
        Ref.child(mouse.x+":"+mouse.y).remove();

        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    }
    var drawPixel = function(snapshot) {
        var coords = snapshot.key().split(":");
        console.log("last",coords[0],coords[1]);
        var newdot = snapshot.val();
        console.log("cur",newdot.nx,newdot.ny);

        tmp_ctx.beginPath();
        tmp_ctx.moveTo(parseInt(coords[0]), parseInt(coords[1]));
        tmp_ctx.lineTo(parseInt(newdot.nx), parseInt(newdot.ny));
        tmp_ctx.closePath();
        tmp_ctx.stroke();
    };

    Ref.on('child_added', drawPixel);
    Ref.on('child_changed', drawPixel);

}());
