<?php 
$requestType = $_POST['requestType'];
if ($requestType == "getSubjectsWithWarning"){
    include '../Database.php';
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    
    $sql = "select * from warnings where student_id = $student_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
        while ($row = $result->fetch_assoc()) {
            // code...
            $warningDetails = new myObject();

            $warningDetails->subject_id =$row['subject_id'];
            $warningDetails->warning_id = $row['warning_id'];
            $warningDetails->student_id = $row['student_id'];
            $warningDetails->warning_level = $row['warning_level'];
            $warningDetails->teacherName = getTeacherDetails(getSubjectCredentials($row['subject_id'])['teacher_id'])['teacher_name'];
            $warningDetails->subject_des = getSubjectCredentials($row['subject_id'])['subject_des'];
    
            $arrayData[]=$warningDetails;   

        }
    // code...
    }
    echo json_encode($arrayData);
}

function getSubjectCredentials($subject_id){
    include '../Database.php';
    $sql = "select * from subjects where subject_id = $subject_id";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
      // code...
      while ($row = $result->fetch_assoc()) {
        // code...
        return $row;
      }
    }
}


function getTeacherDetails($teacherId){
    include '../Database.php';
    $sql = "select * from teachers where teacher_id = $teacherId";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
      // code...
      while ($row = $result->fetch_assoc()) {
        // code...
        return $row;
      }
    }
}

?>