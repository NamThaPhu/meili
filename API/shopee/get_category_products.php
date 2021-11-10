<?php
    if(isset($_POST)) {
        $shop_categoryids = $_POST['id'];
    }

    $url='https://shopee.vn/api/v4/search/search_items?by=pop&limit=100&match_id=406356404&newest=0&order=desc&page_type=shop&scenario=PAGE_OTHERS&shop_categoryids='. $shop_categoryids .'&version=2'; // tạo biến url cần lấy
    $lines_array=file($url); // dùng hàm file() lấy dữ liệu theo url
    $lines_string=implode('',$lines_array); // chuyển dữ liệu lấy được kiểu mảng thành một biến string
    echo $lines_string; // hiển thị dữ liệu