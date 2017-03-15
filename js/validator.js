/** ファイル名:validator.js
 * 概要　　　:validate用クラスの定義のファイル
 * 作成日　:2015.0813
 * 作成者　:T.Masuda
 * 場所　　:js/validator.js
 */

/** クラス名:validator.js
 * 概要　:validate用クラス
 * 引数	:なし
 * 作成日:2015.1230
 * 作成者:T.Masuda
 */
function validator () {

	/* 関数名:validate
	 * 概要　:指定したルールでvalidationを行う
	 * 引数　:Object rules : validationルールのオブジェクト。以下の構成となる
	 * 		{
	 * 			valuesのkey(主にフォームパーツのname属性値) : [
	 * 				validationルール名(isNumeric、isNull等) , ... 
	 * 			]
	 * 		}
	 * 		:Object values : validation対象の値が格納された
	 * 返却値:なし
	 * 設計者　:H.Kaneko
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.validate = function(rules, values) {

		//指定したチェックを行う
		for (key in rules) {
			//validationルールを取り出す
			var rule = rules[key];
			//設定されたvalidationルールの数を取得する
			var ruleNumber = rule.length;
			//ruleに登録されたkey(=validatorクラスのvalidation関数名)を走査する
			for (var i = 0; i < ruleNumber; i++) {
				//該当するものがあれば
				if (rule[i] in this.method) {
					//validationがinvalidであることをエラーとしてtry-catch節を開始する
					try {
						//validation関数をコールする
						this.method[rule[i]](key, values[key]);
					//validationエラーが発生したら
					} catch (e) {
						//呼び出し元にエラーを渡す。形式としては文字列をエラーメッセージとして渡す
						throw e;
					}
				}
			}
		}
	}
	
	/* 関数名:checkNumeric
	 * 概要　:渡された値が数字かどうかを調べる
	 * 引数　:  key 　: 確認対象のkey
	 * 　　　:? value : 確認する対象
	 * 返却値:なし
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.checkNumeric = function(key, value) {
		
		//数値であれば(文字列扱いの数字も対象)
		if (!(typeof value == NUMBER) && isNaN(value)) {
			//数字でないというメッセージを例外として渡す
			throw Error(key + ALERT_VALUE_IS_NOT_NUMERIC);
		} 
	}
	
	/* 関数名:checkNumericStrict
	 * 概要　:渡された値が数値かどうかを調べる
	 * 引数　:  key 　: 確認対象のkey
	 * 　　　:? value : 確認する対象
	 * 返却値:なし
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.checkNumericStrict = function(key, value) {
		
		//数値であれば(文字列扱いの数字は対象外)
		if (!(typeof value == NUMBER)) {
			//数値でないというメッセージを例外として渡す
			throw Error(key + ALERT_VALUE_IS_NOT_NUMERIC_STRICT);
		} 
	}
	
	/* 関数名:checkNull
	 * 概要　:渡された値がnullかどうかを調べる
	 * 引数　:? value : 確認する対象
	 * 返却値:boolean : 判定結果
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.checkNull = function(key, value) {
		//返す判定結果の変数を用意する
		var retBoo = false;
		
		//nullであれば
		if (value == null) {
			throw new Error(key + ALERT_VALUE_IS_NULL);	//nullであるというメッセージを例外として渡す
		} 
	}
	
	/* 関数名:checkEmpty
	 * 概要　:渡された値が空文字かどうかを調べる
	 * 引数　:  key 　: 確認対象のkey
	 * 　　　:? value : 確認する対象
	 * 返却値:なし
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.checkEmpty = function(key, value) {
		
		//空文字であれば
		if (value == EMPTY_STRING) {
			//空であるというメッセージを渡す
			throw new Error(key + ALERT_VALUE_IS_EMPTY);
		} 
	}
	
	/* 関数名:checkUndefined
	 * 引数　:  key 　: 確認対象のkey
	 * 　　　:? value : 確認する対象
	 * 返却値:なし
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.checkUndefined = function(key, value) {
		
		//undefinedであれば
		if (value === void(0)) {
			//未定義である(undefined)というメッセージを渡す
			throw new Error(key + ALERT_VALUE_IS_UNDEFINED);
		} 
	}
	
	/* 関数名:getValidationSettingObject
	 * 引数　:String  name : 追加するname
	 * 　　　:String rule : nameに対して設定するvalidationルール
	 * 　　　:Object object: 設定を追加する先のオブジェクト
	 * 返却値:Object : ルールを追加したオブジェクト
	 * 作成日　:2015.1230
	 * 作成者　:T.Masuda
	 */
	this.getValidationSettingObject = function(name, rule, object) {
		var retObj = object ? object : {};	//引数のオブジェクトが空なら新規のオブジェクトを用意する
		
		//該当するnameに何もはいっていなければ　
		if (retObj[name] === void(0)) {
			retObj[name] = [];	//配列を追加する
		}
		
		//ルールを追加する
		retObj[name].push(rule);
		
		//ルールを追加したオブジェクトを返す
		return retObj;
	}
	
	//validation用関数をオブジェクトに登録する
	this.method = {
			//数値チェック
			isNumeric : this.checkNumeric,
			//数値チェック
			isNumericStrict : this.checkNumericStrict,
			//nullチェック
			isNull : this.checkNull,
			//空文字チェック
			isEmpty : this.checkEmpty,
			//undefinedチェック
			isUndefined : this.checkUndefined
	} 

}

//様々な場所で利用されるため予めインスタンスを生成しておく
VALIDATOR = new validator();

