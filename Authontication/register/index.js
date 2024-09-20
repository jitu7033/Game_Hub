document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get user input values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create a user object
    const user = {
        username: username,
        email: email,
        password: password
    };

    // Save user data to local storage
    localStorage.setItem('user', JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "../login/index.html"; // Redirect to login page after successful registration
});
