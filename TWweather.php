<?php
	//設定標頭 Access-Control-Allow-Origin: * 不限制網域
	header('Access-Control-Allow-Origin: *');

	//驗證碼
	$code = "CWB-D4A7B39A-ECAD-43ED-8667-03182B2D93D3";

	//接收氣象資料
	$xml=simplexml_load_file("http://opendata.cwb.gov.tw/opendataapi?dataid=F-C0032-001&authorizationkey=".$code);

	//轉成JSON格式
	$json = json_encode($xml);

	//輸出資料
  echo $json;
?>
