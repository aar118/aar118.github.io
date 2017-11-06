<?php 
$link = mysqli_connect("127.0.0.1","root","","company");

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$result = mysqli_query($link, "SELECT * FROM employee");

$data = array();
while ( $row = $result->fetch_array())
{
    $data[] = $row;
}

echo json_encode($data); 
?>