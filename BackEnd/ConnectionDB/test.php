<?php
	include_once "../QuanLySanPham/SanPhamBUS.php";
	$spBUS = new SanPhamBUS();

	echo "<table cellspacing='15'>";
	foreach ($spBUS->dssp as $item) {
		$item->show();
	}
	echo "</table>"
?>