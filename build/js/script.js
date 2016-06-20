(function() {

    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));


    // Creating a tmp canvas
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id = 'tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;

    sketch.appendChild(tmp_canvas);

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    // Pencil Points
    var ppts = [];

    /* Mouse Capturing Work */
    tmp_canvas.addEventListener('mousemove', function(e) {
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

        ppts.push({x: mouse.x, y: mouse.y});

        onPaint();
    }, false);

    tmp_canvas.addEventListener('mouseup', function() {
        tmp_canvas.removeEventListener('mousemove', onPaint, false);

        // Writing down to real canvas now
        ctx.drawImage(tmp_canvas, 0, 0);
        // Clearing tmp canvas
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        // Emptying up Pencil Points
        ppts = [];
    }, false);

    var Ref = new Firebase('https://reactresume.firebaseio.com/drawing');

    var onPaint = function() {

        // Saving all the points in an array
        ppts.push({x: mouse.x, y: mouse.y});
        //console.log("looging")
        //console.log('mouse',mouse.x,mouse.y);

        Ref.child(mouse.x + ":" + mouse.y).set({
            x:mouse.x,
            y:mouse.y
        });

        if (ppts.length < 3) {
            var b = ppts[0];
            tmp_ctx.beginPath();
            //ctx.moveTo(b.x, b.y);
            //ctx.lineTo(b.x+50, b.y+50);
            tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
            tmp_ctx.fill();
            tmp_ctx.closePath();

            return;
        }

        // Tmp canvas is always cleared up before drawing.
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        tmp_ctx.beginPath();
        tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

        for (var i = 1; i < ppts.length - 2; i++) {
            //var c = (ppts[i].x + ppts[i + 1].x) / 2;
            //var d = (ppts[i].y + ppts[i + 1].y) / 2;
            var c = (parseInt(ppts[i].x) + parseInt(ppts[i+1].x)) / 2;
            var d = (parseInt(ppts[i].y) + parseInt(ppts[i+1].y)) / 2;
            console.log('see')
            console.log(c," ",d)
            tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, c, d);
        }

        // For the last 2 points
        tmp_ctx.quadraticCurveTo(
            ppts[i].x,
            ppts[i].y,
            ppts[i + 1].x,
            ppts[i + 1].y
        );

        tmp_ctx.stroke();

    };
    
    var drawPixel = function(snapshot) {
        var coords = snapshot.key().split(":");
        //console.log("loading");
        //console.log(coords[0]," ",coords[1]);
        //tmp_ctx.fillRect(parseInt(coords[0]) * 1, parseInt(coords[1]) * 1, 1, 1);
        ppts.push({x: coords[0], y: coords[1]});
        //console.log(ppts.length)
        if (ppts.length < 3) {
            var b = ppts[0];
            tmp_ctx.beginPath();
            //ctx.moveTo(b.x, b.y);
            //ctx.lineTo(b.x+50, b.y+50);
            tmp_ctx.arc(b.x, b.y, tmp_ctx.lineWidth / 2, 0, Math.PI * 2, !0);
            tmp_ctx.fill();
            tmp_ctx.closePath();

            return;
        }

        // Tmp canvas is always cleared up before drawing.
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        tmp_ctx.beginPath();
        tmp_ctx.moveTo(ppts[0].x, ppts[0].y);

        console.log('test move to')
        console.log(ppts[0].x,ppts[0].y)
        for (var i = 1; i < ppts.length - 2; i++) {

            var nx = (parseInt(ppts[i].x) + parseInt(ppts[i+1].x)) / 2;
            var ny = (parseInt(ppts[i].y) + parseInt(ppts[i+1].y)) / 2;
            console.log('read from firebase');
            console.log(ppts[i].x," ", ppts[i].y," c d",ppts[i+1].x," ", ppts[i+1].y, nx," ",ny);
            tmp_ctx.quadraticCurveTo(ppts[i].x, ppts[i].y, nx, ny);
        }

        // For the last 2 points
        tmp_ctx.quadraticCurveTo(
            ppts[i].x,
            ppts[i].y,
            ppts[i + 1].x,
            ppts[i + 1].y
        );

        tmp_ctx.stroke();
    };

    Ref.on('child_added', drawPixel);
    Ref.on('child_changed', drawPixel);


}());
