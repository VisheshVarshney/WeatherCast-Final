<?php
// Database configuration
$dbHost = 'localhost';
$dbUsername = 'root'; // Change this to your MySQL username
$dbPassword = ''; // Change this to your MySQL password
$dbName = 'login_system';

// Create database connection
$conn = mysqli_connect($dbHost, $dbUsername, $dbPassword, $dbName);

// Check connection
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}
?>
