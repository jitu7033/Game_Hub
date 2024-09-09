
const video = document.getElementById('video');

video.addEventListener('mouseover',() =>{
    video.play();

});

video.addEventListener('mouseout',() => {
    video.pause();
    video.currentTime = 0;
})