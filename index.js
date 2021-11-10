b// Lấy nhiều danh mục
const getApiCategories = (callback) => {
    fetch("API/shopee/get_categories.php")
        .then((res) => res.json())
        .then(callback)
}
function renderCategories(data) {
    var html = data.data.shop_categories.map((item) => {
        return `
        <input style="display: none;" id="checkedCategory${item.shop_category_id}" name="checkCategory" type="radio" class="side__checked">
        <label for="checkedCategory${item.shop_category_id}" class="side__container__item" id="${item.shop_category_id}" onclick="getCategoryId(${item.shop_category_id})">
            <div class="side__container__item-image">
                <img src="https://cf.shopee.vn/file/${item.image}" alt="">
            </div>
            <div class="side__container__item-name">${item.display_name}</div>
        </label>
        `
    });

    document.querySelector('.side__container').innerHTML = html.join('')
}
getApiCategories(renderCategories)

// Lấy nhiều sản phẩm từ nhiều danh mục
const getApiCategoriesProducts = (callback) => {
    fetch('API/shopee/get_categories_products.php')
        .then((res) => res.json())
        .then(callback)
}
function renderProducts(data) {
    var html = data.items.map((item) => {
        var price_min = Number(item.item_basic.price_min) / 100000
        var price_max = Number(item.item_basic.price_max) / 100000
        var currency = item.item_basic.currency
        var price = price_min == price_max ? `${price_min}` : `${price_min} - ${price_max}`
        return `
        <div class="product">
            <div class="product__image">
                <img src="https://cf.shopee.vn/file/${item.item_basic.image}" alt="">
            </div>
            <div class="group-1">
            <div class="product__name"><p>${item.item_basic.name}</p></div>
            <div class="group-2">
                <div class="product__price">${price} <sup style="font-size: 0.5em;">${currency}</sup></div>
                <button class="product__view" type="button">Visit to Shopee</button>
            </div>
            </div>
        </div>
        `
    })

    document.querySelector('.content').innerHTML = html.join('')
}
getApiCategoriesProducts(renderProducts)

// Lấy nhiều sản phẩm từ một danh mục
const getApiCategoryProducts = (callback, id) => {
    var formData = new FormData()
    formData.append('id', id)
    const options = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoding' },
        body: formData
    }
    fetch('API/shopee/get_category_products.php', options)
        .then(response => response.json())
        .then(callback)
}

////////////////////////////////
function getCategoryId(id) {
    getApiCategoryProducts(renderProducts, id)
}

// Lấy thông tin shop
const getShop = (callback) => {
    fetch('API/shopee/get_shop.php')
        .then((res) => res.json())
        .then(callback)
}
function renderShop(data) {
    var footer = data.data.description
    document.querySelector('.footer__item').innerText = footer
    var header = `
        <sup class="shopee-icon"><a href="https://shopee.vn/${data.data.account.username}">Shopee</a></sup>
        <a class="nameshop" href="https://shopee.vn/${data.data.account.username}" title="Ghé thăm cửa hàng shopee">${data.data.name}</a>
        <div class="account">
            <div class="account__image">
                <img src="https://cf.shopee.vn/file/${data.data.account.portrait}">
            </div>
            <div class="account__username">${data.data.account.username}</div>
        </div>
    `
    document.querySelector('.main-head').innerHTML = header

}
getShop(renderShop)

// Lấy ảnh slider
const getSlider = (callback) => {
    fetch('API/shopee/get_slider.php')
        .then((res) => res.json())
        .then(callback)
}
function renderSlider(data) {
    var html1 = `
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
    `
    var html2 = data.data.template.decoration[1].data.banners.map((item, index) => {
        return `
            <button
                type="button"
                data-bs-target="#carouselExampleFade"
                data-bs-slide-to="${index}"
                class="${index == 0 ? 'active' : ''}"
                aria-current="${index == 0 ? 'true' : 'false'}"
                aria-label="Slide ${index + 1}"
            >
            </button>
    `
    })
    var html3 = `
        </div>
        <div class="carousel-inner">
    `
    var html4 = data.data.template.decoration[1].data.banners.map((item, index) => {
        return `
            <div class="carousel-item ${index == 0 ? 'active' : ''}" data-bs-interval="3000">
              <img src="https://cf.shopee.vn/file/${item.banner_image}" class="d-block w-100" alt="...">
            </div>
        `
    })
    var html5 = `
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
        </button>
    </div>
    `
    document.querySelector('.slider').innerHTML = html1 + html2.join('') + html3 + html4.join('') + html5
}
getSlider(renderSlider)