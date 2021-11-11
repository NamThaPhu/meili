// Lấy nhiều danh mục
const getApiCategories = (callback, formData) => {
    console.log(formData.get('shopId'))
    const options = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoding' },
        body: formData
    }
    fetch("API/shopee/get_categories.php", options)
        .then((res) => res.json())
        .then(callback)
}
function renderCategories(data) {
    var html = data.data.shop_categories.map((item) => {
        return `
        <input
            style="display: none;"
            id="checkedCategory${item.shop_category_id}"
            name="categoryId"
            type="radio"
            class="sidebar__content--input"
            value=${item.shop_category_id}
        >
        <label
            for="checkedCategory${item.shop_category_id}"
            class="sidebar__content--item"
            onclick="handleGetCategoryProducts(${item.shop_category_id})"
        >
            <img class="sidebar__content--item--image" src="https://cf.shopee.vn/file/${item.image}" alt="">
            <div class="sidebar__content--item--name">${item.display_name}</div>
        </label>
        `
    });

    document.querySelector('.sidebar__content').innerHTML = html.join('')
}

getApiCategories(renderCategories, new FormData())

// Lấy nhiều sản phẩm từ một danh mục
const getApiCategoryProducts = (callback, formData) => {
    const options = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoding' },
        body: formData
    }
    fetch('API/shopee/get_category_products.php', options)
        .then(response => response.json())
        .then(callback)
}

function renderProducts(data) {
    var html = data.items.map((item) => {
        var price_min = Number(item.item_basic.price_min) / 100000
        var price_max = Number(item.item_basic.price_max) / 100000
        var currency = item.item_basic.currency
        var price = price_min == price_max ? `${price_min}` : `${price_min} - ${price_max}`
        return `
        <div class="main__product">
            <img class="main__product--image" src="https://cf.shopee.vn/file/${item.item_basic.image}" alt="">
            <div class="main__product--name">
                ${item.item_basic.name}
            </div>
            <div class="main__product--price">
                ${price}
                <sup style="font-size: 0.5em;">${currency}</sup>
            </div>
            <div class="main__product--controller">
                <button class="main__product--controller--view" type="button">View</button>
            </div>
        </div>
        `
    })

    document.querySelector('.main').innerHTML = html.join('')
}

getApiCategoryProducts(renderProducts, new FormData())

function handleGetCategoryProducts(categoryId) {
    const formElement1 = document.querySelector('form[name="categoryselected"]')
    var formData1 = new FormData(formElement1)
    if (formData1.get('categoryId') == null) {
        formData1.set('categoryId', categoryId)
    }
    const formElement2 = document.querySelector('form[name="sortby"]')
    var formData2 = new FormData(formElement2)
    var formData = new FormData()
    for (var pair of formData1.entries()) {
        formData.append(pair[0], pair[1])
    }
    for (var pair of formData2.entries()) {
        formData.append(pair[0], pair[1])
    }
    // for (var value of formData.values()) {
    //     console.log(value);
    // }
    getApiCategoryProducts(renderProducts, formData)
}

// Lấy thông tin shop
const getApiShop = (callback, formData) => {
    var options = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoding' },
        body: formData
    }
    fetch('API/shopee/get_shop.php', options)
        .then((res) => res.json())
        .then(callback)
}
function renderShop(data) {
    var footer = data.data.description
    document.querySelector('.footer__item').innerText = footer
    var header__shop = `
        <div class="header__shop--icon-shopee">
            <a href="https://shopee.vn/${data.data.account.username}">
                Shopee
            </a>
        </div>
        <a class="header__shop--name" href="https://shopee.vn/${data.data.account.username}" title="Ghé thăm cửa hàng shopee">
            ${data.data.name}
        </a>
        <div class="header__shop--account">
            <img class="header__shop--account--image" src="https://cf.shopee.vn/file/${data.data.account.portrait}">
            <div class="header__shop--account--name">
                ${data.data.account.username}
            </div>
        </div>
    `
    document.querySelector('.header__shop').innerHTML = header__shop

}
getApiShop(renderShop, new FormData())

// Lấy ảnh slider
const getApiSlider = (callback, formData) => {
    var options = {
        method: 'POST',
        // headers: { 'Content-Type': 'application/x-www-form-urlencoding' },
        body: formData
    }
    fetch('API/shopee/get_slider.php', options)
        .then((res) => res.json())
        .then(callback)
}
function renderSlider(data) {
    var index = 10
    for (var i = 0; i < data.data.template.decoration.length; i++) {
        if (data.data.template.decoration[i].type == 1) {
            index = i
        }
    }
    var html1 = `
    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <div class="carousel-indicators">
    `
    var html2 = data.data.template.decoration[index].data.banners.map((item, index) => {
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
    var html4 = data.data.template.decoration[index].data.banners.map((item, index) => {
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
getApiSlider(renderSlider, new FormData())

// Hiển thị một shopee store từ shopid

function getShopId() {
    var formElement = document.querySelector('form[name="shopidget"]')
    var formData = new FormData(formElement)
    getApiSlider(renderSlider, formData)
    getApiCategories(renderCategories, formData)
    getApiShop(renderShop, formData)
    getApiCategoryProducts(renderProducts, formData)
}