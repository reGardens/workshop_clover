<?php

namespace App\Helpers;

class ConvertTypeOperatorHelper {

  public static function convertTypeString($operator)
	{
		// type string datagrid
		if($operator == 'contains') {
			return "LIKE";
		};
		if($operator == 'equals') {
			return "=";
		}
		// type date datagrid
		if($operator == 'is'){
			return "=";
		}
		if($operator == 'after'){
			return ">";
		}
		if($operator == 'before'){
			return "<";
		}
		return $operator;
	}

}