<!DOCTYPE html>
<html lang="vi">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thế giới điện thoại</title>
    <link rel="shortcut icon" href="img/favicon.ico" />

    <!-- Load font awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" crossorigin="anonymous">

    <!-- owl carousel libraries cho hình nhỏ -->
    <link rel="stylesheet" href="js/owlcarousel/owl.carousel.min.css">
    <link rel="stylesheet" href="js/owlcarousel/owl.theme.default.min.css">
    <script src="js/Jquery/Jquery.min.js"></script>
    <script src="js/owlcarousel/owl.carousel.min.js"></script>

    <!-- our files -->
    <!-- css -->
    <link rel="stylesheet" href="FrontEnd/css/style.css">
    <link rel="stylesheet" href="FrontEnd/css/topnav.css">
    <link rel="stylesheet" href="FrontEnd/css/header.css">
    <link rel="stylesheet" href="FrontEnd/css/taikhoan.css">
    <link rel="stylesheet" href="FrontEnd/css/chitietsanpham.css">
    <link rel="stylesheet" href="FrontEnd/css/footer.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <!-- js -->
    <script src="data/products.js"></script>
    <script src="js/classes.js"></script>
    <script src="js/dungchung.js"></script>
    <script src="js/chitietsanpham.js"></script>

    <?php require_once "FrontEnd/echoHTML.php"; ?>
</head>

<body>

    <?php addTopNav(); ?>

    <section>
        <?php 
            addHeader(); 
            addChiTietSanPham();
        ?>
    </section>

    <?php addContainTaiKhoan(); ?>

    <div class="footer">
        <?php addFooter(); ?>
    </div>

    <i class="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()"></i>

</body>

</html>