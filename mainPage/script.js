
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check for logged in user on page load
    if (localStorage.getItem('loggedInUser')) {
        showLogout();
    }

    loginBtn.addEventListener('click', () => {
        window.open('login.html', '_blank');
    });

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedInUser');
        hideLogout();
    });

    function showLogout() {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    }

    function hideLogout() {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
});
