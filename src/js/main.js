// TODO: adjust new image tracks so they don't all go to the same horizon point

// screen size variables
var SCREEN_WIDTH = window.innerWidth,
SCREEN_HEIGHT = window.innerHeight,
HALF_WIDTH = window.innerWidth / 2,
HALF_HEIGHT = window.innerHeight / 2,

// canvas element and 2D context
canvas = document.createElement( 'canvas' ),
context = canvas.getContext( '2d' ),

// to store the current x and y mouse position
mouseX = 0, mouseY = 0, 

// notional field of view for 3D projection
fov = 150,

// to convert from degrees to radians, 
// multiply by this number!
TO_RADIANS = Math.PI / 180, 

// array to store multiple points
points = [],

particleImage = new Image()

// temporary array to store images
images = []


init();

// call the loop function every 1000/30 mils, in 
// other words, 30 times a second. 
var fast = setInterval(fastLoop, 1000 / 30);

function init() 
{

    // CANVAS SET UP

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    container.appendChild(canvas); 
    canvas.width = SCREEN_WIDTH; 
    canvas.height = SCREEN_HEIGHT;

    // move origin into the centre of the screen
    context.translate(HALF_WIDTH, HALF_HEIGHT);

    // TODO: grab images from server
    particleImage.src = 'img/particle.png'
    for (var i = 0; i < 8; i++){
        images[i] = new Image()
        images[i].src = 'img/' + (i+1) + '.png'
    }


    // TODO: handle mouseover events on specific images to show metadata
    //document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseover', slowDown, false);
    document.addEventListener('mouseout', resume, false);


    var leastZ = 0 
    var maxZ = 0

    for(var i = 0 ; i< 24; i++)
    {
        // make a random point
        //var p1 = new Point3D(randomRange(-150,150),randomRange(-150,150),randomRange(-fov,fov));
        var p1 = new Point3D(randomRange(-150,150),randomRange(-150,150),randomRange(-fov,fov));

        if (i === 0) { 
            leastZ = p1.z
            maxZ = p1.z
            points.unshift(p1) 
        }
        else if (p1.z < leastZ) { 
            leastZ = p1.z 
            points.unshift(p1)
        } else if (p1.z > maxZ) {
            maxZ = p1.z
            points.push(p1)
        } else {
            for (var j = 0; j < points.length; j++) {
                if (p1.z < points[j].z) {
                    points.splice(j, 0, p1)
                    break
                }
            }
        } 
    }
}

function onDocumentMouseMove( event ) 
{
    mouseX = ( event.clientX - HALF_WIDTH );
    mouseY = ( event.clientY - HALF_HEIGHT );
}

function loopInit()
{
    // the composite operation dictates how each draw operation 
    // is blended with what is underneath. The default is 
    // 'source-over' which means the new stuff obliterates the 
    // old stuff. 

    context.globalCompositeOperation = 'source-over';

    // clear the canvas
    context.fillStyle="rgb(255,255,255)";
    context.globalAlpha = 1;

    // don't forget, we shifted the origin in the canvas into the middle, 
    // that's why we have to draw the rectangle starting at minus half the width
    // and height. 
    context.fillRect(-HALF_WIDTH,-HALF_HEIGHT, SCREEN_WIDTH, SCREEN_HEIGHT);


    // before we draw all the particles, we set the composite operation to
    // 'lighter' which is the same as the lighten blend mode in Photoshop,
    // also known as "additive blending".             
    //context.globalCompositeOperation = 'darken';

}

function fastLoop() 
{
    loopInit()

    for (i=0; i<points.length; i++)
    {
        var point = points[i]; 

        point.z += 2.5   

        // if we're too close move the particle to the back and vice versa
        if(point.z<-fov) { point.z = point.z + fov + fov }
        else if(point.z>fov) { point.z = point.z - fov - fov }

        // render it
        draw3Din2D(point, context, images[i%8])

    }

}

function slowLoop(){
    loopInit()

    for (i=0; i<points.length; i++)
    {
        var point = points[i]
        point.z += (0.1)

        if(point.z<-fov) { point.z = point.z + fov + fov }
        else if(point.z>fov) { point.z = point.z - fov - fov }

        draw3Din2D(point, context, images[i%8]) 
    }
}

function slowDown(){
    clearInterval(fast)
    window.slow = setInterval(slowLoop, 1000/30)
}

function resume(){
    clearInterval(slow)
    window.fast = setInterval(fastLoop, 1000/30)
}

// The 3D Point object. 

function Point3D(x,y,z)
{
    this.x = x 
    this.y = y 
    this.z = z 

}

function draw3Din2D(p3d, c, i)
{  
    // first, work out how small it should be
    // using the z pos ( how far away it is :) ) 
    var scale = fov/(fov + p3d.z)

    // if the particle is behind the camera, then don't draw it!
    if(scale<0) { return }
    // or if it's too big then don't draw it!
    else if (scale>12) { return }

    // then multiply the 3D x and y by this scale
    // to get the 2D x and y. 
    var x2d = (p3d.x * scale) 
    var y2d = (p3d.y * scale)

    // canvas.save() saves the state of the draw matrix
    // so we can scale and translate as much as we want 
    // and then restore later. 
    c.save() 

    // translate the draw matrix to move to the center of the particle
    c.translate(x2d, y2d)
    // adjust the size dependent on the calculated scale factor
    // (0.8 is just an adjuster to make it a little smaller)
    c.scale(scale*0.8, scale*0.8)
    // and offset so the image is centred on the position
    //c.translate(particleImage.width * -0.5, particleImage.height * -0.5 );
    // and then draw it at 0,0 (which has now been shifted to reflect
    // the particle position. 
    //c.drawImage(particleImage, 0,0); 

    c.translate(i.width * -0.5, i.height * -0.5 )
    c.drawImage(i, 0,0) 

    // finally restore the canvas state to what it was before we started 
    // screwing with it :)
    c.restore()

}


// returns a random number between the two limits provided 
function randomRange(min, max)
{
    return ((Math.random()*(max-min)) + min)
}
