$(document).ready(function() {

   /* // on affiche les zones touchées par le multitouch
    if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
        Hammer.plugins.showTouches();
    }

    // on simule le multitouch grâce à SHIFT + MOUSE
    if(!Hammer.HAS_TOUCHEVENTS && !Hammer.HAS_POINTEREVENTS) {
        Hammer.plugins.fakeMultitouch();
    }

    var hammer = Hammer($("#ball"), {
        transform_always_block: true,
        tap_always: false,
        drag_min_distance: 0
    });

    hammer.on("touch tap doubletap transformstart transform dragstart drag hold", function(event) {
        ballAction(event);
    });

    var $msg = $("#message");
    var $ball = $("#ball");

    var transform = "";
    var divToDelete = 0;

    var scale = lastScale = 1,
        positionX = positionY = lastPositionX = lastPositionY = 0,
        pushed = false,
        square = false;

    function ballAction(event) {
        switch(event.type) {

            // au touch (quelque soit l'évenement), on initialise les variables
            case "touch" :
                lastScale = scale;
                lastPositionX = positionX;
                lastPositionY = positionY;
                console.log(positionX, positionY);
                break;

            case "transformstart" :
                txt = "Transform : zoom sur la forme";
                break;

            case "transform" :
                scale = Math.min(2, Math.max(0.2, lastScale * event.gesture.scale));
                break;

            case "drag" :
                positionX = lastPositionX + event.gesture.deltaX;
                positionY = lastPositionY + event.gesture.deltaY;
                break;
        }


        transform = "translate3d(" + positionX + "px, " + positionY + "px, 0)" +
            "scale(" + scale + ")";

        $ball.css("transform", transform);
        $ball.css("-ms-transform", transform);
        $ball.css("-webkit-transform", transform);

    }

*/

var myElement = document.getElementById('ball');

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(myElement);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panleft panright panup pandown tap press", function(ev) {
    myElement.textContent = ev.type +" gesture detected.";
    console.log('gesture detected:', ev.type);
    switch(ev.type) {

        // au touch (quelque soit l'évenement), on initialise les variables
        case "panleft":
            lastScale = scale;
            lastPositionX = positionX;
            lastPositionY = positionY;
            console.log(positionX, positionY);
            break;

        case "panright" :
            txt = "Transform : zoom sur la forme";
            break;

        case "panup" :
            scale = Math.min(2, Math.max(0.2, lastScale * event.gesture.scale));
            break;

        case "pandown" :
            positionX = lastPositionX + event.gesture.deltaX;
            positionY = lastPositionY + event.gesture.deltaY;
            break;
    }
});
});