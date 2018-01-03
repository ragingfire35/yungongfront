<?php
   	@header("content-type:text/html;charset=uft8");
    $conne = mysqli_connect("localhost","root","yungong") or die("数据库用户名或密码错误".@mysqli_error());
    $select = mysqli_select_db($conne,"yungong") or die("数据库用户名或密码错误".@mysqli_error());
    $utf = mysqli_query($conne,"set names utf8");
?>