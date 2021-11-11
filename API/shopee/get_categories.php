<?php
    $shopid = isset($_POST['shopId']) ? $_POST['shopId'] : '406356404';
    $url='https://shopee.vn/api/v4/shop/get_categories?limit=100&offset=0&shopid='.$shopid; // tạo biến url cần lấy
    $lines_array=file($url); // dùng hàm file() lấy dữ liệu theo url
    $lines_string=implode('',$lines_array); // chuyển dữ liệu lấy được kiểu mảng thành một biến string
    echo $lines_string; // hiển thị dữ liệu