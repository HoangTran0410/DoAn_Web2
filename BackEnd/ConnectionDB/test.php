<?php
require_once('DB_classes.php');

$sanphamBUS = new SanPhamBUS();
$nguoidungBUS = new NguoiDungBUS();

// $nguoidungBUS->add_new(array('ND3', 'Tran Thi Thu Hien', 'Nu', '1999-09-14', 'thuhien@gmail.com', '0936597487', 'Q12, TP HCM', '0'));
// $nguoidungBUS->delete_by_id('ND3');

echo "<table cellspacing='15'>";
foreach ($nguoidungBUS->select_all() as $key => $row) {
    echo "<tr>";
    foreach ($row as $key => $col) {
        echo "<td>" . $col . "</td>";
    }
    echo "</tr>";
}
echo "</table>";
