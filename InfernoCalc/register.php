<?php

include "MySQL.class.php";

$dbh = new MySQL();

if ($_POST['username'] == "None"){
    echo "<SCRIPT>
        alert('Username taken!');
        window.location.replace(\"index.html\");
    </SCRIPT>";
}else{

if ($_POST['password'] != $_POST['confirm-password']){
    echo "<SCRIPT>
        alert('Passwords do not match!');
        window.location.replace(\"index.html\");
    </SCRIPT>";
}else{
    $options = [
      'cost' => 9
    ];
    $password = $_POST['password'];
    $hash = password_hash($password, PASSWORD_BCRYPT, $options);
    $sql = "INSERT INTO customers (username, email, password) VALUES (?, ?, ?)";
    $params = array($_POST['username'], $_POST['email'], $hash);
    if($dbh->insert($sql, $params)){
      echo "<script>
            window.location.replace('index.html');
            alert('You successfully registered!');
            </script>";
    }else{
      echo "<script>
            window.location.replace('index.html');
            alert('That name is already taken!');
            </script>";
    }
}
}
?>