<?php
require_once('DB_classes.php');

$sanpham = new SanPham();

echo "<table cellspacing='15'>";
foreach ($sanpham->select_all() as $key => $sanpham) {
    echo "<tr>";
    foreach ($sanpham as $key => $chitiet) {
        echo "<td>" . $chitiet . "</td>";
    }
    echo "</tr>";
}
echo "</table>";