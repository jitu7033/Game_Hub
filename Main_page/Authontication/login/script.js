
console.log("hello")
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    // Get user input values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    // Retrieve user data from local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const user = JSON.parse(storedUser);
        // Validate user credentials
        if (user.email === email && user.password === password) {
            const loginButton = document.querySelector("#login");
            if (loginButton) {
                loginButton.classList.remove("login-btn");
            }
            alert("Login successful!");
            window.location.href = "http://127.0.0.1:5500/Main_page/landingpage/index.html"; // Redirect to home page after successful login

        } else {
            alert("Invalid email or password!");
        }
    } else {
        alert("No user found. Please register first.");
    }
});

