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

if ($requestType == "updateSubject"){
    include '../Database.php';
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
    $subject_code = mysqli_real_escape_string($connect,$_POST['subject_code']);
    $subject_des = mysqli_real_escape_string($connect,$_POST['subject_des']);
    $class_des = mysqli_real_escape_string($connect,$_POST['class_des']);
    $sql = "update subjects set subject_code = '$subject_code', subject_des = '$subject_des' ,class_des = '$class_des' where subject_id = $subject_id ";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}

if ($requestType == "removeSubject"){
    include '../Database.php';
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
   
    $sql = "delete from subjects where subject_id = $subject_id ";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}

if ($requestType == "updateTeacher"){
    include '../Database.php';
    $teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);
    $teacher_name = mysqli_real_escape_string($connect,$_POST['teacher_name']);
  
    $sql = "update teachers set teacher_name = '$teacher_name' where teacher_id = $teacher_id ";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}
if ($requestType == "deleteTeacher"){
    include '../Database.php';
    $teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);
  
  
    $sql = "delete from teachers where teacher_id = $teacher_id ";
    if(mysqli_query($connect,$sql)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $sql . "<br>" . $connect->error;
    }
}

?>