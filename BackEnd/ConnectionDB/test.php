<?php
	include_once "../BUS/BUS.php";


	$spBUS = new SanPhamBUS();
	echo "<table cellspacing='15'>";
	foreach ($spBUS->ds as $item) {
		$item->show();
	}
	echo "</table>"
?>