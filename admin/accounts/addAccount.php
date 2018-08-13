<?php
include '../Database.php';
$username = mysqli_real_escape_string($connect,$_POST['username']);
$password = mysqli_real_escape_string($connect,$_POST['password']);
$department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
$account_name = mysqli_real_escape_string($connect,$_POST['account_name']);

$query = "INSERT INTO users(username,password,account_name,department_id) 
VALUES ('$username','$password','$account_name','$department_id')";
if(mysqli_query($connect,$query)) 
{
    echo 'success';
}else {
    echo "Error: " . $query . "<br>" . $connect->error;
}
?>
