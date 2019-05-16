<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	// lấy tất cả sản phẩm
    	case 'getall':
				$dssp = (new SanPhamBUS())->select_all();
		    	die (json_encode($dssp));
    		break;

        case 'add':
                $data = $_POST['dataAdd'];
                $sp = (new SanPhamBUS())->add_new($data);
            break;
    	
    	default:
    		# code...
    		break;
    }
?>