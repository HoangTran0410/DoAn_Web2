<?php
require_once('DB_classes.php');

$nguoidung = new NguoiDungBUS();
// $nguoidung->delete_by_id("ND2");
 $nguoidung->add_new(array('ND3', 'Tran', 'Thu Hien', 'thuhien@gmail.com'));

show_DataBUS_as_Table(new NguoiDungBUS());
die('LOL');

// Check trùng bằng getList