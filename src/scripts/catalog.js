var scroll = 0
var scrollSpeed = 2;


function update(){
    scroll += scrollSpeed;
    $('body').css('background-position', `${-(scroll)}px ${scroll}px`); //
    requestAnimationFrame(update);
}

update();


