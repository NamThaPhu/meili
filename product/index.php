<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product</title>
    <link rel="shortcut icon" href="../icon/favicon (1).ico" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css">
    <link rel="stylesheet" href="../product/index.css">
</head>

<body>
    <div class="app">
        <div class="header">Header</div>
        <div class="product">
            <div class="product__image">
                <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <!--  -->
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="product__main">
                <!--  -->
            </div>
            <div class="product__attribute">
                <!--  -->
            </div>
            <div class="product__description">
                <!-- Description -->
            </div>
        </div>
        <div class="footer">Footer</div>
    </div>
</body>
<script>
    // Lấy API thông tin một sản phẩm
    const getApiProduct = (callback, formData) => {
        const options = {
            method: 'GET',
            // body: formData
        }
        const params = {
            "shopId": formData.get('shopId'),
            "itemId": formData.get('itemId')
        }
        const url = "../API/shopee/get_product.php?" + (new URLSearchParams(params)).toString()
        fetch(url, options)
            .then((res) => res.json())
            .then(callback)
    }

    // Hiển thị thông tin một sản phẩm
    const renderProduct = (data) => {
        const renderImage = (data) => {
            const active = `
                <div class="carousel-item active">
                    <img src="https://cf.shopee.vn/file/${data.image}" class="d-block w-100" alt="...">
                </div>
                `
            const images = data.images.map(item => {
                return `
                <div class="carousel-item">
                    <img src="https://cf.shopee.vn/file/${item}" class="d-block w-100" alt="...">
                </div>
                `
            })
            const videos = data.video_info_list == null ? '' : data.video_info_list.map(item => {
                return `
                    <div class="carousel-item">
                        <video class="d-block w-100" controls>
                            <source src="${item.default_format.url}" type="video/${item.default_format.profile}"></source>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    `
            })
            document.querySelector('.carousel-inner').innerHTML = active + (videos != '' ? videos.join('') : videos) + images.join('')
        }
        renderImage(data.data)

        const renderMain = (data) => {
            var price_min = Number(data.price_min) / 100000
            var price_max = Number(data.price_max) / 100000
            var currency = data.currency
            var price = price_min == price_max ? `${price_min}` : `${price_min} - ${price_max}`
            const html = `
                <div class="product__main--name">${data.name}</div>
                <div class="product__main--price">${price}</div>
                <div class="product__main--stock">${data.stock}</div>
                `
            document.querySelector('.product__main').innerHTML = html
        }
        renderMain(data.data)

        const renderAttribute = (data) => {
            const html = data.map(item => {
                return `
                    <div class="product__attribute--item">
                        <div class="product__attribute--item--name">${item.name}</div>
                        <div class="product__attribute--item--value">${item.value}</div>
                    </div>
                    `
            })
            document.querySelector('.product__attribute').innerHTML = html.join('')
        }
        renderAttribute(data.data.attributes)

        const renderDescription = (data) => {
            document.querySelector('.product__description').innerText = data.description
        }
        renderDescription(data.data)
    }

    // Lấy thông tin một sản phẩm
    function handleGetProduct(itemId, shopId) {
        var formData = new FormData()
        formData.append('shopId', shopId)
        formData.append('itemId', itemId)
        getApiProduct(renderProduct, formData)
    }
    <?php
    $itemid = $_GET['itemId'];
    $shopid = $_GET['shopId'];
    echo 'handleGetProduct("' . $itemid . '", "' . $shopid . '")';
    ?>
</script>

</html>