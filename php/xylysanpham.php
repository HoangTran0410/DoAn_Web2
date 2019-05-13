<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['type']) && !isset($_GET['type'])) die(null);

    switch ($_POST['type']) {
    	// lấy tất cả sản phẩm
    	case 'getall':
				$dssp = (new SanPhamBUS())->select_all();
		    	die (json_encode($dssp));
    		break;
    	
    	default:
    		# code...
    		break;
    }
?>