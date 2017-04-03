<?php
namespace database;

abstract class ConnectionAbstract {
	public abstract function getHost();
	public abstract function getRdb();
	public abstract function getDatabase();
	public abstract function getUser();
	public abstract function getPassword();
}