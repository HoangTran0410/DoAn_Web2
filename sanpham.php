<?php
    // Lấy dữ liệu từ DATABASE đổ vào mảng dssp
    require_once('BackEnd/ConnectionDB/DB_classes.php');
    $number = isset($_POST['number']) ? (int)$_POST['number'] : 0;
    if ($number == 1)
    {
	    $dssp = (new SanPhamBUS())->select_all();
	    die (json_encode($dssp));
	}
?>