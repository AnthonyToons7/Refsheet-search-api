<?php
include "../rpg_evo_clash/ww.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$unicode = $_GET["value"];
$unicode = "%" . $unicode . "%";

$mysqli = new mysqli($one, $two, $three, $four);
$qry = "SELECT REFSHEET_USER_NAME FROM refsheet_users WHERE REFSHEET_USER_UNICODE LIKE ? OR REFSHEET_USER_NAME LIKE ?;";
$mysqli_stmt = $mysqli->prepare($qry);
$mysqli_stmt->bind_param('ss', $unicode, $unicode);
$mysqli_stmt->execute();
$result = $mysqli_stmt->get_result();

$refsheet_user_names = array();

while ($row = $result->fetch_assoc()){
    $refsheet_usernames[] = $row["REFSHEET_USER_NAME"];
}
echo json_encode($refsheet_usernames);