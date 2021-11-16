<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Administrator</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="reset.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <script src="../index.js"></script>
    <link rel="stylesheet" href="../laptop.css">
    <link rel="stylesheet" href="../index.css">
</head>

<body>
    <div class="container vh-100 d-flex flex-column justify-content-center align-items-center">
        <form name="shopidget" class="col-12 col-sm-6 col-md-4 my-2 mx-2">
            <div class="form-floating mb-3">
                <input class="form-control" type="number" placeholder="Enter id of shopee store" id="shopid" name="shopId" required>
                <label for="shopid">Shop ID</label>
            </div>
            <button type="button" class="form-control btn btn-outline-primary mb-2" onclick="getShopId()">Submit</button>
            <button type="button" class="form-control btn btn-outline-warning mb-2" onclick="resetShopId()">Reset Setting</button>
            <a class="form-control btn btn-outline-danger mb-3" href="../home/">
                Back to Home
            </a>
            <button type="button" class="form-control btn btn-outline-secondary" onclick="alert('Sau khi gửi Shop ID (là ID của cửa hàng trên shopee của bạn), Website sẽ kết xuất dữ liệu từ cửa hàng shopee về tại Website.\n\nNếu bạn gặp lỗi về Shop ID sau khi gửi, vui lòng thiết lập lại cài đặt để trở về Website với Shop ID mặc định.')">Help</button>
        </form>
    </div>
</body>

</html>