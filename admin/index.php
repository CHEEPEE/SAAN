<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin</title>
    <?php
    include 'head.php';
    session_start();
    if($_SESSION["account_type"] == null){
        header("location:../wedontdothathere.php");
    }
    ?>
    <style>
        html{
            height:100%; 
        }
    </style>
</head>
<body class = "bg-light">
<nav class="navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand text-white" href="">SAC Automated Attendance Notification</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="ml-5 collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <a class="nav-link" href="../secretary">Manage Absences<span class="sr-only">(current)</span></a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0 mr-3">
      <ul class="navbar-nav mr-auto mr-3">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-white" href="#" id = "account-name" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <?php echo $_SESSION["account_name"]?>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="logout.php">Log out</a>
            </div>
        </li>
        </ul>
    </form>
  </div>
</nav>
<div class = "row mt-5 h-100">
    <div class = "col-sm-2  mt-2 h-100">
    </div>
    <div class = "col-sm-2 bg-white mt-2 shadow position-fixed h-100">
     <div class="nav m-3 flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
      <!-- <div class="mt-3 font-weight-bold nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick = "manageDepartmentRoot()"> Department</div> -->
      <div class="mt-3 font-weight-bold nav-link active" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false" onClick = "manageAccoutRoot()"> Accounts</div>
      <div class="mt-3 font-weight-bold nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false" onClick = "manageStudents()"> Students</div>
      <div class="mt-3 font-weight-bold nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick = "manageTeachers()"> Teachers</div>
    </div>
    </div>
    <div class = "col-sm-10 p-5">
        <div id = "mainRoot" class = "w-100 ">
            <!-- Root Container -->

        </div>
    </div>
</div>
    
</body>
<script type="text/babel" src="managedepartment.js"></script>
<script type="text/babel" src="manageAccounts.js"></script>
<script type="text/babel" src="manageStudents.js"></script>
<script type="text/babel" src="manageTeachers.js"></script>
</html>