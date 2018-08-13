<?php
include '../Database.php';
$sql = "select * from department";
$result = $connect->query($sql);
$arrayData = array();
if ($result->num_rows >0) {
  // code...
  while ($row = $result->fetch_assoc()) {
    // code...
    $arrayData[]=$row;
  }
}
echo json_encode($arrayData);
?>
