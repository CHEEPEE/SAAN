<?php
include '../Database.php';
$sql = "select * from teachers";
$result = $connect->query($sql);
$arrayData = array();
class myObject
{
    public $property1;
}

if ($result->num_rows >0) {
  // code...
  while ($row = $result->fetch_assoc()) {
    // code...

    $teacher = new myObject();

    $teacher->department_name = getDepartmentName($row['department_id']);
    $teacher->teacher_name = $row['teacher_name'];
    $teacher->teacher_id = $row['teacher_id'];
    $teacher->department_id = $row['department_id'];

    $arrayData[]=$teacher;
    
  }
}

echo json_encode($arrayData);


function getDepartmentName($department_id){
  include '../Database.php';
  $sql = "select * from department where department_id = $department_id";
  $result = $connect->query($sql);
  if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
      // code...
      return $row["department_name"];
    }
  }
  }
?>

