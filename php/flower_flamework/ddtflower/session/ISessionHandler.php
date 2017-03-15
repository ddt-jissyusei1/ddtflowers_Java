<?php
interface ISessionHandler
{
	public function set($value);
	public function get();
}