<?php
  include '../Database.php';
  $userId = mysqli_real_escape_string($connect,$_POST['userId']);
  $sql = "select * from users where userid = $userId";
  $result = $connect->query($sql);
  $arrayData = array();
  class myObject
  {
      public $property1;
  }
  if ($result->num_rows >0) {
    // code...
    while ($row = $result->fetch_assoc()) {
      // code...
  
      $account_details_object = new myObject();
  
      $account_details_object->account_name = $row['account_name'];
      $account_details_object->username = $row['username'];
      $account_details_object->password = $row['password'];
      $account_details_object->department_name = getDepartmentName( $row['department_id']);
      $account_details_object->userid = $row['userid'];
      $arrayData[]=$account_details_object;
      
    }
  }
  
  echo json_encode($arrayData);
  
  
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