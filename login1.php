<?php
require_once 'db.php';

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Login successful
        $_SESSION['username'] = $username;
        header('Location: index.html?username=' . $username);
        exit();
    } else {
        // Login failed
        echo 'Invalid username or password';
    }
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<style>
    h1 {
            text-align: center;
            color: #333;
        }

        .container {
            position: absolute;
            top: 25%;
            font-family: "myFirstFont";
            left: 35%;
            min-width: 400px;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }                 
        .form-group {
            margin-bottom: 20px;
        }
    
        label {
            display: block;
            margin-bottom: 5px;
            color: #333;
        }

        input[type="text"],
        input[type="password"] {
            width: 90%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        .error {
            color: red;
        }

        .submit-btn {
            display: block;
            width: 100%;
            border: 1px solid #ccc;
            border-color: green;
            padding: 10px;
            background-color: #4CAF50;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .submit-btn:hover {
            background-color: #45a049;
        }
    </style>
<body>
    <h2>Login</h2>
    <form method="post" action="">
    <div class="form-group">
                <label for="username">Username:</label>
                <input type="text" id="username" name="username">
                <span id="usernameError" class="error"></span>
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password">
                <span id="passwordError" class="error"></span>
            </div>
            <div>
                <input type="submit" value="Login" class="submit-btn">
            </div>    
    </form>
</body>
</html>