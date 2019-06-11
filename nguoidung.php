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

	<!-- Jquery -->
	<script src="lib/Jquery/Jquery.min.js"></script>

	<!-- Bootstrap -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css">
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
	

	<!-- Sweet Alert -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8"></script>

	<!-- our files -->
	<!-- css -->
	<link rel="stylesheet" href="css/style.css">
	<link rel="stylesheet" href="css/topnav.css">
	<link rel="stylesheet" href="css/header.css">
	<link rel="stylesheet" href="css/taikhoan.css">
	<link rel="stylesheet" href="css/gioHang.css">
	<link rel="stylesheet" href="css/nguoidung.css">
	<link rel="stylesheet" href="css/footer.css">
	<!-- js -->
	<script src="js/dungchung.js"></script>
	<script src="js/nguoidung.js"></script>

	<?php require_once "php/echoHTML.php"; ?>
</head>

<body>
	<?php addTopNav(); ?>

	<section>
		<?php addHeader(); ?>

		<div class="infoUser"> </div>
		<div class="listDonHang"> </div>

		<div class="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
				    <div class="modal-header">
				        <h5 class="modal-title" id="exampleModalLabel" >Chi tiết đơn hàng</h5>
				        <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
				          <span aria-hidden="true">&times;</span>
				        </button>
				    </div>
				<div class="modal-body" id="chitietdonhang"></div>
				<div class="modal-footer">
		        	<button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
		        	<!-- <button type="button" class="btn btn-primary">Save changes</button> -->
		      	</div>
		    	</div>
		  	</div>
		</div>
		
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