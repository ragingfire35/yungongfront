
<?php
    /**
     ** lohin up
    **/
    require_once 'common/connectvars.php';

    $username= $_REQUEST['username'];
    $pass = $_REQUEST['pass'];
    $userid = md5(uniqid());
    $sql  = mysqli_query($conne, "select count(*) from user where username='$username'");
    $row = mysqli_fetch_row($sql);
    $num = $row[0];
    //判断用户名是否已经被注册了
    if($num == 1){
        $error = array('code' => 1, 'status' => 'repeat', 'msg' => '账号已被注册，请重新输入');
        echo json_encode($error);//被注册返回repeat
    }else{
        mysqli_query($conne, "insert into user(userid, username, pass) values('$userid','$username','$pass')");
        $success = array('code' => 1, 'status' => 'suceess', 'msg' => '注册成功');
        echo json_encode($success);
    }
?>