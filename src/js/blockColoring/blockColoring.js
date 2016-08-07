var chosenColor = '#FFFFFF';
var bg = $(".color");
(function ($) {

    function colorpalette() {
        this.chosenColor = "#FFFFFF"
    }

    var mainHolder, colorHolder
    var btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
    var svgColor
    // var fillSpeed = 0.15
    // var chosenColor = '#FFFFFF'
    // var colors = ['#FFFFFF', '#8E53A1', '#6ABD46', '#71CCDC', '#F7ED45', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#B44426', '#979797', '#C296C5', '#54B948', '#3C75BB', '#F7ED45', '#E89D5E', '#F26F68', '#F37123', '#676868', '#9060A8', '#169E49', '#3CBEB7', '#FFCD37', '#E5B07D', '#EF3C46', '#FDBE17', '#4E4D4E', '#6B449B', '#BACD3F', '#1890CA', '#FCD55A', '#D8C077', '#A62E32', '#F16A2D', '#343433', '#583E98', '#BA539F', '#9D2482', '#DD64A5', '#DB778D', '#EC4394', '#E0398C', '#68AF46', '#4455A4', '#FBEE34', '#AD732A', '#D91E36', '#F99B2A']
    var colors = {
        AntiqueWhite: "faebd7",
        Aqua: "0ff",
        Aquamarine: "7fffd4",
        Beige: "f5f5dc",
        Bisque: "ffe4c4",
        Black: "000",
        Blanchedalmond: "ffebcd",
        Blue: "00f",
        BlueViolet: "8a2be2",
        Brown: "a52a2a",
        Burlywood: "deb887",
        Burntsienna: "ea7e5d",
        CadetBlue: "5f9ea0",
        Chartreuse: "7fff00",
        Chocolate: "d2691e",
        Coral: "ff7f50",
        CornflowerBlue: "6495ed",
        Cornsilk: "fff8dc",
        Crimson: "dc143c",
        DarkBlue: "00008b",
        DarkCyan: "008b8b",
        DarkGoldenrod: "b8860b",
        DarkGray: "a9a9a9",
        DarkGreen: "006400",
        DarkKhaki: "bdb76b",
        DarkMagenta: "8b008b",
        DarkOliveGreen: "556b2f",
        DarkOrange: "ff8c00",
        DarkOrchid: "9932cc",
        DarkRed: "8b0000",
        DarkSalmon: "e9967a",
        DarkSeaGreen: "8fbc8f",
        DarkSlateBlue: "483d8b",
        DarkSlateGray: "2f4f4f",
        DarkUrquoise: "00ced1",
        DarkViolet: "9400d3",
        DeepPink: "ff1493",
        DeepSkyBlue: "00bfff",
        DimGray: "696969",
        DodgerBlue: "1e90ff",
        Firebrick: "b22222",
        ForestGreen: "228b22",
        Fuchsia: "f0f",
        Gainsboro: "dcdcdc",
        Gold: "ffd700",
        Goldenrod: "daa520",
        Gray: "808080",
        Green: "008000",
        Honeydew: "f0fff0",
        HotPink: "ff69b4",
        IndianRed: "cd5c5c",
        Indigo: "4b0082",
        Khaki: "f0e68c",
        Lavender: "e6e6fa",
        LavenderBlush: "fff0f5",
        LawnGreen: "7cfc00",
        LemonChiffon: "fffacd",
        LightBlue: "add8e6",
        LightCoral: "f08080",
        LightGoldenrodYellow: "fafad2",
        LightGray: "d3d3d3",
        LightGreen: "90ee90",
        LightPink: "ffb6c1",
        LightSalmon: "ffa07a",
        LightSeaGreen: "20b2aa",
        LightSkyBlue: "87cefa",
        LightSlateGray: "789",
        LightSteelBlue: "b0c4de",
        LightYellow: "ffffe0",
        Magenta: "f0f",
        Maroon: "800000",
        MediumaQuamarine: "66cdaa",
        MediumBlue: "0000cd",
        MediumOrchid: "ba55d3",
        MediumPurple: "9370db",
        MediumSeaGreen: "3cb371",
        MediumSlateBlue: "7b68ee",
        MediumSpringGreen: "00fa9a",
        MediumTurquoise: "48d1cc",
        MediumVioletRed: "c71585",
        MistYrose: "ffe4e1",
        Moccasin: "ffe4b5",
        Olive: "808000",
        OliveDrab: "6b8e23",
        Orange: "ffa500",
        Orchid: "da70d6",
        PaleGoldenrod: "eee8aa",
        PaleGreen: "98fb98",
        PaleTurquoise: "afeeee",
        PaleVioletRed: "db7093",
        PeachPuff: "ffdab9",
        Peru: "cd853f",
        Pink: "ffc0cb",
        PowderBlue: "b0e0e6",
        Purple: "800080",
        RebeccaPurple: "663399",
        Red: "f00",
        RosyBrown: "bc8f8f",
        RoyalBlue: "4169e1",
        SaddleBrown: "8b4513",
        Salmon: "fa8072",
        SandyBrown: "f4a460",
        SeaGreen: "2e8b57",
        Seashell: "fff5ee",
        Sienna: "a0522d",
        Silver: "c0c0c0",
        SkyBlue: "87ceeb",
        SlateBlue: "6a5acd",
        SlateGray: "708090",
        SpringGreen: "00ff7f",
        SteelBlue: "4682b4",
        Tan: "d2b48c",
        Teal: "008080",
        Thistle: "d8bfd8",
        Tomato: "ff6347",
        Turquoise: "40e0d0",
        Violet: "ee82ee",
        Wheat: "f5deb3",
        White: "fff",
        Yellow: "ff0",
        YellowGreen: "9acd32"
    };

    function flip(o) {
        var flipped = {};
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                flipped[o[i]] = i;
            }
        }
        return flipped;
    }

    var hexNames = flip(colors);
    // console.log(colors.length)
    var closeOffset
    var svgCanvasSelector = $('#svgCanvas')
    var svgId = window.location.hash.substr(1)
    var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
    var svgImgSvgRef = firebaseRef.child('svgTemplate').child(svgId)

    function swatchClick() {
        chosenColor = $(this).data('color')
        TweenMax.to(colorHolder, fillSpeed, {backgroundColor: chosenColor})
        bg.css('background-color', chosenColor);
        $('.show-color').text(chosenColor);
        // var rgb = hexToRgb(chosenColor);
        console.log(chosenColor)
        var color = tinycolor(chosenColor);
        // console.log(color.toName().replace(/([a-z])([A-Z])/g, '$1 $2')
        console.log(color.toName())

        this.chosenColor = chosenColor;

        $('#red').val(rgb.r);
        $('#green').val(rgb.g);
        $('#blue').val(rgb.b);

    }

    function colorMe() {
        TweenMax.to(this, fillSpeed, {fill: chosenColor});
    }

    function svgRandom() {
        // console.log(svgCanvasSelector)
        $('.block').each(function () {
            var randomNum = Math.floor((Math.random() * colors.length));
            console.log(randomNum)
            // console.log(colors[randomNum])
            svgImgSvgRef.child(this.id).update({"style": {"fill": tinycolor.random().toRgbString()}})
        })
    }

    function svgClear() {
        $(".block").each(function () {
            TweenMax.to(this, fillSpeed, {fill: "#FFF"});
            svgImgSvgRef.child(this.id).update({"style": {"fill": "#FFFFFF".valueOf()}})
        })
    }

    function btnUploadSVG() {
        // var svgInfo = $("<div/>").append(mainHolder.clone()).html();
        // $(this).attr({
        //     href: "data:image/svg+xml;utf8," + svgInfo,
        //     download: 'coloringBook.svg',
        //     target: "_blank"
        // });
        var svgString = new XMLSerializer().serializeToString(document.querySelector('#svgCanvas').querySelector('svg'));
        var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        var storageRef = firebase.storage().ref();
        var metadata = {
            contentType: 'image/svg',
        };
        var uploadtask = storageRef.child('public').child(svgId + '.svg').put(svg, metadata)
        console.log('up')
    }

    function btnDownloadPNG() {
        // Future expantion:
        // Look at http://bl.ocks.org/biovisualize/8187844

        // var svgString = new XMLSerializer().serializeToString(document.querySelector('#svgCanvas').querySelector('svg'));
        // var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        // var storageRef = firebase.storage().ref();
        // var metadata = {
        //     contentType: 'image/svg',
        // };
        // var uploadtask = storageRef.child('public').child('c.svg').put(svg, metadata)
        saveSvgAsPng($('svg')[0], svgId + ".png");


        // uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        //     'complete': function() {
        //         // console.log('upload complete!');
        //     }
        // });
        // svgAsPngUri(document.querySelector('#svgCanvas').querySelector('svg'), {}, function(uri) {
        // });
    }

    $.fn.makeSwatches = function () {

        var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo(this)
        // colorHolder = $('<li/>', {
        //     // 'class': 'colorHolder',
        //     // 'text': 'Current Color'
        // }).css('background-color', chosenColor).appendTo(swatchHolder)
        colorHolder = $('#rbg')

        $.each(colors, function () {
            var swatch = $('<li/>').appendTo(swatchHolder)
            $(swatch).css('background-color', "#" + this)
            $(swatch).data('color', "#" + this)
            $(swatch).on('click', swatchClick)
            // $(swatch).on('mouseenter mouseleave', colorRollover)
        })

        var swatchPos = $('.color').position()
        var swatchHeight = $('.color').outerHeight(true) + swatchPos.top
        closeOffset = swatchHeight - $('.swatchHolder').outerHeight()

        // $('.swatchHolder').on('mouseenter mouseleave', swatchMove)
        $('.swatchHolder').css('bottom', closeOffset)
        swatchUp = {css: {bottom: 0}}
        swatchDown = {css: {bottom: closeOffset}}
        TweenMax.to('.swatchHolder', 0.5, swatchUp);
    }
    $.fn.makeSVGcolor = function () {
        mainHolder = this

        // $( this ).load(svgURL, function() {
        svgColor = $('block')
        // svgColor   = $('g:nth-child(2)', svgObject).children()

        // svgOutline = $('g:nth-child(1)', svgObject).children()
        $(svgColor).on('click', colorMe)
        $(mainHolder).makeSwatches()
        $('.swatchHolder').addClass('gray')
        // });
    }

    $.fn.btnRandom = function () {
        btnRandom = this
        $(btnRandom).on('click', svgRandom)
    }
    $.fn.btnClear = function () {
        btnClear = this
        $(btnClear).on('click', svgClear)
    }
    $.fn.btnDownload = function () {
        // $(this).on('click', svgDownloadPNG)
        // if(type == 'PNG'){
        //     btnDownloadPNG = this
        //     $(this).on('mouseenter', svgDownloadPNG)
        // } else {
        //     btnDownloadSVG = this
        $(this).on('click', btnDownloadPNG)
        // }
    }
    $.fn.btnUpload = function () {
        // $(this).on('click', svgDownloadPNG)
        // if(type == 'PNG'){
        //     btnDownloadPNG = this
        //     $(this).on('mouseenter', svgDownloadPNG)
        // } else {
        //     btnDownloadSVG = this
        $(this).on('click', btnUploadSVG)
        // }
    }
    svgCanvasSelector.click(function (event) {
        // event.target.style.fill = color;
        // console.log( $('#' + event.target.id)[0])
        // console.log($('#' + event.target.id)[0].classList)
        if ($('#' + event.target.id)[0].classList.contains("block")) {
            TweenMax.to(event.target, 0.05, {fill: chosenColor});
            svgImgSvgRef.child(event.target.id).update({"style": {"fill": chosenColor.valueOf()}})
        }

    });
}(jQuery));

