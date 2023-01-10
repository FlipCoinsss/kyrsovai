var cart = {}; ///корзина

function init() {
    //считываем файл goods.json
    //$.getJSON("goods.json", goodsOut);
    var hash = window.location.hash.substring(1);
    console.log(hash);
    $.post (
        "admin/core.php",
        {
            "action" : "loadSingleGoods",
            "id" : hash
        },
        goodsOut
    );

}

function goodsOut(data){
    //ВЫВОД ТОВАРА НА ГЛАВНУЮ СТРАНИЦУ
    if (data!=0){
        data = JSON.parse(data);
        console.log(data);
        var out='';
            out +='<div class="cart">';
            out +=`<button class="later" data-id="${data.id}">&hearts;</button>`;
            out +=`<p class="name">${data.name}</p>`;
            out +=`<img src="img/${data.img}" alt="" class="jpg">`;
            out +=`<div class="cost">${data.cost}</div>`;
            out +=`<div class="descr">${data.description}</div>`;
            out +=`<button class="put" data-id="${data.id}">Buy</button>`;
            out +='</div>';
        $('.goods-out').html(out);
        $('.put').on('click', addToCart);
        $('.later').on('click', addToLater);
    }
    else {
        $('.goods-out').html('This product does not exist!');
    }
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