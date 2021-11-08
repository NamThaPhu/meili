<?php
    $url='https://shopee.vn/api/v4/search/search_items?limit=30&shop_categoryids=135310300'; // tạo biến url cần lấy
    $lines_array=file($url); // dùng hàm file() lấy dữ liệu theo url
    $lines_string=implode('',$lines_array); // chuyển dữ liệu lấy được kiểu mảng thành một biến string
    echo $lines_string; // hiển thị dữ liệu