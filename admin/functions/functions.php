<?php

$requestType = $_POST['requestType'];


if ($requestType == "updateAccount"){
    include '../Database.php';
    $account_id = mysqli_real_escape_string($connect,$_POST['account_id']);
    $account_name = mysqli_real_escape_string($connect,$_POST['account_name']);
    $password = mysqli_real_escape_string($connect,$_POST['password']);
    $username = mysqli_real_escape_string($connect,$_POST['username']);

    
    $query = "update users set username = '$username',password = '$password', account_name = '$account_name' where userid = $account_id";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if ($requestType == "removeAccount"){
    include '../Database.php';
    $account_id = mysqli_real_escape_string($connect,$_POST['account_id']);
    
    $query = "delete from users where userid = $account_id";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}
?>