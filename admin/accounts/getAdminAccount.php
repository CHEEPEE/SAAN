<?php 
    include '../Database.php';
    session_start();
    $id = $_SESSION["accout_id"];
    $sql = "select * from users where userid = $id ";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...
        echo json_encode($row); 
    }
}
?>