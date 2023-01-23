var scroll = 0;
var scrollSpeed = 2;

function update() {
    scroll += scrollSpeed;

    $("body").css("background-position", `${-scroll}px ${scroll}px`); //


    // var div = document.createElement("div");
    // div.style.width = `${Math.random() * 100}px`;
    // div.style.height = `${Math.random() * 100}px`;
    // div.style.backgroundColor = `rgba(${Math.random() * 1}, ${Math.random() * 1}, ${Math.random() * 1}, 0.5)`;
    // div.style.borderRadius = `${Math.random() * 100}%`;
    // div.style.position = "absolute";
    // div.style.left = `${Math.random() * 100}%`;
    // div.style.top = `${Math.random() * 100}%`;
   
    // timeout destroy for 10 seconds
    // setTimeout(() => {
    //     div.remove();
    // }, 10000);
    // document.body.appendChild(div);
    requestAnimationFrame(update);


    // randomly invert website filter
    // if (Math.random() > 0.1) {
    //     $('body').css('filter', `invert(${Math.random() * 100}%)`);
    // }

    // create a div with inline style
    // random width, height, background color, border radius, and position
    // append to body

}

function shuffleAndColor() {
    // Find all elements with text
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        if (element.innerText) {
            // Shuffle the text values
            var text = element.innerText.split('').sort(function(){return 0.5-Math.random()}).join('');
            element.innerText = text;
            // Change background color to random color
            element.style.backgroundColor = getRandomColor();
        }
    });
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//

$("#fart-gigga-poop").on("click", function() {
    // create download link and click it, then remove it
    var element = document.createElement('a');
    // element.setAttribute('href', '../Cloud... Juice! - GameBanana Summers (SapFest 2022).zip');
    // make name support spaces
    var new_name = "Cloud... Juice! - GameBanana Summers (SapFest 2022).zip".replace(/ /g, "%20");
    element.setAttribute('href', new_name);
    element.setAttribute('download', 'Cloud... Juice! - GameBanana Summers (SapFest 2022).zip');

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

})

// shuffleAndColor()
update();

