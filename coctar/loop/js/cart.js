var cart = {};


function loadCart() {
    //проверка есть ли в localStorage запись cart
    if (localStorage.getItem('cart')){
        //если есть - расшифровывается и заптсывается в пепеменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
            showCart();
        }      
    else {
        $('.main-cart').html('Cart is empty!');
    }
}



function showCart() {
    //вывод корзины
    if (!isEmpty(cart)) {
        $('.main-cart').html('Cart is empty!');
    }
    else {
        $.getJSON('goods.json', function (data) {
            var goods = data;
            var out = '';
            for (var id in cart) {
                out +=`<button data-id="${id}" class="del-goods">x</button>`;
                out += `<img src="img\\${goods[id].img}" alt="" class="jpg">`;
                out +=`  ${goods[id].name}  `;
                out +=`  <button data-id="${id}" class="minus-goods">-</button>  `;
                out +=`  ${cart[id]}  `;
                out +=`  <button data-id="${id}" class="plus-goods">+</button>  `;
                out +=cart[id]*goods[id].cost;
                out +=`<br>`;
            }
            $('.main-cart').html(out);
            $('.del-goods').on('click', delGoods);
            $('.plus-goods').on('click', plusGoods);
            $('.minus-goods').on('click', minusGoods);
        });
    }
}


function delGoods() {
    //удаление товара из корзины
    var id = $(this).attr('data-id');
    delete cart[id];
    saveCart();
    showCart();
}


function plusGoods() {
    //добавление товара в корзину
    var id = $(this).attr('data-id');
    cart[id]++;
    saveCart();
    showCart();
}


function minusGoods() {
    //удаление товара из корзины
    var id = $(this).attr('data-id');
    if (cart[id]==1) {
        delete cart[id];
    }
    else {
        cart[id]--;
    }
    saveCart();
    showCart();
}


function saveCart() {
    //сохранить корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}


function isEmpty(object) {
    //проверка корзины на пустоту
    for (var key in object)
    if(object.hasOwnProperty(key)) return true;
    return false;
}


function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data) {
                    if (data==1) {
                        alert('The order has been sent')
                    }
                    else {
                        alert('Repeat order')
                    }
                }
            );
        }
        else {
            alert('Empty cart');
        }
    }
    else {
        alert('Fill in the fields');
    }
}


$(document).ready(function (){
    loadCart();
    $('.send-email').on('click', sendEmail);  //отправить письмо с заказом
});