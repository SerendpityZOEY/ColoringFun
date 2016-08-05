(function ($) {

    var mainHolder, colorHolder
    var btnRandom, btnClear, btnDownloadSVG, btnDownloadPNG
    var svgColor
    var fillSpeed = 0.15
    var chosenColor = '#FFFFFF'
    var colors = ['#FFFFFF', '#8E53A1', '#6ABD46', '#71CCDC', '#F7ED45', '#F7DAAF', '#EC2527', '#F16824', '#CECCCC', '#5A499E', '#06753D', '#024259', '#FDD209', '#7D4829', '#931B1E', '#B44426', '#979797', '#C296C5', '#54B948', '#3C75BB', '#F7ED45', '#E89D5E', '#F26F68', '#F37123', '#676868', '#9060A8', '#169E49', '#3CBEB7', '#FFCD37', '#E5B07D', '#EF3C46', '#FDBE17', '#4E4D4E', '#6B449B', '#BACD3F', '#1890CA', '#FCD55A', '#D8C077', '#A62E32', '#F16A2D', '#343433', '#583E98', '#BA539F', '#9D2482', '#DD64A5', '#DB778D', '#EC4394', '#E0398C', '#68AF46', '#4455A4', '#FBEE34', '#AD732A', '#D91E36', '#F99B2A']
    // console.log(colors.length)
    var closeOffset
    var svgCanvasSelector = $('#svgCanvas')
    var svgId = window.location.hash.substr(1)
    var firebaseRef = new Firebase('https://coloringfun.firebaseio.com/');
    var svgImgSvgRef = firebaseRef.child('svgTemplate').child(svgId)

    function swatchClick() {
        chosenColor = $(this).data('color')
        TweenMax.to(colorHolder, fillSpeed, {backgroundColor: chosenColor})
    }

    function colorMe() {
        TweenMax.to(this, fillSpeed, {fill: chosenColor});
    }

    function svgRandom() {
        // console.log(svgCanvasSelector)
        $('.block').each(function(){
            var randomNum = Math.floor((Math.random() * colors.length));
            // console.log(randomNum)
            // console.log(colors[randomNum])
            svgImgSvgRef.child(this.id).update({"style": {"fill": colors[randomNum].valueOf()}})
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
        saveSvgAsPng($('svg')[0], "cat.png");



        // uploadtask.on(firebase.storage.TaskEvent.STATE_CHANGED, {
        //     'complete': function() {
        //         // console.log('upload complete!');
        //     }
        // });
        // svgAsPngUri(document.querySelector('#svgCanvas').querySelector('svg'), {}, function(uri) {
        // });
    }

    $.fn.makeSwatches = function () {
        var swatchHolder = $('<ol/>', {'class': 'swatchHolder'}).appendTo($('#swatch'))
        colorHolder = $('<li/>', {
            'class': 'colorHolder',
            'text': 'Current Color'
        }).css('background-color', chosenColor).appendTo(swatchHolder)

        $.each(colors, function () {
            var swatch = $('<li/>').appendTo(swatchHolder)
            $(swatch).css('background-color', this)
            $(swatch).data('color', this)
            $(swatch).on('click', swatchClick)
            // $(swatch).on('mouseenter mouseleave', colorRollover)
        })

        var swatchPos = $('.colorHolder').position()
        var swatchHeight = $('.colorHolder').outerHeight(true) + swatchPos.top
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
        if ($('#' + event.target.id)[0].classList.contains("block") ) {
            TweenMax.to(event.target, 0.05, {fill: chosenColor});
            svgImgSvgRef.child(event.target.id).update({"style": {"fill": chosenColor.valueOf()}})
        }

    });
}(jQuery));

$('#svgCanvas').makeSVGcolor()
$('#btnRandom').btnRandom()
$('#btnClear').btnClear()
$('#btnDownloadPNG').btnDownload()
$('#btnUploadSVG').btnUpload()
/**
 * Created by pepe on 8/3/16.
 */
