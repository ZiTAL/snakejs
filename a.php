<?php
$array = array
(
	'name' => 'Snake',
	'description' => 'Snake game in html/js, for web and Firefox OS',
	'launch_path' => '/index.html',
	'appcache_path' => '/cache.manifest',
	'developer' => array
	(
		'name' => 'ZiTAL',
		'url' => 'https://github.com/ZiTAL/snakejs'
	),
	'installs_allowed_from' => array('*')
);

echo json_encode($array);
