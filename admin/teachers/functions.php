<?php 

$requestType = $_POST['requestType'];
if ($requestType == "fetchDepartmentOptions"){
    include '../Database.php';
    $department_id = mysqli_real_escape_string($connect,$_POST['department_id']);
    $sql = "select * from department";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...
            $department = new myObject();

            $department->department_id = $row['department_id'];
            $department->department_name = $row['department_name'];
    
            array_push($arrayData,$department); 
    }
}

echo json_encode($arrayData);
}
?>