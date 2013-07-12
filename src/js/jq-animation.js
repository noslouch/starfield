var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
HALF_WIDTH = window.innerWidth / 2,
HALF_HEIGHT = window.innerHeight / 2,

images = []


$(function(){
    $container = $('<div>').addClass('container')

    $container.on('finished', function(e){
        stagger()
    })

    for (var i = 0; i < 28; i++){
        images[i] = new Image()
        images[i].src = 'img/' + (i%8+1) + '.png'
        $(images[i]).css({
            position : 'absolute',
            left : HALF_WIDTH + randomRange(-HALF_WIDTH, HALF_WIDTH),
            top : HALF_HEIGHT + randomRange(-HALF_HEIGHT, HALF_HEIGHT)
        }).addClass('fast')
        
        if (i === 27) { $container.trigger('finished') }
    }

    function stagger(){
        var i = 0;

        function go(){
            $(images[i]).appendTo($container)
            setTimeout(go, 550)
            i++
        }
        setTimeout(go, 550)
    }


    $('body').append($container)
})

function randomRange(min, max)
{
    return ((Math.random()*(max-min)) + min)
}
