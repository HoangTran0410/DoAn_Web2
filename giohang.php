<!DOCTYPE html>
<html lang="vi">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link rel="shortcut icon" href="img/favicon.ico" />

	<title>Thế giới điện thoại</title>

	<!-- Load font awesome icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous">

	<!-- Sweet Alert -->
	<script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

	<!-- our files -->
	<!-- css -->
	<link rel="stylesheet" href="FrontEnd/css/style.css">
	<link rel="stylesheet" href="FrontEnd/css/topnav.css">
	<link rel="stylesheet" href="FrontEnd/css/header.css">
	<link rel="stylesheet" href="FrontEnd/css/taikhoan.css">
	<link rel="stylesheet" href="FrontEnd/css/gioHang.css">
	<link rel="stylesheet" href="FrontEnd/css/footer.css">
	<!-- js -->
	<script src="data/products.js"></script>
	<script src="js/classes.js"></script>
	<script src="js/dungchung.js"></script>
	<script src="js/giohang.js"></script>

	<?php require_once "FrontEnd/echoHTML.php"; ?>

</head>

<body>
	<?php addTopNav(); ?>

	<section style="min-height: 85vh">
		<?php addHeader(); ?>

		<table class="listSanPham"> </table>

	</section> <!-- End Section -->

	<?php addContainTaiKhoan(); ?>

	<div class="footer">
		<?php addFooter(); ?>
	</div>

	<i class="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()"></i>
</body>

</html>