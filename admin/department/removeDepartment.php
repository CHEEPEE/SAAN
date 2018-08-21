<?php
include '../Database.php';
$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);

$query = "delete from department where department_id = $department_id";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>