<?php
// читать json файл
$json = file_get_contents ('../goods.json');
$json = json_decode($json, true);

//письмо
$message = '';
$message .= '<h1>Order in shop</h1>';
$message .='<p>Telephone: '.$_POST['ephone'].'</p>';
$message .='<p>Email: '.$_POST['email'].'</p>';
$message .='<p>User: '.$_POST['ename'].'</p>';

$cart = $_POST['cart'];
$sum = 0;
foreach ($cart as $id=>$count) {
    $message .=$json[$id] ['name'].' --- ';
    $message .=$count.' --- ';
    $message .=$count*$json[$id]['cost'];
    $message .='<br>';
    $sum = $sum + $count*$json[$id]['cost'];
}
$message .='Total: '.$sum;
//print_r($message);

$to = 'danil.starikov10@gmail.com'.',';    // почта менеджера
$to .=$_POST['email'];                     // почта покупателя
$spectext = '<!DOCTYPE HTML><html><head><title>Order</title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";

$m = mail($to, 'Order in shop', $spectext.$message.'</body></html>', $headers);

if ($m) {echo 1;} else {echo 0;}
