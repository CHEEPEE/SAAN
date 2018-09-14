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
    $sql = "select * from students where (student_id like '$student_id%' or l_name like '%$student_id%') and department_id = $dept_id";
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


if ($requestType == "checkWarnings"){
    include '../Database.php';
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    $absent_value = mysqli_real_escape_string($connect,$_POST['absent_value']);
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
    $sql = "select * from warnings where student_id = $student_id and subject_id = $subject_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
        
     while ($row = $result->fetch_assoc()) {
        // code...
        if(updateWarning($student_id,$subject_id,$absent_value)){
            //if email level is less than warning level send email
            if($row['email_level'] < getWarningLevel($absent_value)){
                echo sendWarning($student_id,$subject_id,$absent_value);
             }

    }
  
    }
    
}
else{
        if(addWarning($student_id,$subject_id,$absent_value)){
            if (getWarningLevel($absent_value)!=0){
            echo sendWarning($student_id,$subject_id,$absent_value);
          }
        }
    }
}
if ($requestType == "getWarningLevels"){
    include '../Database.php';
    $student_id = mysqli_real_escape_string($connect,$_POST['student_id']);
    $absent_value = mysqli_real_escape_string($connect,$_POST['absent_value']);
    $subject_id = mysqli_real_escape_string($connect,$_POST['subject_id']);
    $sql = "select * from warnings where student_id = $student_id and subject_id = $subject_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
        while ($row = $result->fetch_assoc()) {
            // code...
            echo $row['warning_level'];

        }
    // code...
    } 
}

if ($requestType == "getSmsLogs"){
    session_start();
    $department_id = $_SESSION['dept_id'];
    include '../Database.php';
   
    $sql = "select * from smslogs where dept_id = $department_id";
    $result = $connect->query($sql);
    $arrayData = array();
    class myObject
    {
        
    }
    if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
        // code...

        $smslogs = new myObject();

        $smslogs->parent_name =getStudentCredentials($row['student_id'])['parent_name'];
        $smslogs->parent_number = getStudentCredentials($row['student_id'])['parent_number'];
        $smslogs->time = $row['time_date'];
        $smslogs->smslog_id = $row['sms_id'];

        
        $arrayData[]=$smslogs;        
    }
}

echo json_encode($arrayData);
}
function addWarning($student_id,$subject_id,$absent){
    include '../Database.php';
    session_start(); 
    $level = getWarningLevel($absent);
    $query = "INSERT INTO warnings(student_id,warning_level,subject_id
    ) 
    VALUES ($student_id,$level,$subject_id)";
    if(mysqli_query($connect,$query)) 
    {
        return true;
    }else {
        return "Error: " . $query . "<br>" . $connect->error;
    }
}
function updateWarning($student_id,$subject_id,$absent){
    include '../Database.php';
    $level = getWarningLevel($absent);
    $query = "update warnings set warning_level = $level 
    where
    student_id = $student_id and subject_id = $subject_id";
    if(mysqli_query($connect,$query)) 
    {
        return true;
    }else {
        return "Error: " . $query . "<br>" . $connect->error;
    }
}
function updateEmailLevel($student_id,$subject_id,$absent){
    include '../Database.php';
    $level = getWarningLevel($absent);
    $query = "update warnings set email_level = $level 
    where
    student_id = $student_id and subject_id = $subject_id";
    if(mysqli_query($connect,$query)) 
    {
        return true;
    }else {
        return "Error: " . $query . "<br>" . $connect->error;
    }
}

function getWarningLevel($absentHours){
    if ($absentHours >= 4.5  && $absentHours < 7.5){
        return 1;
    }
    else if ($absentHours >= 7.5 && $absentHours < 10.5){
        return 2;
    }
    else if ($absentHours >= 10.5 && $absentHours <15 ){
        return 3;
    }else if ($absentHours >= 15){
        return 4;
    }else{
        return 0;
    }
}



