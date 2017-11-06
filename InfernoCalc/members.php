<?php
session_start();

include "MySQL.class.php";

$dbh = new MySQL();

$sql = "SELECT name, dps FROM employee";
$result = $dbh->select($sql);

echo json_encode($result);

?>