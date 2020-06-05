<?php
require_once('DB_classes.php');

$nguoidung = new NguoiDungBUS();
$nguoidung->delete_by_id("4");
$nguoidung->add_new(array(null, 'Tran', 'Thu Hien', 'thuhien@gmail.com'));

show_DataBUS_as_Table(new NguoiDungBUS());
die('LOL');

// Check trùng bằng getList