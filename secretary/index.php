<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Department Secretary</title>
    <?php
    include 'head.php';
    session_start();
    if($_SESSION["account_type"] == null){
        header("location:../wedontdothathere.php");
    }
    if($_SESSION["account_type"] != "dept_sec"){
        header("location:../wedontdothathere.php");
    }
    
    include 'functions/function.php';

    ?>

    <style>
        html{
            height:100%; 
        }
    </style>
</head>
<body class = "h-100 bg-light">
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand text-white" href="">SAC Automated Attendance Notification <br> <small><?php echo getDepartmentName($_SESSION['dept_id']); ?></small></a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="ml-5 collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    </ul>
    <form class="form-inline my-2 my-lg-0 mr-3">
      <ul class="navbar-nav mr-auto mr-3">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id = "account-name" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <?php echo $_SESSION["account_name"]?>
            </a>
            
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" onClick = "getSecretaryAccount();">Manage Accout</a>
            <a class="dropdown-item" onClick = "getSmsLogs();">Sms Logs</a>
           
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="logout.php">Log out</a>
            </div>
        </li>
        </ul>
    </form>
  </div>
</nav>
<div class = "container-fluid h-100">


    <div class = "row h-100 mt-4 pt-5 pl-3">
       
    <div class = "col-sm-4 h-100 pt-3 shadow bg-white" id = "sideNavRoot">
       
    </div>
    <div class = "col-sm-8 mt-3 p-3" id = "mainContainerRoot">
        Main Root
    </div>
</div>
</div>
</body>
<script>
const global_userId = "<?php echo $_SESSION["accout_id"]; ?>";
const global_deptId = "<?php echo $_SESSION['dept_id']?>";
</script>
<script type="text/babel" src="index.js"></script>
<script type="text/babel" src="students.js"></script>
</html>