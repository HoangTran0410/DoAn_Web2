<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Giới thiệu - Thế giới điện thoại</title>
  <link rel="shortcut icon" href="img/favicon.ico" />

  <!-- Load font awesome icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    crossorigin="anonymous">

  <!-- our files -->
  <!-- css -->
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/topnav.css">
  <link rel="stylesheet" href="css/header.css">
  <link rel="stylesheet" href="css/taikhoan.css">
  <link rel="stylesheet" href="css/footer.css">
  <link rel="stylesheet" href="css/gioithieu.css">

  <!-- js -->
  <script src="data/products.js"></script>
  <script src="js/dungchung.js"></script>

  <?php require_once "php/echoHTML.php"; ?>

</head>

<body>
  <?php addTopNav(); ?>

  <section style="min-height: 85vh">
    <?php addHeader(); ?>

    <div class="page-gt">
      <h4 class="page-header">
        Giới thiệu
      </h4>
      <div class="page-info">
        <img src="https://cdn.tgdd.vn/Files/2019/12/23/1228025/z6_800x450-600x400.jpg">

        <ol class="gradient-list">
          <li>Thời gian phục vụ khách hàng là từ 08h00 sáng đến 21h30 tất cả các ngày trong tuần và 24/7</li>
          <li>Chúng tôi cam kết luôn luôn ưu tiên lợi ích của khách hàng, sản phẩm chất lượng luôn được cập nhật phù hợp
            với nhu cầu của tất cả khách hàng.</li>
          <li>Tất cả các sản phẩm SMARTPHONE là thế mạnh chính và cung cấp ra thị trường được đảm bảo 100% nguyên hộp,
            trùng IMEI với phụ kiện nguyên SEAL. Đây là điều rất ít cửa hàng bán lẻ nào có thể làm được ở VN theo cách
            duy
            trì.</li>
          <li>Chúng tôi là cửa hàng uy tín đã được khảng định với tất cả các khách hàng. Cám ơn tất cả các khách hàng đã
            mua và ủng hộ chúng tôi trong suốt thời gian qua. </li>
        </ol>
      </div>
    </div>

    <!-- <div class="page-gt">
      <h4 class="page-header">
        Giới thiệu
      </h4>
      <div class="page-info">
        <p>Được thành lập từ năm 1996, chúng tôi là một trong những nhà phân phối ĐTDĐ đầu tiên tại Hà Nội và
          kể từ năm 2000, chúng tôi chính thức trở thành nhà phân phối ĐTDĐ SamSung – Masterdealer duy nhất
          tại 194 đường Lê Duẩn.
        </p>
        <br />
        <p>
          Với bề dày gần 10 năm kinh nghiệm và uy tín đã tạo được trong những năm vừa qua, chúng tôi luôn đem
          lại cho khách hàng sự hài lòng và thỏa mãn với tất cả các sản phẩm của mình.<br />
          Bên cạnh đó là đội ngũ nhân viên nhiệt tình chu đáo và đầy kinh nghiệm của chúng tôi luôn đưa được
          ra cho khách hàng những thông tin có giá trị và giúp khách hàng lựa chọn được những sản phẩm phù
          hợp nhất.<br />
          Để nâng cao thương hiệu của mình, mục tiêu của chúng tôi trong thời gian tới là cung cấp đến tận
          tay khách hàng những sản phẩm chính hãng với chất lượng đảm bảo và uy tín cũng như giá cả hợp lý
          nhất.<br />
          Chúng tôi mong muốn sự đóng góp của khách hàng sẽ giúp chúng tôi ngày một phát triển để từ đó củng
          cố thêm lòng tin của khách hàng với chúng tôi. Chúng tôi rất biết ơn sự tin tưởng của khách hàng
          trong suốt gần 10 năm qua và chúng tôi luôn tâm niệm rằng cần phải cố gắng hơn nữa để xứng đáng với
          phương châm đề ra “Nếu những gì chúng tôi không có, nghĩa là bạn không cần .<br />
          Chúng tôi xin chân thành cảm ơn tất cả các khách hàng đã, đang và sẽ ủng hộ chúng tôi.
        </p>
      </div>
    </div> -->
  </section>

  <?php addContainTaiKhoan(); ?>

  <div class="footer">
    <?php addPlc(); addFooter(); ?>

  </div>

  <i class="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()"></i>
</body>

</html>