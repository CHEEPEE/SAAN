<?php
include '../Database.php';

$subject_code = mysqli_real_escape_string($connect,$_POST['subject_code']);
$subject_des = mysqli_real_escape_string($connect,$_POST['subject_des']);
$teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);

$query = "INSERT INTO subjects(subject_code,subject_des,teacher_id) VALUES ('$subject_code','$subject_des',$teacher_id)";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
