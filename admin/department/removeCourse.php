<?php
include '../Database.php';
$course_id = mysqli_real_escape_string($connect,$_POST['course_id']);

$query = "delete from course where course_id = $course_id";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>