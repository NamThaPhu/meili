<?php
    $shopid = $_GET['shopId'];
    $itemid = $_GET['itemId'];
    $url='https://shopee.vn/api/v4/item/get?itemid='.$itemid.'&shopid='.$shopid;
    $lines_array=file($url); // dùng hàm file() lấy dữ liệu theo url
    $lines_string=implode('',$lines_array); // chuyển dữ liệu lấy được kiểu mảng thành một biến string
    echo $lines_string; // hiển thị dữ liệu