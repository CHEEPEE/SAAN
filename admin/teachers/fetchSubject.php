<?php
include '../Database.php';
$teacher_id = mysqli_real_escape_string($connect,$_POST["teacher_id"]);
$sql = "select * from subjects where teacher_id = $teacher_id ";
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

    $subject = new myObject();
    
    $subject->subject_code = $row['subject_code'];
    $subject->subject_des = $row['subject_des'];
    $subject->teacher_id = $row['teacher_id'];
    $subject->subject_id = $row['subject_id'];
    $subject->class_des = $row['class_des'];

   
    $arrayData[]=$subject;
    
  }
}
echo json_encode($arrayData);
function getTeacherName($teacher_id){
    include '../Database.php';
    $sql = "select * from course where course_id = $course_id";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
      // code...
      while ($row = $result->fetch_assoc()) {
        // code...
        return $row["course_name"];
    
      }
    }
    }
?>