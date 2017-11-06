<?php
session_start();

include "MySQL.class.php";

$dbh = new MySQL();

$sql = "SELECT username, password FROM customers WHERE username = ?";
$result = $dbh->select($sql, $_POST['username']);
    
$array = json_decode(json_encode($result[0]), true);
$hashedPasswordFromDB = $array['password'];
$passwordFromPost = $_POST['password'];

if (password_verify($passwordFromPost, $hashedPasswordFromDB)) {
    $_SESSION['data'] = $_POST['username'];
    echo "<script>
        window.location.replace('calculator.php');
        alert('You successfully logged in!');
        </script>";
}else{
    echo "<script>
        window.location.replace('index.html');
        alert('Wrong Username/Password!');
        </script>";                
}

?>