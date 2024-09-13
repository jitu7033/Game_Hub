


document.getElementById("game1").addEventListener("click",function(){
    window.location.href = 'http://127.0.0.1:5500/mode_change/home.html';
})
function searchGame() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (query === 'tic tac toe') {
        alert('Tic Tac Toe is available! Click on the Play button.');
    } else {
        alert('Game not found. Stay tuned for more!');
    }
}

// click on login button then redirect to the login page and register page 

document.getElementById("login").addEventListener("click",function(){
    window.location.href = 'http://127.0.0.1:5500/Main_page/Authontication/login/index.html'
   
})

//  document.querySelector("#login").style.display = "inline"

