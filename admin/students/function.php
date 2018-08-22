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

?>