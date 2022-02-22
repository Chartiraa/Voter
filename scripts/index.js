var slider = document.getElementById("voter");
var output = document.getElementById("value");

output.innerHTML = slider.value;

slider.oninput = function() {
	output.innerHTML = this.value;
}

slider.addEventListener("mousemove", function (){
	var x = slider.value;
    var color = 'linear-gradient(90deg, rgb(235, 64, 52)' + x/10 + '%, rgb(34, 27, 242)' + x/10 +'%)';
	slider.style.background = color;
})