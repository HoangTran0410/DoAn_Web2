<!DOCTYPE html>
<html lang="vi">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">

	<title>Thế giới điện thoại</title>
	<link rel="shortcut icon" href="img/favicon.ico" />

	<!-- Load font awesome icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous">

	<!-- owl carousel libraries -->
	<link rel="stylesheet" href="js/owlcarousel/owl.carousel.min.css">
	<link rel="stylesheet" href="js/owlcarousel/owl.theme.default.min.css">
	<script src="js/Jquery/Jquery.min.js"></script>
	<script src="js/owlcarousel/owl.carousel.min.js"></script>

	<!-- tidio - live chat -->
	<!-- <script src="//code.tidio.co/bfiiplaaohclhqwes5xivoizqkq56guu.js"></script> -->

	<!-- our files -->
	<!-- css -->
	<link rel="stylesheet" href="FrontEnd/css/style.css">
	<link rel="stylesheet" href="FrontEnd/css/topnav.css">
	<link rel="stylesheet" href="FrontEnd/css/header.css">
	<link rel="stylesheet" href="FrontEnd/css/banner.css">
	<link rel="stylesheet" href="FrontEnd/css/taikhoan.css">
	<link rel="stylesheet" href="FrontEnd/css/trangchu.css">
	<link rel="stylesheet" href="FrontEnd/css/home_products.css">
	<link rel="stylesheet" href="FrontEnd/css/pagination_phantrang.css">
	<link rel="stylesheet" href="FrontEnd/css/footer.css">
	<!-- js -->
	<script src="data/products.js"></script>
	<script src="js/classes.js"></script>
	<script src="js/dungchung.js"></script>
	<script src="js/trangchu.js"></script>

	<?php require_once "FrontEnd/echoHTML.php"; ?>
</head>

<body>
	<?php addTopNav(); ?>

	<section>
		<?php 
			addHeader(); 
			addHome();
		?>
	</section> <!-- End Section -->

	<?php
		addContainTaiKhoan();
		addPlc();
	?>

	<div class="footer">
		<?php addFooter(); ?>
	</div>

	<i class="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()"></i>

</body>

</html>