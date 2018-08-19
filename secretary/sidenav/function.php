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

        $arrayData[]=$subjects;        
    }
}

echo json_encode($arrayData);
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