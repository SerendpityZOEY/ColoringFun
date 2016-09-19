var svgCanvasSelector = $('#svgCanvas')
var svgId = window.location.hash.substr(1)
var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var user = JSON.parse(localStorage.getItem('amazingpixel::user'))
var storageRef = firebase.storage().ref();
var isDleted = false

var imgList = []

firebaseRef.child('users').child(user.uid).child('svgImgList').on('value', function (snapshot) {
    var l = snapshot.val()
    if (l != null) {
        imgList = l
    }
})
var paths = {}
var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
var svgImgSvgRef = firebaseRef.child('svgColored').child(svgId).child('svgInfo')
svgImgSvgRef.on('value', function (snapshot) {
    var val = snapshot.val()
    _.map(val, function (v, k) {
        paths[k] = {}
        paths[k].id = k
        paths[k].d = v.d
        paths[k].style = v.style
        paths[k].class = v.class
    })
})

var currentColor = '#FFFFFF';
var bg = $(".color");
var colors = {
    AntiqueWhite: "#faebd7",
    Aqua: "#0ff",
    Aquamarine: "#7fffd4",
    Beige: "#f5f5dc",
    Bisque: "#ffe4c4",
    Black: "#000",
    Blanchedalmond: "#ffebcd",
    Blue: "#00f",
    BlueViolet: "#8a2be2",
    Brown: "#a52a2a",
    Burlywood: "#deb887",
    Burntsienna: "#ea7e5d",
    CadetBlue: "#5f9ea0",
    Chartreuse: "#7fff00",
    Chocolate: "#d2691e",
    Coral: "#ff7f50",
    CornflowerBlue: "#6495ed",
    Cornsilk: "#fff8dc",
    Crimson: "#dc143c",
    DarkBlue: "#00008b",
    DarkCyan: "#008b8b",
    DarkGoldenrod: "#b8860b",
    DarkGray: "#a9a9a9",
    DarkGreen: "#006400",
    DarkKhaki: "#bdb76b",
    DarkMagenta: "#8b008b",
    DarkOliveGreen: "#556b2f",
    DarkOrange: "#ff8c00",
    DarkOrchid: "#9932cc",
    DarkRed: "#8b0000",
    DarkSalmon: "#e9967a",
    DarkSeaGreen: "#8fbc8f",
    DarkSlateBlue: "#483d8b",
    DarkSlateGray: "#2f4f4f",
    DarkUrquoise: "#00ced1",
    DarkViolet: "#9400d3",
    DeepPink: "#ff1493",
    DeepSkyBlue: "#00bfff",
    DimGray: "#696969",
    DodgerBlue: "#1e90ff",
    Firebrick: "#b22222",
    ForestGreen: "#228b22",
    Fuchsia: "#f0f",
    Gainsboro: "#dcdcdc",
    Gold: "#ffd700",
    Goldenrod: "#daa520",
    Gray: "#808080",
    Green: "#008000",
    Honeydew: "#f0fff0",
    HotPink: "#ff69b4",
    IndianRed: "#cd5c5c",
    Indigo: "#4b0082",
    Khaki: "#f0e68c",
    Lavender: "#e6e6fa",
    LavenderBlush: "#fff0f5",
    LawnGreen: "#7cfc00",
    LemonChiffon: "#fffacd",
    LightBlue: "#add8e6",
    LightCoral: "#f08080",
    LightGoldenrodYellow: "#fafad2",
    LightGray: "#d3d3d3",
    LightGreen: "#90ee90",
    LightPink: "#ffb6c1",
    LightSalmon: "#ffa07a",
    LightSeaGreen: "#20b2aa",
    LightSkyBlue: "#87cefa",
    LightSlateGray: "#789",
    LightSteelBlue: "#b0c4de",
    LightYellow: "#ffffe0",
    Magenta: "#f0f",
    Maroon: "#800000",
    MediumaQuamarine: "#66cdaa",
    MediumBlue: "#0000cd",
    MediumOrchid: "#ba55d3",
    MediumPurple: "#9370db",
    MediumSeaGreen: "#3cb371",
    MediumSlateBlue: "#7b68ee",
    MediumSpringGreen: "#00fa9a",
    MediumTurquoise: "#48d1cc",
    MediumVioletRed: "#c71585",
    MistYrose: "#ffe4e1",
    Moccasin: "#ffe4b5",
    Olive: "#808000",
    OliveDrab: "#6b8e23",
    Orange: "#ffa500",
    Orchid: "#da70d6",
    PaleGoldenrod: "#eee8aa",
    PaleGreen: "#98fb98",
    PaleTurquoise: "#afeeee",
    PaleVioletRed: "#db7093",
    PeachPuff: "#ffdab9",
    Peru: "#cd853f",
    Pink: "#ffc0cb",
    PowderBlue: "#b0e0e6",
    Purple: "#800080",
    RebeccaPurple: "#663399",
    Red: "#f00",
    RosyBrown: "#bc8f8f",
    RoyalBlue: "#4169e1",
    SaddleBrown: "#8b4513",
    Salmon: "#fa8072",
    SandyBrown: "#f4a460",
    SeaGreen: "#2e8b57",
    Seashell: "#fff5ee",
    Sienna: "#a0522d",
    Silver: "#c0c0c0",
    SkyBlue: "#87ceeb",
    SlateBlue: "#6a5acd",
    SlateGray: "#708090",
    SpringGreen: "#00ff7f",
    SteelBlue: "#4682b4",
    Tan: "#d2b48c",
    Teal: "#008080",
    Thistle: "#d8bfd8",
    Tomato: "#ff6347",
    Turquoise: "#40e0d0",
    Violet: "#ee82ee",
    Wheat: "#f5deb3",
    White: "#fff",
    Yellow: "#ff0",
    YellowGreen: "#9acd32"
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


function toNmae(hex) {
    if (hexNames.hasOwnProperty(hex)) {
        return hexNames[hex].replace(/([a-z])([A-Z])/g, '$1 $2');
    } else {
        return "Unnamed Color"
    }
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getBrightness(hex) {
    var rgb = hexToRgb(hex)
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
}

function isDark(hex) {
    return getBrightness(hex) < 128;
}


(function ($) {


    function swatchClick() {
        currentColor = $(this).data('color')
        bg.css('background-color', currentColor);
        if (isDark(currentColor)) {
            $('.show-color').css('color', 'white')
        } else {
            $('.show-color').css('color', 'black')
        }
        $('.show-color').text(toNmae(currentColor));
        // var rgb = hexToRgb(currentColor);
        var rgb = hexToRgb(currentColor)

        $('#red').val(rgb.r);
        $('#green').val(rgb.g);
        $('#blue').val(rgb.b);

    }


    // function colorMe() {
    //     TweenMax.to(this, fillSpeed, {fill: currentColor});
    // }

    function svgRandom() {
        hexcolors = Object.keys(hexNames)
        $('.block').each(function () {
            var randomNum = Math.floor((Math.random() * Object.keys(colors).length));
            var color = hexcolors[randomNum]
            svgImgSvgRef.child(this.id).update({"style": {"fill": color}})
        })
    }

    function svgClear() {
        $(".block").each(function () {
            // TweenMax.to(this, fillSpeed, {fill: "#FFF"});
            svgImgSvgRef.child(this.id).update({"style": {"fill": "#FFFFFF"}})
        })
    }

    function dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

    function btnUploadSVG() {
        var svgString = new XMLSerializer().serializeToString(document.querySelector('#svgCanvas').querySelector('svg'));
        var svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        var metadata = {
            contentType: 'image/png',
        };

        // firebaseRef.child('svgColored').child(user.uid).set({'a':'b'})
        // var coloredSvgRef = firebaseRef.child('svgColored').child(user.uid).push()

        // svgId =  coloredSvgRef.key()
        // firebaseRef.child('svgColored').child(user.uid).child(coloredSvgRef.key()).set(paths)
        // firebaseRef.child('svgColored').child(user.uid).child(svgId).set(paths)
        firebaseRef.child('svgColored').child(svgId)
        var fileName = $('#fileName').val()
        if (fileName == "") {
            Materialize.toast('Please input filename before saving', 4000)
            $('#fileName').focus()
        } else {
            svgAsPngUri($('svg')[0], {}, function (uri) {
                var uploadtask = storageRef.child('colored').child(svgId + '.png').put(dataURLtoBlob(uri), metadata)
                uploadtask.on('state_changed', function (snapshot) {
                }, function (error) {
                    // Handle unsuccessful uploads
                }, function () {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    var downloadURL = uploadtask.snapshot.downloadURL;
                    firebaseRef.child('svgColored').child(svgId).child('url').set(downloadURL)
                    firebaseRef.child('svgColored').child(svgId).child('fileName').set(fileName)
                    firebaseRef.child('users').child(user.uid).child('svgImgList').once('value', function (snapshot) {
                        var svgImgList = snapshot.val()
                        if (svgImgList == null) {
                            svgImgList = []
                            svgImgList.push(svgId)
                            firebaseRef.child('users').child(user.uid).child('svgImgList').set(svgImgList)
                        } else if (svgImgList.indexOf(svgId) == -1) {
                            svgImgList.push(svgId)
                            firebaseRef.child('users').child(user.uid).child('svgImgList').set(svgImgList)
                        }

                    })
                    firebaseRef.child('svgColored').child(svgId).child('svgInfo').set(paths)
                    firebaseRef.child('svgColored').child(svgId).child('coList').once('value', function (snapshot) {
                        var coList = snapshot.val()
                        if (coList == null) {
                            coList = []
                            coList.push(user.uid)
                            firebaseRef.child('svgColored').child(svgId).child('coList').set(coList)
                        } else if (coList.indexOf(user.uid) == -1) {
                            coList.push(user.uid)
                            firebaseRef.child('svgColored').child(svgId).child('coList').set(coList)
                        }

                    })
                    Materialize.toast('Save Successfully', 3000)

                });

            });
        }

    }

    function btnDownloadPNG() {
        saveSvgAsPng($('svg')[0], svgId + ".png");
    }

    $.fn.makeSwatches = function () {

        var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo(this)
        // colorHolder = $('<li/>', {
        //     // 'class': 'colorHolder',
        //     // 'text': 'Current Color'
        // }).css('background-color', currentColor).appendTo(swatchHolder)
        colorHolder = $('#rbg')

        $.each(colors, function () {
            var swatch = $('<li/>').appendTo(swatchHolder)
            $(swatch).css('background-color', this)
            $(swatch).data('color', this)
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
        $(this).on('click', btnDownloadPNG)
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
        if ($('#' + event.target.id)[0].classList.contains("block")) {
            TweenMax.to(event.target, 0.05, {fill: currentColor});
            svgImgSvgRef.child(event.target.id).update({"style": {"fill": currentColor.valueOf()}})
        }

    });
}(jQuery));


$('#swatch').makeSwatches()
$('#randomBtn').btnRandom()
$('#clearBtn').btnClear()

$(".bGround").on("change", function () {
    var redVal = $('#red').val()
    var greenVal = $("#green").val();
    var blueVal = $("#blue").val();

    var customColor = rgbToHex(parseInt(redVal), parseInt(greenVal), parseInt(blueVal))

    bg.css('background-color', customColor);
    $('.show-color').text(toNmae(customColor));
    currentColor = customColor;

    if (isDark(currentColor)) {
        $('.show-color').css('color', 'white')
    } else {
        $('.show-color').css('color', 'black')
    }
});


$(document).ready(function () {
    $('#downloadBtn').btnDownload()
    $('#saveBtn').btnUpload()
    var showShare = false
    $('#shareBtn').on('click', function () {
        $('#location').val(window.location.toString());
        $('#shareText').css('visibility', 'visible');
        showShare = true
        // $('#location').focus();
        // $('#location').click();
        window.setTimeout(function () {
            // save_this.select();
            $('#location').select();
        }, 100);

    })

    $('#deleteBtn').on('click', function () {
        imgList.splice($.inArray(svgId, imgList), 1);
        firebaseRef.child('users').child(user.uid).child('svgImgList').set(imgList)
        firebaseRef.child('svgColored').child(svgId).child('coList').once('value', function (snapshot) {
            var coList = snapshot.val()
            coList.splice($.inArray(user.uid, coList), 1);
            if (coList.length == 0) {
                firebaseRef.child('svgColored').child(svgId).remove()
                var desertRef = storageRef.child('colored/' + svgId + '.png');

                desertRef.delete().then(function () {
                    // File deleted successfully
                    Materialize.toast('Delete Successfully', 3000)
                    isDleted = true
                    window.setTimeout(function () {
                        // save_this.select();
                        window.location = 'blockGallery.html'
                    }, 500);

                }).catch(function (error) {
                    // Uh-oh, an error occurred!
                });
            } else {
                firebaseRef.child('svgColored').child(svgId).child('coList').set(coList)
                Materialize.toast('Delete Successfully', 3000)
                isDleted = true
                window.setTimeout(function () {
                    // save_this.select();
                    window.location = 'blockGallery.html'
                }, 500);
            }
        })
    })
    $('#menu').on('mousemove', function () {
        if (!$('#menu').hasClass('active')) {
            $('#shareTextHolder').css('visibility', 'hidden');
            $('#shareText').css('visibility', 'hidden');
        }
        // $('#shareTextHolder').css('visibility', 'hidden');
        // $('#shareText').css('visibility', 'hidden');
    })
    $('#menuBtn').on('click', function () {
        $('#shareTextHolder').css('visibility', 'hidden');
        $('#shareText').css('visibility', 'hidden');
    })
    $(window).on('beforeunload ', function (e) {
        if (!isDleted && imgList.indexOf(svgId) == -1) {
            var dialogText = "You haven't save your masterpiece yet";
            e.returnValue = dialogText;
            return dialogText;
        }
        // return 'Are you sure ?';
    });
    $(window).on('unload ', function (e) {
        if (!isDleted && imgList.indexOf(svgId) == -1) {
            firebaseRef.child('svgColored').child(svgId).remove()
        }
        // return 'Are you sure ?';
    });
})

