document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitRegister').addEventListener('click', () => {
        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;

        // Email validation regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        if (localStorage.getItem(email)) {
            alert('Email already exists');
        } else {
            const user = { username, email, password };
            localStorage.setItem(email, JSON.stringify(user));
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html'
        }
    });

    document.getElementById('cancelRegister').addEventListener('click', () => {
        window.close(); // Close the registration window
    });
});