function sendWarning($student_id,$subject_id,$absent){
    session_start();
    $department_id = $_SESSION['dept_id'];
   if(updateEmailLevel($student_id,$subject_id,$absent)){

        if(itexmo(getStudentCredentials($student_id)['parent_number'],textMessage($student_id,$subject_id,$absent),"TR-SACAU065476_CA5JZ")==0){
            saveSMSLog($student_id,$department_id);
        }

        return sendMail($student_id,$subject_id,$absent);
   }
}

function saveSMSLog($student_id,$department_id){
    $dateTime = getTime();
    include '../Database.php';
    $query = "INSERT INTO smslogs(student_id,dept_id,time_date
    ) 
    VALUES ($student_id,$department_id,'$dateTime')";
    if(mysqli_query($connect,$query)) 
    {
        echo 'save sms log success';
    }else {
        echo "Error: " . $query . "<br>" . $connect->error;
    }
}

function getTime(){
  return  date("h:i:sa")." ".date("Y/m/d");
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

function itexmo($number,$message,$apicode){

    $url = 'https://www.itexmo.com/php_api/api.php';
    $itexmo = array('1' => $number, '2' => $message, '3' => $apicode);
    $param = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($itexmo),
        ),
    );
    $context  = stream_context_create($param);
    return file_get_contents($url, false, $context);
}

function textMessage($student_id,$subject_id,$absent){
    $message = "";
    $studentCred = getStudentCredentials($student_id);
    $parentName = $studentCred['parent_name'];
    $studentName = $studentCred['l_name'].", ".$studentCred['f_name']. " ". $studentCred['m_name'];
    $warningLevel = getWarningDetails($student_id,$subject_id)['warning_level'];
    $subject_code = getSubjectCredentials($subject_id)['subject_code'];
    $subject_des = getSubjectCredentials($subject_id)['subject_des'];
    $teacher = getTeacherDetails(getSubjectCredentials($subject_id)['teacher_id'])['teacher_name'];
    $absentDays = floor($absent/1.5);
    
   $message = "$parentName $absentDays $subject_code $subject_des $teacher
   ";
   echo substr($message,0,90);
   return substr($message,0,90);
}

function sendMail($student_id,$subject_id,$absent){
    $studentCred = getStudentCredentials($student_id);
    $parentName = $studentCred['parent_name'];
    $studentName = $studentCred['l_name'].", ".$studentCred['f_name']. " ". $studentCred['m_name'];
    $warningLevel = getWarningDetails($student_id,$subject_id)['warning_level'];
    $subject_code = getSubjectCredentials($subject_id)['subject_code'];
    $subject_des = getSubjectCredentials($subject_id)['subject_des'];
    $teacher = getTeacherDetails(getSubjectCredentials($subject_id)['teacher_id'])['teacher_name'];
    $to = $studentCred['parent_email'];
    $absentDays = floor($absent/1.5);
    $subject = "Warning Notice";

    $message = "
    <html>
    <head>
    <title>St. Anthony's College Automatic Email Sender</title>
    </head>
    <body>
    <p>Dear $parentName,

    This is to inform you that your son/daugther $studentName have accumulated the following absences in this subject<br>
    <br>
   
    Do Come and see me as soon as possible to discuss this matter. Thank you.
    </p>

    <br>
    <p>Details:

    Absents: $absentDays ($absent hours)<br>
    Warning level: $warningLevel<br>
    Subject Code: $subject_code<br>
    Subject Description: $subject_des<br>
    Teacher :$teacher<br>

    </p>

   
    </body>
    </html>
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




function getStudentCredentials($student_id){
    include '../Database.php';
    $sql = "select * from students where student_id = $student_id";
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

function getWarningDetails($student_id,$subject_id){
    include '../Database.php';
    $sql = "select * from warnings where student_id = $student_id and subject_id = $subject_id";
    $result = $connect->query($sql);
    if ($result->num_rows >0) {
      // code...
      while ($row = $result->fetch_assoc()) {
        // code...
        return $row;
      }
    }
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


?>
