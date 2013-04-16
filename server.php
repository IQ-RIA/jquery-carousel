<?php
	define('PAGE_SIZE', 3);

	$request = $_GET;
	
	$connection = mysql_connect('localhost', 'root', 'miKe:beWig^lOcos50beT');
	mysql_select_db('carousel', $connection);
	
	$result = array();
	
	$totalSql = 'select count(*) cnt from Item';
	$idf = mysql_query($totalSql, $connection);
	$total = mysql_fetch_assoc($idf);
	
	$startOffset = $request['page'] * PAGE_SIZE;
	$sql = 'select * from Item limit ' . $startOffset . ',' . PAGE_SIZE;
	$idf = mysql_query($sql, $connection);
	
	while($row = mysql_fetch_assoc($idf)){
		$result[] = $row;
	}
	
	echo json_encode(array(
		'items' => $result, 
		'pageSize' => PAGE_SIZE,
		'pageNum' => $request['page'], 
		'total' => $total['cnt']
	));
?>
