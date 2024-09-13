// Toggle sub-options visibility for User vs User
document.getElementById('user-mode-btn').addEventListener('click', function() {
    const userSubOptions = document.getElementById('user-sub-options');
    userSubOptions.style.display = userSubOptions.style.display === 'none' ? 'block' : 'none';
});

// Toggle sub-options visibility for User vs Computer
document.getElementById('computer-mode-btn').addEventListener('click', function() {
    const computerSubOptions = document.getElementById('computer-sub-options');
    computerSubOptions.style.display = computerSubOptions.style.display === 'none' ? 'block' : 'none';
});

// Redirect to appropriate User vs User mode
document.getElementById('user-easy-mode').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/mode_change/Tic_Tac_Toe/user_mode/easy_mode/index.html';
});

document.getElementById('user-hard-mode').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/mode_change/Tic_Tac_Toe/user_mode/hard_mode/index.html';
});

// Redirect to appropriate User vs Computer mode
document.getElementById('computer-easy-mode').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/mode_change/Tic_Tac_Toe/computer_mode/easy_mode/index.html';
});

document.getElementById('computer-hard-mode').addEventListener('click', function() {
    window.location.href = 'http://127.0.0.1:5500/mode_change/Tic_Tac_Toe/computer_mode/hard_mode/index.html';
});
