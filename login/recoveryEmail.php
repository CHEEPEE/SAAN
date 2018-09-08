<?php 


include '../admin/Database.php';
$email = mysqli_real_escape_string($connect,$_POST['email']);
    $sql = "select * from users where recovery_email = '$email' ";
    
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...
        sendMail($row['recovery_email'],$row['password']);
    }
    }
    else{
        echo "Email Doesnt Exist";
    }


function sendMail($email,$password){
  

    $to = $email;
    $subject = "HTML email";

    $message = "
    $password
    ";

    // Always set content-type when sending HTML email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

    // More headers
    $headers .= 'From: <webmaster@example.com>' . "\r\n";
    $headers .= "Cc: $to" . "\r\n";

    if(mail($to,$subject,$message,$headers)){
        echo "sent Success";
    }else{
        echo "failed";
    }
}
?>