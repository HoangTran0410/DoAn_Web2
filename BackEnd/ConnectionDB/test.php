<?php
include_once "../BUS/BUS.php";

$spBUS = new SanPhamBUS();

// $spBUS->add(new SanPham("spTest2", "LSP2", "SanPhamTest", 100, 54, "/abc/bca", 1));
// $spBUS->delete("");

$sp = $spBUS->get("SP1");
if($sp) $sp->show();
else echo "khong tim thay";

echo "<table cellspacing='15'>";
foreach ($spBUS->ds as $item) {
	$item->show();
}
echo "</table>";
