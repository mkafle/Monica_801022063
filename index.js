let colors=['yellow', 'blue', 'pink'];

button.addEventListener('click', function(){
    var randomColor = colors[Math.floor(Math.random() * colors.length)]
    let container = document.getElementById('container')
    container.style.background = randomColor;
})