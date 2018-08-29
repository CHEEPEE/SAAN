<?php
$requestType = $_POST['requestType'];

if ($requestType == "getTeachers"){
    include '../Database.php';
    $teacher_name = mysqli_real_escape_string($connect,$_POST['teacher_name']);
    $sql = "select * from teachers where teacher_name like '%$teacher_name%' ";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...

        $teacher = new myObject();

        $teacher->department_name = getDepartmentName($row['department_id']);
        $teacher->teacher_name = $row['teacher_name'];
        $teacher->teacher_id = $row['teacher_id'];
        $teacher->teacher_dept_id = $row['department_id'];

        $arrayData[]=$teacher;        
    }
}

echo json_encode($arrayData);
}

if ($requestType == "getTeacherCourse"){
    include '../Database.php';
    $teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);
    $sql = "select * from subjects where teacher_id = $teacher_id ";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...

        $subjects = new myObject();

        $subjects->subject_id = $row['subject_id'];
        $subjects->subject_code = $row['subject_code'];
        $subjects->subject_des = $row['subject_des'];
        $subjects->class_des = $row['class_des'];


        $arrayData[]=$subjects;        
    }
}

echo json_encode($arrayData);
}

if ($requestType == "getStudents"){
    include '../Database.php';
    session_start();
    $dept_id = $_SESSION["dept_id"];
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    $sql = "select * from students where student_id like '$student_id%' and department_id = $dept_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...
        $arrayData[]=$row;        
    }
}

echo json_encode($arrayData);
}
if ($requestType == "addAbsent"){
    include '../Database.php';
    session_start();
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    $teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
    $absent_date = mysqli_real_escape_string($connect,$_POST['absent_date']);
    $time_stamp = mysqli_real_escape_string($connect,$_POST['time_stamp']);
    $absentValue = mysqli_real_escape_string($connect,$_POST['absentValue']);
    
    $query = "INSERT INTO absents(student_id,teacher_id,subject_id,absent_date,time_stamp,absent_value
    ) 
    VALUES ($student_id,$teacher_id,$subject_id,'$absent_date','$time_stamp',$absentValue)";
    if(mysqli_query($connect,$query)) 
    {
        echo 'success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

if ($requestType == "getAbsents"){
    include '../Database.php';
    session_start();
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    $teacher_id = mysqli_real_escape_string($connect,$_POST['teacher_id']);
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
    $sql = "select * from absents where student_id = $student_id and teacher_id = $teacher_id and subject_id = $subject_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...
        $arrayData[]=$row;        
    }
}

echo json_encode($arrayData);
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


function getDepartmentName($department_id){
    include '../Database.php';
    $sql = "select * from department where department_id = $department_id";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
      // code...
      while ($row = $result->fetch_assoc()) {
        // code...
        return $row["department_name"];
      }
    }
}
  ?>