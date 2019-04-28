<?php
	// include "ConnectionDB.php";
	// $a = new ConnectionDB();
	// $s = $a->sqlQuery("select * from hoadon");
	// while ($row = mysqli_fetch_array($s))
	// {
	// 	echo "<br>";
	// 	for ($i = 0; $i < mysqli_num_fields($s); $i++)
	// 	{
	// 		echo $row[$i]." ";
	// 	}
	// }
	// $m = $a->sqlUpdate("delete from hoadon where mahd = 'sdgsdgsgs'");
	// if ($m == false)
	// {
	// 	echo "sdfgssg";
	// }

	include_once "../QuanLySanPham/SanPhamDAO.php";
	$spDao = new SanPhamDAO();
	$result = $spDao->readDB();

	foreach ($result as $item) {
		$item->show();
	}

	// good :v ý tui là vậy nè :v tui hiểu ý của ông, lúc đầu tui cũng nghĩ là cái result là cái mảng ấy, yep, để mảng dễ chơi hơn :v, để suy nghĩ làm xong cái BUS  ,rồi push lên, r chia ra 1 đứa vài bảng làm cho nhanh
?>