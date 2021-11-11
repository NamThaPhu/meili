<?php
    $shopid = isset($_POST['shopId']) ? $_POST['shopId'] : '406356404';
    $shop_categoryids = isset($_POST['categoryId']) ? $_POST['categoryId'] : '';
    $order = isset($_POST['order']) ? $_POST['order'] : 'asc';
    $newest = '0'; // <= 100
    $limit = '40'; // <=100
    $sortby = isset($_POST['sortby']) ? $_POST['sortby'] : 'pop'; //
    $url='https://shopee.vn/api/v4/search/search_items?by='.$sortby.'&limit='.$limit.'&match_id='.$shopid.'&newest='.$newest.'&order='.$order.'&page_type=shop&scenario=PAGE_OTHERS&shop_categoryids='.$shop_categoryids.'&version=2'; // tạo biến url cần lấy
    // $url='https://shopee.vn/api/v4/search/search_items?by=pop&limit=40&match_id=406356404&newest=0&order=desc&page_type=shop&scenario=PAGE_OTHERS&shop_categoryids='.$shop_categoryids.'&version=2'; // tạo biến url cần lấy
    $lines_array=file($url); // dùng hàm file() lấy dữ liệu theo url
    $lines_string=implode('',$lines_array); // chuyển dữ liệu lấy được kiểu mảng thành một biến string
    echo $lines_string; // hiển thị dữ liệu