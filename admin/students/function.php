<?php
include '../Database.php';
$requestType = mysqli_real_escape_string($connect,$_POST['requestType']); 

if($requestType == "removeStudent"){
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']); 
    $query = "delete from students where student_id = $student_id";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
}

if($requestType == "updateStudent"){
    $department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
    $course_id = mysqli_real_escape_string($connect,$_POST['course_id']);
    $year_level= mysqli_real_escape_string($connect,$_POST['year_level']);
    $student_id= mysqli_real_escape_string($connect,$_POST['student_id']);
    $f_name= mysqli_real_escape_string($connect,$_POST['f_name']);
    $m_name= mysqli_real_escape_string($connect,$_POST['m_name']);
    $l_name= mysqli_real_escape_string($connect,$_POST['l_name']);
    $suffix= mysqli_real_escape_string($connect,$_POST['suffix']);

    $parent_name= mysqli_real_escape_string($connect,$_POST['parent_name']);
    $parent_number= mysqli_real_escape_string($connect,$_POST['parent_number']);
    $parent_email= mysqli_real_escape_string($connect,$_POST['parent_email']);

    $query = "update students set f_name = '$f_name', m_name = '$m_name', l_name = '$l_name', suffix = '$suffix' ,
    department_id = $department_id ,course_id = $course_id, year_level = $year_level, 
    parent_name = '$parent_name', parent_number = '$parent_number', parent_email = '$parent_email'
    where student_id = $student_id";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
}

?>