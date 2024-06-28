function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var usernameError = document.getElementById("usernameError");
    var passwordError = document.getElementById("passwordError");
    var isValid = true;

    usernameError.textContent = "";
    passwordError.textContent = "";

    if (username.trim() === "") {
        usernameError.textContent = "Username cannot be empty";
        isValid = false;
    }

    if (password.trim() === "") {
        passwordError.textContent = "Password cannot be empty";
        isValid = false;
    } else if (password !== "vish") {
        passwordError.textContent = "Incorrect password or username";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("username").style.borderColor = "red";
        isValid = false;
    }
    else if (username !== "vishesh") {
        passwordError.textContent = "Incorrect password or username";
        document.getElementById("password").style.borderColor = "red";
        document.getElementById("username").style.borderColor = "red";
        isValid = false;
    } else {
        document.getElementById("password").style.borderColor = "green";
        alert("Login successful");
    }

    return isValid;
}
