<!DOCTYPE html>
<html lang="vi">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Tin tức - Thế giới điện thoại</title>
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
  <link rel="stylesheet" href="css/tintuc.css">

  <!-- js -->
  <script src="data/products.js"></script>
  <script src="js/dungchung.js"></script>

  <?php require_once "php/echoHTML.php"; ?>

</head>

<body>
  <?php addTopNav(); ?>

  <section style="min-height: 85vh">
    <?php addHeader(); ?>

    <div class="body-tintuc">

      <script>
        let tintuc = [{
          title: 'Đánh giá smartphone chip S660, RAM 8 GB, giá 6,99 triệu tại Việt Nam',
          a: "http://doanhnghiepvn.vn/cong-nghe/danh-gia-smartphone-chip-s660-ram-8-gb-gia-6-99-trieu-tai-viet-nam/2018112603315443",
          img: "img/tintuc/tintuc1.png",
          source: "Doanh ngiệp",
          time: "3 giờ"
        }, {
          title: 'Khám phá smartphone màn hình gập được đầu tiên của Samsung',
          a: "https://thanhnien.vn/cong-nghe/kham-pha-smartphone-man-hinh-gap-duoc-dau-tien-cua-samsung-1027111.html",
          img: "img/tintuc/tintuc2.png",
          source: "Thanh niên",
          time: "6 giờ"
        }, {
          title: 'Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X',
          a: "https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov",
          img: "img/tintuc/tintuc3.png",
          source: "VOV",
          time: "6 giờ"
        }, {
          title: 'Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera',
          a: "http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html",
          img: "img/tintuc/tintuc4.png",
          source: "VietQ",
          time: "13 giờ"
        }, {
          title: 'Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018',
          a: "https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
          img: "img/tintuc/tintuc5.png",
          source: "Zing",
          time: "9 giờ"
        }, {
          title: 'Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X',
          a: "https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov",
          img: "img/tintuc/tintuc3.png",
          source: "VOV",
          time: "6 giờ"
        }, {
          title: 'Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera',
          a: "http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html",
          img: "img/tintuc/tintuc4.png",
          source: "VietQ",
          time: "13 giờ"
        }, {
          title: 'Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018',
          a: "https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
          img: "img/tintuc/tintuc5.png",
          source: "Zing",
          time: "9 giờ"
        }, {
          title: 'Doanh số iPhone XS và iPhone XR thảm hại, Apple sản xuất lại iPhone X',
          a: "https://vov.vn/cong-nghe/doanh-so-iphone-xs-va-iphone-xr-tham-hai-apple-san-xuat-lai-iphone-x-843717.vov",
          img: "img/tintuc/tintuc3.png",
          source: "VOV",
          time: "6 giờ"
        }, {
          title: 'Chiếc điện thoại thông minh này của LG sẽ có tới 16 Camera',
          a: "http://vietq.vn/chiec-dien-thoai-thong-minh-nay-cua-lg-se-co-toi-16-camera-d151674.html",
          img: "img/tintuc/tintuc4.png",
          source: "VietQ",
          time: "13 giờ"
        }, {
          title: 'Những tiêu chí bạn không nên bỏ qua khi mua smartphone 2018',
          a: "https://news.zing.vn/nhung-tieu-chi-ban-khong-nen-bo-qua-khi-mua-smartphone-2018-post894509.html",
          img: "img/tintuc/tintuc5.png",
          source: "Zing",
          time: "9 giờ"
        }, ]

        for (let t of tintuc) {
          document.write(`
          <div class="card">
            <img src="${t.img}" alt="Avatar" style="width:100%">
            <div class="container">
              <h4><a href="${t.a}" target="_blank">${t.title}</></h4> 
              <p>${t.source} &emsp;${t.time}</p> 
            </div>
          </div>
          `)
        }
      </script>

    </div>

  </section>

  <?php addContainTaiKhoan(); ?>

  <div class="footer">
    <?php addPlc(); addFooter(); ?>

  </div>

  <i class="fa fa-arrow-up" id="goto-top-page" onclick="gotoTop()"></i>

</body>

</html>