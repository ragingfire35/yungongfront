<?php
	$username= $_REQUEST['username'];
	$checkLogin = $_REQUEST['checkLogin'];
	if($checkLogin == "1"){
/*		$_SESSION['userinfo'] = [
			'userName' => $userName
		];*/
		$success = array('code' => 1, 'status' => 'success',  'msg' => '登录成功');
		echo json_encode($success);
	}
?>