(function ($) {
    function colorpalette(c) {
        this.text = "hello";
        if (c instanceof colorpalette) {
            return c;
        }
        if (!(this instanceof colorpalette)) {
            return new colorpalette(c);
        }
    }

    colorpalette.prototype = {
        fillcontainer: function (container) {
            container.text(this.text);
        }
    }
    window.colorpalette = colorpalette;
}(jQuery));

$('#swatch').makeSwatches()
$('#btnRandom').btnRandom()
$('#btnClear').btnClear()
/**
 * Created by pepe on 8/3/16.
 */
//
// $('.bGround').bind('touchmove',function(e){
//     //e.preventDefault();
//     var bg = $(".color");
//
//     var redVal = $(".red").val();
//     var greenVal = $(".green").val();
//     var blueVal = $(".blue").val();
//
//     var whatIs = 'rgb(' + redVal + ',' + greenVal + ',' + blueVal + ')';
//
//     bg.css('background-color', whatIs);
//     $('.show-color').text(whatIs);
//     //console.log(whatIs);
// });
//
$(".bGround").on("change", function () {

    var redVal = $('#red').val()
    console.log(redVal)
    var greenVal = $("#green").val();
    var blueVal = $("#blue").val();

    var whatIs = rgbToHex(redVal, greenVal, blueVal)

    // console.log(whatIs)

    bg.css('background-color', whatIs);
    $('.show-color').text(whatIs);
    chosenColor = whatIs;
});


$(document).ready(function () {
    $('#downloadBtn').btnDownload()
    $('#saveBtn').btnUpload()
    var showShare = false
    $('#shareBtn').on('click', function () {
        $('#location').val(window.location.toString());
        $('#shareText').css('visibility', 'visible');
        // $('#location').focus();
        // $('#location').click();
        window.setTimeout(function () {
            // save_this.select();
            $('#location').select();
        }, 100);

    })
    $('#menu').on('mouseleave', function () {
            $('#shareTextHolder').css('visibility', 'hidden');
            $('#shareText').css('visibility', 'hidden');
    })

    var testp = colorpalette();
    testp.fillcontainer($('#test'));
    // $('#redbutton').hover(function () {
    //     console.log('hovered')
    //     $('.tooltiptext').css('visibility', 'visible')
    // })
})



