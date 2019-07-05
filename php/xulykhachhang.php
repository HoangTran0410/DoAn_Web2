<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	case 'getall':
				$khachang = (new NguoiDungBUS())->select_all();
                
		    	die (json_encode($khachang));
    		break;

    	case 'changeTT':
				$khachhangBUS = new NguoiDungBUS();
				$key = $_POST['key'];
				$trangthai = $_POST['trangThai'];
				
		    	die (json_encode($khachhangBUS->capNhapTrangThai($trangthai, $key)));
    		break;

	    case 'delete':
				$khachhangBUS = new NguoiDungBUS();
				$mand = $_POST['mand'];
					
			    die (json_encode($khachhangBUS->delete_by_id($mand	)));
	    	break;


	default:
    		# code...
    		break;
    }
?>