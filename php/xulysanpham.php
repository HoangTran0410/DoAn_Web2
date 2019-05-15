<?php
    require_once('../BackEnd/ConnectionDB/DB_classes.php');

    if(!isset($_POST['request']) && !isset($_GET['request'])) die(null);

    switch ($_POST['request']) {
    	// lấy tất cả sản phẩm
    	case 'getall':
				$dssp = (new SanPhamBUS())->select_all();
		    	die (json_encode($dssp));
    		break;

        case 'phanTich_Filters':
            phanTich_Filters();
            break;

        case 'addFromWeb1':
            $spBUS = new SanPhamBUS();

            $sp = $_POST['sanpham'];
            $sanphamArr = array(
                'MaSP' => ($spBUS->getNextID()),
                'MaLSP' => ((new DB_driver())->get_row("SELECT * FROM LoaiSanPham WHERE TenLSP='".$sp["company"]."'")),
                'TenSP' => $sp['name'],
                'DonGia' => $sp['price'],
                'SoLuong' => $sp['SoLuong'],
                'HinhAnh' => $sp['HinhAnh'],
                'MaKM' => $sp['MaKM'],
                'ManHinh' => $sp['ManHinh'],
                'HDH' => $sp['HDH'],
                'CamSau' => $sp['CamSau'],
                'CamTruoc' => $sp['CamTruoc'],
                'CPU' => $sp['CPU'],
                'Ram' => $sp['Ram'],
                'Rom' => $sp['Rom'],
                'SDCard' => $sp['Rom'],
            ); 
            die ($spBUS->add_new($sp));
            break;
    	
    	default:
    		# code...
    		break;
    }

    function phanTich_Filters() {
        $filters = $_POST['filters'];
        $ori = "SELECT * FROM SanPham WHERE ";
        $sql = $ori;

        forEach($filters as $filter) {
            $dauBang = explode("=", $filter);
            switch ($dauBang[0]) {
                case 'search':
                    $dauBang[1] = explode("+", $dauBang[1]);
                    $dauBang[1] = join(" ", $dauBang[1]);
                    $sql .= ($sql==$ori?"":" AND ") . " TenSP LIKE '%$dauBang[1]%' ";
                    break;

                case 'price':
                    $prices = explode("-", $dauBang[1]);
                    $giaTu = (int)$prices[0];
                    $giaDen = (int)$prices[1];

                    // nếu giá đến = 0 thì cho giá đến = 100 triệu
                    if($giaDen == 0) $giaDen = 1000000000; 

                    // đưa về dạng thập phân đúng theo DB
                    // $giaTu = (float)($giaTu/1000000); 
                    // $giaDen = (float)($giaDen/1000000);

                    $sql .= ($sql==$ori?"":" AND ") . " DonGia >= $giaTu AND DonGia <= $giaDen";
                    break;

                case 'company':
                    // lấy ra id của company truyền vào
                    $tenlsp = $dauBang[1];
                    $company = (new DB_driver())->get_row("SELECT * FROM LoaiSanPham WHERE TenLSP='$tenlsp'");
                    $companyID = $company["MaLSP"];

                    $sql .= ($sql==$ori?"":" AND ") . " MaLSP='$companyID'";
                    break;

                case 'star':
                    $soSao = (int)$dauBang[1];
                    $sql .= ($sql==$ori?"":" AND ") . " SoSao >= $soSao";
                    break;

                case 'promo':
                    // lấy id khuyến mãi
                    $loaikm = $dauBang[1];
                    $khuyenmai = (new DB_driver())->get_row("SELECT * FROM KhuyenMai WHERE LoaiKM='$loaikm'");
                    $khuyenmaiID = $khuyenmai["MaKM"];
                    
                    $sql .= ($sql==$ori?"":" AND ") . " MaKM='$khuyenmaiID'";
                    break;

                case 'sort':
                    $s = explode("-", $dauBang[1]);
                    $tenThanhPhanCanSort = $s[0];
                    $typeSort = ($s[1]=="asc"?"ASC":"DESC");

                    $sql .= ($sql==$ori?" 1=1 ":""); // fix lỗi dư chữ where
                    $sql .= " ORDER BY $tenThanhPhanCanSort $typeSort";
                    break;
                
                default:
                    # code...
                    break;
            }
        }

        $result = (new DB_driver())->get_list($sql);
        die (json_encode($result));
    }
?>
