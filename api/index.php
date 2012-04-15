<?php

require 'Slim/Slim.php';
require '../includes/config.php';

$app = new Slim();

$app->get('/decks', 'getDecks');
$app->get('/decks/search/:query', 'searchDecks');
$app->get('/decks/:id', 'getDeck');
$app->get('/decks/:id/cards', 'getDeckCards');
$app->get('/cards', 'getCards');
$app->get('/cards/:id', 'getCard');

$app->run();


function getDecks() {

    $sql = "select d.id, d.title, d.description, d.created, d.updated, count(c.id) cardCount " .
    		"from decks d left join cards c on c.deck_id = d.id " .
    		"group by d.id order by d.title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}



function searchDecks($query) {

        $sql = "select d.id, d.title, d.description, d.created, d.updated, count(c.id) cardCount " .
    		"from decks d left join cards c on c.deck_id = d.id " .
    		"where d.title LIKE :query  " .
    		"group by d.id order by d.title";
    
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getDeck($id) {

	    $sql = "select d.id, d.title, d.description, d.created, d.updated, count(c.id) cardCount " .
    		"from decks d left join cards c on c.deck_id = d.id " .
    		"where d.id LIKE :id  " .
    		"group by d.id order by d.title";

    try {
        $db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("id", $id);
		$stmt->execute();
		$employee = $stmt->fetchObject();
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employee);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employee) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getDeckCards($id) {

    $sql = "select c.id, c.deck_id, c.side_1, c.side_2, c.notes, c.created, c.updated " .
    		"from cards c " .
			"where c.deck_id=:id ";

    try {
        $db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("id", $id);
    	$stmt->execute();
    	$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getCards() {

    $sql = "select c.id, c.deck_id, c.side_1, c.side_2, c.notes, c.created, c.updated " .
    		"from cards c " ;

    try {
        $db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("id", $id);
    	$stmt->execute();
    	$employees = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employees);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employees) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}


function getCard($id) {

	      $sql = "select c.id, c.deck_id, c.side_1, c.side_2, c.notes, c.created, c.updated " .
    		"from cards c " ;
    		"where d.id LIKE :id  " ;

    try {
        $db = getConnection();
    	$stmt = $db->prepare($sql);
    	$stmt->bindParam("id", $id);
		$stmt->execute();
		$employee = $stmt->fetchObject();
		$db = null;

        // Include support for JSONP requests
        if (!isset($_GET['callback'])) {
            echo json_encode($employee);
        } else {
            echo $_GET['callback'] . '(' . json_encode($employee) . ');';
        }

	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getConnection() {
	$dbh = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME."", DBUSER, DBPASS);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}


?>

