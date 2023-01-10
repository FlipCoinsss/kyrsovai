function init() {
    //считываем файл goods.json
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
    var later = {};
    if (localStorage.getItem('later')){
        //если есть - расшифровывается и заптсывается в переменную cart
        later = JSON.parse(localStorage.getItem('later'));
        for (var key in later) {
            out +='<div class="cart">';
            out +=`<p class="name">${data[key].name}</p>`;
            out +=`<img src="img/${data[key].img}" alt="" class="jpg">`;
            out +=`<div class="cost">${data[key].cost}</div>`;
            out +=`<a class="view" href="goods.html#${key}">View</a>`;
            out +='</div>';
        }
        $('.goods-out').html(out);
    }
    else {
        $('.goods-out').html('Add a product!');
    }

}


$(document).ready(function () {
    init();
});