<?php
	session_start();
    if (!isset( $_SESSION['checkLogin'])) {
    	$error = array('code' => 0, 'status' => 'error', 'msg' => '请先登录');
    	echo json_encode($error);
    	return;
    };
	require_once 'connectvars.php';
	$username= $_REQUEST['username'];
	$userid = $_SESSION['userid'];
	$weixinNum = $_REQUEST['weixinNum'];
	$userhead = $_REQUEST['userhead'];
	mysqli_query($conne, "UPDATE user SET username = '$username', weixinNum = '$weixinNum', userhead = '$userhead' WHERE userid = '$userid'");
	$save = array('code' => 1,
				  'status' => 'success',
		  		  'userinfo' =>
					array('username' => $username,
						'weixinNum' => $weixinNum,
						'userhead' => $userhead
					),
				  'msg' => '信息修改成功');
	echo json_encode($save);

?>