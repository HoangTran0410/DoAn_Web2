<?php
require_once('DB_classes.php');

// $nguoidungBUS->add_new(array('ND3', 'Tran Thi Thu Hien', 'Nu', '1999-09-14', 'thuhien@gmail.com', '0936597487', 'Q12, TP HCM', '0'));
// $nguoidungBUS->delete_by_id('ND3');


show_DataBUS_as_Table(new SanPhamBUS());
