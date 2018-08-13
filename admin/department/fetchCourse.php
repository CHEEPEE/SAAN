<?php
include '../Database.php';
$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
$sql = "select * from course WHERE department_id = '$department_id'";
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
