var cart = {}; ///корзина

function init() {
    //считываем файл goods.json
    //$.getJSON("goods.json", goodsOut);
    $.post (
        "admin/core.php",
        {
            "action" : "loadGoods"
        },
        goodsOut
    );

}

function goodsOut(data){
    //ВЫВОД ТОВАРА НА ГЛАВНУЮ СТРАНИЦУ
    data = JSON.parse(data);
    console.log(data);
    var out='';
    for (var key in data) {
        out +='<div class="cart">';
        out +=`<button class="later" data-id="${key}">&hearts;</button>`;
        out +=`<p class="name"><a href="goods.html#${key}">${data[key].name}</a></p>`;
        out +=`<img src="img/${data[key].img}" alt="" class="jpg">`;
        out +=`<div class="cost">${data[key].cost}</div>`;
        out +=`<button class="put" data-id="${key}">Buy</button>`;
        out +='</div>';
    }
    $('.goods-out').html(out);
    $('.put').on('click', addToCart);
    $('.later').on('click', addToLater);
}

function addToLater() {
    // список желаний
    var later = {};
    if (localStorage.getItem('later')){
        //если есть - расшифровывается и заптсывается в переменную cart
        later = JSON.parse(localStorage.getItem('later'));
    }
    alert('Added to wishlist');
    var id = $(this).attr('data-id');
    later[id] = 1;
    localStorage.setItem('later', JSON.stringify(later));
}

function addToCart() {
    //добавление товара в корзину
    var id = $(this).attr('data-id');
    //console.log(id);
    if (cart[id]==undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличивает на 1
    }
    showMiniCart();
    saveCart();
}


function saveCart() {
    //сохранить корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}


function showMiniCart() {
    //показываю мини-корзину
    var out="";
    for (var key in cart) {
        out += key +' --- '+ cart[key]+'<br>';
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    //проверка есть ли в localStorage запись cart
    if (localStorage.getItem('cart')){
        //если есть - расшифровывается и заптсывается в пепеменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}


$(document).ready(function () {
    init();
    loadCart();
});