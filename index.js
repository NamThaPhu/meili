const getApiCategories = (callback) => {
    fetch("API/shopee/get_categories.php")
        .then((res) => res.json())
        .then(callback)
}
function renderCategories(data) {
    var html = data.data.shop_categories.map((item) => {
        return `
        <a class="side__container__item" href="">
        <div class="side__container__item-image">
            <img src="https://cf.shopee.vn/file/${item.image}" alt="">
        </div>
        <div class="side__container__item-name">${item.display_name}</div>
        </a>
        `
    });

    document.querySelector('.side__container').innerHTML = html.join('')
    // console.log(html);
}
getApiCategories(renderCategories)

/////

const getApiProducts = (callback) => {
    fetch('API/shopee/get_products.php')
        .then((res) => res.json())
        .then(callback)
}
function renderProducts(data) {
    var html = data.items.map((item) => {
        var price_min = Number(item.item_basic.price_min) / 100000
        var price_max = Number(item.item_basic.price_max) / 100000
        var currency = item.item_basic.currency
        var price = price_min == price_max ? `${price_min} ${currency}` : `${price_min} - ${price_max} ${currency}`
        console.log(price)
        return `
        <div class="product">
            <div class="product__name">${item.item_basic.name}</div>
            <div class="product__summary">${price}</div>
            <div class="product__image">
                <img src="https://cf.shopee.vn/file/${item.item_basic.image}" alt="">
            </div>
        </div>
        `
    })

    document.querySelector('.content').innerHTML = html.join('')
}
getApiProducts(renderProducts)