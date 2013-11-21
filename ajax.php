<?php

require_once 'config.php';
header('Expires: Wed, 01 Dec 1980 00:30:00 GMT'); // time in the past
header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
header('Cache-Control: no-cache, must-revalidate');
header('Pragma: no-cache');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
if (!$link)
    die('Could not connect: ' . mysql_error());

mysql_select_db(DB_DATABASE);
$country = $_GET['country'];

echo "<table width=\"20%\" bgcolor=\"#F2FFE1\">";
//echo "<tr><td>Email</td></tr>";

if ($country != "") {
    $q = mysql_query("SELECT * FROM city where Name like '$country%' limit 0,10");

    for ($c = 0; $c < mysql_num_rows($q); $c++) {
        echo "<tr>";
        //      echo "<ul>";
        $f = mysql_fetch_array($q);
        echo "<td>" . $f['Name'] . "</td>";
//echo "</ul>";
        echo "</tr>";
    }
    echo "</table>";


    /* echo "В таблице mytable ".mysql_num_fields($q)." полей ";
      $rows = mysql_num_rows($q);
      $fields = mysql_num_fields($q);

      echo "<pre>";
      for ($c=0; $c<$rows; $c++) {
      for ($cc=0; $cc<$fields; $cc++) {
      echo mysql_result($q, $c, $cc)."\t";
      echo "\n";
      }
      }
      echo "</pre>"; */
    /* //echo $country;
      $sql = "select country
      from country
      where country=Russian";
      $result=mysql_query($sql, $link);


      $row=mysql_num_rows($result);
      echo $row; */
}
?>
