var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
HALF_WIDTH = window.innerWidth / 2,
HALF_HEIGHT = window.innerHeight / 2,

images = [],
tweens = []


container = document.createElement( 'div' )
container.id = "container"
document.body.appendChild( container )

var stage = new Kinetic.Stage({
    container: 'container',
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT

})

var layer = new Kinetic.Layer()
stage.add(layer)


for (var i = 0; i < 24; i++){
    images[i] = new Image()
    images[i].onload = function () {
        var thumbnail = new Kinetic.Image({
            x: HALF_WIDTH + randomRange(-HALF_WIDTH, HALF_WIDTH),
            y: HALF_HEIGHT + randomRange(-HALF_HEIGHT, HALF_HEIGHT),
            image: this,
            width: this.width * 2,
            height: this.height * 2,
            filter: Kinetic.Filters.Blur,
            filterRadius : 0
        })

        layer.add(thumbnail)

        var tween = new Kinetic.Tween({
            node: thumbnail,
            scaleX : .5,
            scaleY : .5,
            filterRadius: 5,
            duration : 5,
            onFinish : function(){
                thumbnail.destroy()
            }
        })
        
        //tweens.push(tween)

        tween.play()
    }
}

function init(){
    var i = 0
    function go(){
        images[i].src = 'img/' + (i%8+1) + '.png'
        i++

        if (i < 24) setTimeout(go, 500)
    }
    setTimeout(go, 500)
}

init()

//images[i].src = 'img/' + (i%8+1) + '.png'


//setTimeout(imageLoader, 2000)
// returns a random number between the two limits provided 
function randomRange(min, max)
{
    return ((Math.random()*(max-min)) + min)
}
