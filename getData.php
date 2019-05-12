<!-- =============== Phần lấy dữ liệu từ DB ===================== -->
<?php
    // Lấy dữ liệu từ DATABASE đổ vào mảng dssp
    require_once('BackEnd/ConnectionDB/DB_classes.php');
    $dssp = (new SanPhamBUS())->select_all();
?>
<script type="text/javascript">
    // Đổ dữ liệu từ $dssp vào biến của javascript, dạng JSON
    list_products = JSON.parse(`<?php echo json_encode($dssp) ?>`);
</script>
<!-- ================ Kết thúc lấy dữ liệu ======================= -->