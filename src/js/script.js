(function () {
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var tool = 'brush';
    var sprayIntervalID;


    /*Functions handle UI interaction*/
    document.querySelector('#brush').onchange = function () {
        if (this.checked) {
            tool = 'brush';
            console.log('brush is selected.')
        }
        tmp_canvas.style.display = 'block';
    };

    document.querySelector('#eraser').onchange = function () {
        if (this.checked) {
            tool = 'eraser';
            console.log('eraser is selected.')
        }
        tmp_canvas.style.display = 'none';
    };

    document.querySelector('#pencil').onchange = function () {
        if (this.checked) {
            tool = 'pencil';
        }
    };

    document.querySelector('#spray').onchange = function () {
        if (this.checked) {
            tool = 'spray';
        }
    };


    $('#colors button').on('click', function () {
        tmp_ctx.strokeStyle = $(this).attr('id');
        tmp_ctx.fillStyle = tmp_ctx.strokeStyle;
        console.log(tmp_ctx.strokeStyle);
    })

    $('#reset').on('click', function () {
        Ref.remove();
        //ctx.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
    });

    /*Canvas Attribute*/
    var tmp_canvas = document.createElement('canvas');
    var tmp_ctx = tmp_canvas.getContext('2d');
    tmp_canvas.id = 'tmp_canvas';
    tmp_canvas.width = canvas.width;
    tmp_canvas.height = canvas.height;

    sketch.appendChild(tmp_canvas);

    var mouse = {x: 0, y: 0};
    var last_mouse = {x: 0, y: 0};

    var Ref = new Firebase('https://coloringfun.firebaseio.com/drawing');

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function (e) {
        last_mouse.x = mouse.x;
        last_mouse.y = mouse.y;

        mouse.x = typeof e.offsetX !== 'undefined' ? e.offsetX : e.layerX;
        mouse.y = typeof e.offsetY !== 'undefined' ? e.offsetY : e.layerY;
        //mouse.x = e.pageX - this.offsetLeft;
        //mouse.y = e.pageY - this.offsetTop;
    }, false);

    tmp_canvas.addEventListener('mousemove', function (e) {
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

    tmp_canvas.addEventListener('mousedown', function (e) {
        tmp_canvas.addEventListener('mousemove', onPaint, false);
        if (tool == 'spray') {
            sprayIntervalID = setInterval(onPaint, 50);
        }
    }, false);

    tmp_canvas.addEventListener('mouseup', function () {
        tmp_canvas.removeEventListener('mousemove', onPaint, false);

        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(tmp_canvas, 0, 0);
        tmp_ctx.clearRect(0, 0, tmp_canvas.width, tmp_canvas.height);

        clearInterval(sprayIntervalID);
    }, false);

    /*Push to firebase, not drawing process*/
    var onPaint = function () {
        //tmp_ctx.beginPath();
        //tmp_ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x + ":" + last_mouse.y).set({
            lx: last_mouse.x,
            ly: last_mouse.y,
            nx: mouse.x,
            ny: mouse.y,
            color: tmp_ctx.strokeStyle,
            tool: tool,
            size: tmp_ctx.lineWidth,
            opacity: tmp_ctx.globalAlpha
        });
        if (tool == 'spray') {
            generateSprayParticles(mouse.x, mouse.y), tmp_ctx.lineWidth;
        }
        /*
         tmp_ctx.lineTo(mouse.x, mouse.y);
         tmp_ctx.closePath();
         tmp_ctx.stroke();
         */
    };

    /*Read from firebase then draw*/
    var drawPixel = function (snapshot) {
        var coords = snapshot.key().split(":");
        //console.log("last",coords[0],coords[1]);
        var newdot = snapshot.val();
        //console.log("cur",newdot.nx,newdot.ny);
        ctx.globalCompositeOperation = 'source-over';
        ctx.lineWidth = 5;
        ctx.fillStyle = newdot.color;
        ctx.strokeStyle = newdot.color;
        if (newdot.tool == 'pencil') {
            ctx.lineWidth = 1;
        } else if (newdot.tool == 'brush' || newdot.tool == 'spray') {
            ctx.lineWidth = newdot.size;
        }
        ctx.globalAlpha = newdot.opacity;
        if (newdot.tool != 'spray') {
            ctx.beginPath();
            ctx.moveTo(parseInt(coords[0]), parseInt(coords[1]));
            ctx.lineTo(parseInt(newdot.nx), parseInt(newdot.ny));
            ctx.closePath();
            ctx.stroke();
        } else {
            console.log('reading as spray')
            generateSprayParticles(parseInt(coords[0]), parseInt(coords[1]), newdot.size);
        }
    };

    /*Functions handle reset and erase with firebase*/
    var clearPixel = function (snapshot) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    Ref.on('child_added', drawPixel);
    Ref.on('child_changed', drawPixel);
    Ref.on('child_removed', clearPixel);

    canvas.addEventListener('mousedown', function (e) {
        canvas.addEventListener('mousemove', onErase, false);
    }, false);

    canvas.addEventListener('mouseup', function () {
        canvas.removeEventListener('mousemove', onErase, false);

    }, false);

    var onErase = function () {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.fillStyle = 'rgba(0,0,0,1)';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(last_mouse.x, last_mouse.y);

        Ref.child(last_mouse.x + ":" + last_mouse.y).remove();

        ctx.lineTo(mouse.x, mouse.y);
        ctx.closePath();
        ctx.stroke();
    }

    /*Size Tool*/
    document.getElementById("size").addEventListener("change", function () {
        tmp_ctx.lineWidth = document.getElementById("size").value;
        console.log('brush tool', tmp_ctx.lineWidth)
    });

    /*Change Opacity*/
    document.getElementById("opacity").addEventListener("change", function () {
        tmp_ctx.globalAlpha = document.getElementById("opacity").value / 100;
    });

    /*Caalculation for spray tool*/
    var getRandomOffset = function (radius) {
        var random_angle = Math.random() * (2 * Math.PI);
        var random_radius = Math.random() * radius;

        // console.log(random_angle, random_radius, Math.cos(random_angle), Math.sin(random_angle));

        return {
            x: Math.cos(random_angle) * random_radius,
            y: Math.sin(random_angle) * random_radius
        };
    };

    var generateSprayParticles = function (dotx, doty, radius) {
        // Particle count, or, density
        var density = 50;

        for (var i = 0; i < density; i++) {
            var offset = getRandomOffset(radius);

            var x = dotx + offset.x;
            var y = doty + offset.y;

            ctx.fillRect(x, y, 1, 1);
        }
    };

    /*Save canvas as file*/
    var callDownload = function () {
        download(paint, 'myPicture.png');
        console.log('save file!')
    };

    //document.getElementById("save").addEventListener("click", callDownload);

    $('#save').on('click', function () {
        callDownload();
    });

    function download(canvas, filename) {


        //create a dummy CANVAS


        // create an "off-screen" anchor tag
        var lnk = document.createElement('a'),
            e;

        // the key here is to set the download attribute of the a tag
        lnk.download = filename;

        // convert canvas content to data-uri for link. When download
        // attribute is set the content pointed to by link will be
        // pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL();

        // create a "fake" click-event to trigger the download
        if (document.createEvent) {

            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);

        } else if (lnk.fireEvent) {

            lnk.fireEvent("onclick");
        }
    };
}());
