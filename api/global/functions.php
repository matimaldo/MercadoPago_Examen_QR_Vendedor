<?php

// REVISA AQUÍ:
// Agrega el access_token que se indica en el ejercicio así como el collector_id y el country_id

$access_token="APP_USR-7026946692817220-061822-8b7c9e20631faac22d9e4cfa92a37265-586728271";
$collector_id="586728271";
$country_id="MLA";

// No tocar el integrator_id para el ejercicio
$integrator_id_test="XXXXXXX"; 

$notificationJSON="";
global $access_token,$collector_id,$notificationJSON,$country_id;



// Función para hacer llamadas a la API
// Method: get, post, put o delete
// URL: Endpoint de nuestros servicios de Mercado Pago
// JSON: JSON en formato texto para enviar a la API.
// En el caso que no aplique enviar JSON poner ""

    
function curl_call($method,$url,$json){
	$integrator_id_test="";
	$method = strtoupper($method);
	$headers = array("Content-Type: application/json","X-integrator-id: $integrator_id_test");
    $ch = curl_init();
    if($method=="POST"){$post=1;}else{$post=0;};
    $options = array(
        CURLOPT_URL => $url,
		CURLOPT_CUSTOMREQUEST=> $method, 
        CURLOPT_POST => $post,
        CURLOPT_HTTPHEADER => $headers,
        CURLOPT_POSTFIELDS => $json,
    ); 

    curl_setopt_array($ch, $options);
    $response = curl_exec($ch);
   curl_close($ch);
   return $response;

}
?>