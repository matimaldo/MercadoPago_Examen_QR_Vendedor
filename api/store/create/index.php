<?php

// Crea una store

header('Content-type: application/json');

include_once '../../global/functions.php';
global $access_token, $collector_id, $integrator_id_test, $country_id;

 // REVISA AQUÍ:
 // Qué método y endpoint de la API de Mercado Pago deberías poner aquí para poder   
 // crear una store en base a su collector_id y el JSON enviado?
 // Sustituye el método por su correspondiente: get, put, post, delete
 // Pista: Revisa detenidamente el endpoint y encuentra el fallo

$url="";
$json = $_POST["json"];


curl_call("POST","https://api.mercadopago.com/users/$collector_id/stores?access_token=$access_token",$json);

?>
