<?php
include '../Database.php';

$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
$course_id = mysqli_real_escape_string($connect,$_POST['course_id']);
$year_level= mysqli_real_escape_string($connect,$_POST['year_level']);
$student_id= mysqli_real_escape_string($connect,$_POST['student_id']);
$f_name= mysqli_real_escape_string($connect,$_POST['f_name']);
$m_name= mysqli_real_escape_string($connect,$_POST['m_name']);
$l_name= mysqli_real_escape_string($connect,$_POST['l_name']);

$parent_name= mysqli_real_escape_string($connect,$_POST['parent_name']);
$parent_number= mysqli_real_escape_string($connect,$_POST['parent_number']);
$parent_email= mysqli_real_escape_string($connect,$_POST['parent_email']);


$query = "INSERT INTO students(student_id,f_name,m_name,l_name,
department_id,course_id,year_level,parent_name,parent_number,parent_email) 
VALUES ($student_id,'$f_name','$m_name','$l_name',
$department_id,$course_id,$year_level,'$parent_name','$parent_number','$parent_email')";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
