<?php
include '../Database.php';
$department_name = mysqli_real_escape_string($connect,$_POST['department_name']);

$query = "INSERT INTO department(department_name) VALUES ('$department_name')";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
