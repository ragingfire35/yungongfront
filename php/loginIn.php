<?php
    /**
     ** lohin in
    **/
    @header("content-type:text/html;charset=utf8");
    $conne = mysqli_connect("localhost","root","yungong") or die("数据库用户名或密码错误".@mysqli_error());
    $select = mysqli_select_db($conne,"yungong") or die("数据库用户名或密码错误".@mysqli_error());
    $utf = mysqli_query($conne,"set names utf8");
    $username= $_REQUEST['username'];
    $pass = $_REQUEST['pass'];
    $sqlname = mysqli_query($conne, "select count(*) from user where username= '$username'");
    $row = mysqli_fetch_row($sqlname);
    $num = $row[0];
    //查看用户是否存在
    if(!$num){
        $nameerror = array('code' => 1, 'status' => 'nameerror',  'msg' => '找不到该用户名，请重新输入');
        echo json_encode($nameerror);//不存在返回nameerror
    }else{
        $sqlpass = mysqli_query($conne, "select pass from user where username='$username'");//返回一个句柄；
        $passarray = mysqli_fetch_row($sqlpass);//获得一个只有一行数据的数族
        $passval = $passarray[0];//这里才是对应用户的密码
        $isPass = array('code' => 1, 'pass' => $pass);
        echo json_encode($isPass);
        //判断该用户的密码是否正确
/*        if($passval!=$pass){
            $passerror = array('code' => 1, 'error' => '1', 'status' => 'passerror', 'msg' => '密码输入不正确');
            echo json_encode($passerror);//不正确返回passerror
        } else{
            $success = array('code' => 1, 'error' => '0', 'status' => 'success', 'msg' => '登录成功');
            echo json_encode($success);//不正确返回passerror
        }*/
    }
?>