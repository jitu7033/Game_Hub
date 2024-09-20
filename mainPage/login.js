document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitLogin').addEventListener('click', () => {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate email format
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const user = JSON.parse(localStorage.getItem(email));

        if (user && user.password === password) {
            localStorage.setItem('loggedInUser', email);
            alert('Login successful!');
            window.opener.location.reload(); // Refresh the main window
            window.close(); // Close the login window
        } else {
            alert('Invalid email or password');
        }
    });

    document.getElementById('cancelLogin').addEventListener('click', () => {
        window.close(); // Close the login window
    });
});
