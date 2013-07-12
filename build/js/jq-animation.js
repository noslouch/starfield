var images = []

for (var i = 0; i < 8; i++){
    images[i] = new Image()
    images[i].src = 'img/' + (i+1) + '.png'
}
console.log(images)

$(function(){
    $container = $('<div>').addClass('container')

    $container.on('entry', '.card', function(){
        console.log(arguments)
    })

    function init(){
        var i = 0;
        function go(){
            $(images[i]).appendTo($container).trigger('entry')
            i++

            if (i < images.length) { setTimeout(go, 500)
        }
        setTimeout(go, 500)
    }

    init()
})

function randomRange(min, max)
{
    return ((Math.random()*(max-min)) + min)
}
