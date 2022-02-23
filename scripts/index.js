
var slider = document.getElementById("voter");
var output = document.getElementById("value");

var color = 'linear-gradient(90deg, rgb(235, 64, 52)' + 50 + '%, rgb(34, 27, 242)' + 50 +'%)';
slider.style.background = color;


var intervalId = window.setInterval(function(){

	output.innerHTML = slider.value;
	var x = slider.value;
    var color = 'linear-gradient(90deg, rgb(235, 64, 52)' + x/10 + '%, rgb(34, 27, 242)' + x/10 +'%)';
	slider.style.background = color;

	
  }, 100);



 