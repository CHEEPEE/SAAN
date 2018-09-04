<?php
include '../Database.php';

$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
$year_level = mysqli_real_escape_string($connect,$_POST['year_level']);
$course_id = mysqli_real_escape_string($connect,$_POST['course_id']);
$search =  mysqli_real_escape_string($connect,$_POST['search']);
$whereQuery = "";

if(is_numeric($department_id) || is_numeric($year_level)|| is_numeric($course_id)){
  $whereQuery =$whereQuery. " where ";
 //if deparment is not null
  $whereQuery = $whereQuery. (is_numeric($department_id)? "department_id = $department_id " : " ")
  //if department and yearlevel is not null
  .(is_numeric($department_id) && is_numeric($year_level)? " and ":" ") 
  //if year level is not null
  .(is_numeric($year_level)? "year_level = $year_level ":" ")

  .(is_numeric($year_level) && is_numeric($course_id)? " and ":" ") 

  .(is_numeric($course_id)? " course_id = $course_id ":" ")
  
  ." and (student_id like '%$search%' or f_name like '%$search%' or l_name like '%$search%' or parent_name like '%$search%' or parent_number like '%$search%')";
}else{
  $whereQuery = "where student_id like '%$search%' or f_name like '%$search%' or l_name like '%$search%' or parent_name like '%$search%' or parent_number like '%$search%'";
}

$sql = "select * from students $whereQuery";
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
?>

