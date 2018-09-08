<?php
include '../Database.php';

$student_id = mysqli_real_escape_string($connect,$_POST['student_id']);

$sql = "select * from students where student_id = $student_id";
// echo $sql;
$result = $connect->query($sql);
$arrayData = array();
class myObject
{
   
}
if ($result->num_rows >0) {
  // code...
  while ($row = $result->fetch_assoc()) {
    // code...

   if(haveWarning($row['student_id'])){
    $student = new myObject();
    
    $student->f_name = $row['f_name'];
    $student->m_name = $row['m_name'];
    $student->l_name = $row['l_name'];
    $student->student_id = $row['student_id'];
    $student->suffix = $row['suffix'];
    $student->parent_name = $row['parent_name'];
    $student->parent_number = $row['parent_number'];
    $student->parent_email = $row['parent_email'];
    $student->course_id = $row['course_id'];
    $student->year_level = $row['year_level'];
    $student->department_id = $row['department_id'];
    $student->department_name = getDepartmentName($row['department_id']);
    $student->course_name = getCourseName($row['course_id']);

    $arrayData[]=$student;
   }
    
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
  function getCourseName($course_id){
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

    function haveWarning($student_id){
      include '../Database.php';
      $sql = "select * from warnings where student_id = $student_id";
      $result = $connect->query($sql);
      if ($result->num_rows >0) {
        // code...
        while ($row = $result->fetch_assoc()) {
          // code...
         if($row['warning_level']>0){
           return true;
         }
      
        }
        }
      }
    

?>