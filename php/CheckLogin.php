<?php

	session_start();
	require_once 'common/connectvars.php';
	$username= $_REQUEST['username'];
	$checkLogin = $_REQUEST['checkLogin'];

	if($checkLogin == "1"){
	    $sql  = mysqli_query($conne, "select userid from user where username='$username'");
		$useridArray = mysqli_fetch_row($sql);
		$userid = $_SESSION['userid'] = $useridArray[0];
	    $sqlname = mysqli_query($conne, "select weixinNum, userhead from user where username= '$username' and userid = '$userid'");
	    $row = mysqli_fetch_row($sqlname);
		$success = array('code' => 1,
					 'status' => 'success',
					 'userinfo' =>
					 	array('username' => $username,
					 		  'weixinNum' => $row[0] ,
					 		  'userhead' => $row[1]
					 	),
					 'msg' => '信息获取成功');
		echo json_encode($success);

	} else {
		unset ($_SESSION['checkLogin']);
		$success = array('code' => 1,
					 'status' => 'success',
					 'msg' => '退出成功');
		echo json_encode($success);
	}
?>