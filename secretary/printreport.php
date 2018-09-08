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
<body class = "h-100 bg-white">
<div class = "container p-5" id = "app">
</div>

</body>
<script>
const global_userId = "<?php echo $_SESSION["accout_id"]; ?>";
const global_deptId = "<?php echo $_SESSION['dept_id']?>";
</script>
<script type="text/babel" src="print.js"></script>

</html>