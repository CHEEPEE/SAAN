<?php
include '../Database.php';
$course_name = mysqli_real_escape_string($connect,$_POST['course_name']);
$deparment_id = mysqli_real_escape_string($connect,$_POST['department_id']);

$query = "INSERT INTO course(course_name,department_id) VALUES ('$course_name',$deparment_id)";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
