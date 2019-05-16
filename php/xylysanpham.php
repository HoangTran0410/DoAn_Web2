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

                $spAddArr = array(
                    'MaSP' => $data['masp'],
                    'MaLSP' => $data['company'],
                    'TenSP' => $data['name'],
                    'DonGia' => $data['price'],
                    'SoLuong' => $data['amount'],
                    'HinhAnh' => $data['img'],
                    'MaKM' => $data['promo']['name'],
                    'ManHinh' => $data['detail']['screen'],
                    'HDH' => $data['detail']['os'],
                    'CamSau' => $data['detail']['camara'],
                    'CamTruoc' => $data['detail']['camaraFront'],
                    'CPU' => $data['detail']['cpu'],
                    'Ram' => $data['detail']['ram'],
                    'Rom' => $data['detail']['rom'],
                    'SDCard' => $data['detail']['microUSB'],
                    'Pin' => $data['detail']['battery'],
                    'SoSao' => $data['star'],
                    'SoDanhGia' => $data['rateCount'],
                    'TrangThai' => 0
                );

                $spBUS = new SanPhamBUS();
                die (json_encode($spBUS->add_new($spAddArr)));
            break;
    	
    	default:
    		# code...
    		break;
    }
?>