<?php
include '../Database.php';

$teacher_name = mysqli_real_escape_string($connect,$_POST['teacher_name']);
$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);

$query = "INSERT INTO teachers(teacher_name,department_id) VALUES ('$teacher_name',$department_id)";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
