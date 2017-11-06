<?php

class MySQL extends PDO {
	protected $dbname;
	protected $host;
	protected $user;
	protected $pass;
	public $table;

	public function __construct(){
		$this->dbname = 'company';

		if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1'){
			$this->host = '127.0.0.1';
			$this->user = 'root';
			$this->pass = '';
		}else{
			$this->host = '';
			$this->user = '';
			$this->pass = '';
		}

		parent::__construct('mysql:dbname=' . $this->dbname . ';host=' . $this->host, $this->user, $this->pass);
	}

	// Execute any query string against this database
	public function query($query, $params=array()){
		try{
			$this->stmnt = $this->prepare($query);
			$result	= $this->stmnt->execute((array)$params);
		}catch(PDOException $e){
			$this->error($query, $params, $e);
			$result = FALSE;
		}

		return $result;
	}

	public function select($query, $params=array(), $mode=PDO::FETCH_OBJ){
		try{
			$stmnt = $this->prepare($query);
			$stmnt->execute((array)$params);
			$result = $stmnt->fetchAll($mode);
		}catch(PDOException $e){
			$this->error($query, $params, $e);
			$result = FALSE;
		}

		return $result;
	}

	public function insert($query, $params=array()){
		try{
			$stmnt = $this->prepare($query);
			$stmnt->execute((array)$params);
			$result = $this->lastInsertId();
		}catch(PDOException $e){
			throw $e;
		}

		return $result;
	}

	public function update($query, $params=array()){
		try{
			$stmnt = $this->prepare($query);
			$stmnt->execute((array)$params);
			$result = $stmnt->rowCount();

			if ($result === 0){
				$result = TRUE;
			}
		}catch(PDOException $e){
			$this->error($query, $params, $e);
			$result = FALSE;
		}

		return $result;
	}

	public function delete($query, $params=array()){
		try{
			$stmnt = $this->prepare($query);
			$stmnt->execute((array)$params);
			$result = $stmnt->rowCount();

			if ($result === 0){
				$result = TRUE;
			}
		}catch(PDOException $e){
			$this->error($query, $params, $e);
			$result = FALSE;
		}

		return $result;
	}
}

//	$dbh = new MySQL();
//	// Just a single bound parameter can be passed right in
//	$query = "SELECT something FROM a_table WHERE this = ?";
//	$result = $dbh->select($query, $that);
//	// Multiple parameters should be passed as an array
//	$query = "SELECT thing, thing2 FROM a_table WHERE this = ? AND that = ?";
//	$params = array($this, $that);
//	$result = $dbh->select($query, $params);
//	// $result will contain the result set
//	
//	$query = "INSERT INTO my_table (column1, column2) VALUES (?, ?)";
//	$params = array($value1, $value2);
//	$result = $dbh->insert($query, $params);
//	// $result will contain the last insert ID, or TRUE if successful but you don't have an autoincrement column in that table -- FALSE otherwise
//	
//	$query = "UPDATE my_table SET something = ?, other = ? WHERE id = ?";
//	$params = array($somethingValue, $otherValue, $id);
//	$result = $dbh->update($query, $params);
//	// $result will contain the number of rows affected, or TRUE if successful but no rows affected -- FALSE otherwise
//	
//	$query = "DELETE FROM my_table WHERE id = ?";
//	$result = $dbh->delete($query, 3);
//	// $result will contain the number of rows deleted, or TRUE if successful but no rows deleted -- FALSE otherwise
//	
//	
//	include "MySQL.class.php";
//	
//	$dbh = new MySQL();
//	
//	if ($_POST['password'] != $_POST['confirm-password']){
//		// echo your failure
//	}else{
//		$sql = "INSERT INTO customers (username, email, password) VALUES (?, ?, ?)";
//		$params = array($_POST['username'], $_POST['email'], $_POST['password']);
//		$dbh->insert($sql, $params);
//	}

?>