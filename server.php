<?php
	$request = $_GET;

	if(isset($request["pageSize"])) {
		$pageSize = $request["pageSize"];
	} else {
		$pageSize = 4;
	}

	
	$connection = mysql_connect('localhost', 'root', '23');
	mysql_select_db('carousel', $connection);
	
	$result = array();
	
	$totalSql = 'select count(*) cnt from Item';
	$idf = mysql_query($totalSql, $connection);
	$total = mysql_fetch_assoc($idf);
	
	$startOffset = $request['page'] * $pageSize;
	$sql = 'select * from Item limit ' . $startOffset . ',' . $pageSize;
	$idf = mysql_query($sql, $connection);
	$i = 0;
	while($row = mysql_fetch_assoc($idf)){
		$result[] = $row;
	}
	
	echo json_encode(array(
		'items' => $result, 
		'pageSize' => $pageSize,
		'pageNum' => $request['page'], 
		'total' => $total['cnt']
	));
?>
