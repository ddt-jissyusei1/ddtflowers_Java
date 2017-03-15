<?php
require_once "ModelMysql.php";
require_once "mailSendFailException.php";
    
//
//      ファイル名      :       ModelMail.php
//      概要            :       メール送信クラス
//      詳細            :       メール送信・雛形作成等のクラス
//      履歴            :       2010/02/19      林　直貴                新規作成
//

// メールモデルクラス
class ModelMail {
	
	const aSManager = 80; // 管理者権限
    const mailNotDenied = 0;    // メール送信拒否してない
    
    /**
     * メルマガ送信対象者取得
     * @return メルマガ送信対象者の配列(連想配列)
     **/
    public static function getMailMagazineTarget() {
        return ModelMysql::select_all2(array('id'), 'user_inf', 'mail_deny=' . self::mailNotDenied);
    }
	
	//
	// メソッド名   ：send_mail
	// 概要         ：メール送信
	// 戻り値       ：true:成功、false:失敗
	// 引数         ：$to
	//                送信先(登録者番号の配列も可能)
	// 引数         ：$subject
	//                タイトル
	// 引数         ：$content
	//                内容
    // 引数         ：$from
    //                送信元
	// 引数         ：$cc=''
	//                送信先(cc)(登録者番号の配列も可能)
	// 引数         ：$bcc=''
	//                送信先(bcc)(登録者番号の配列も可能)
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function send_mail($to, $subject, $content, $from='', $cc='', $bcc='') {
		// to設定
        $mail_to = '';
        $mail_cc = '';
        $mail_bcc = '';
		if(is_array($to)) {
			// 配列は、id配列とみなす
			// 配列を走査
			foreach($to as $id) {
				// idからメールアドレス取得
				$madd = ModelMysql::select_col_by_id('user_inf', 'mail_address', $id);

				// 2回目以降は、区切りのカンマ追加
				if($mail_to != '') $mail_to .= ',';
				// メールアドレス追加
				$mail_to .= $madd;
			}
		} else { // 配列以外は、そのままメールアドレスとしてセット
			$mail_to = $to;
		}

		// cc設定
		if(is_array($cc)) {
			// 配列は、id配列とみなす
			// 配列を走査
			foreach($cc as $id) {
				// idからメールアドレス取得
				$madd = ModelMysql::select_col_by_id('user_inf', 'mail_address', $id);
				// 2回目以降は、区切りのカンマ追加
				if($mail_cc != '') $mail_cc .= ',';
				// メールアドレス追加
				$mail_cc .= $madd;
			}
		} else { // 配列以外は、そのままメールアドレスとしてセット
			$mail_cc = $cc;
		}

		// bcc設定
		if(is_array($bcc)) {
			// 配列は、id配列とみなす
			// 配列を走査
			foreach($bcc as $id) {
				// idからメールアドレス取得
				$madd = ModelMysql::select_col_by_id('user_inf', 'mail_address', $id);
				// 2回目以降は、区切りのカンマ追加
				if($mail_bcc != '') $mail_bcc .= ',';
				// メールアドレス追加
				$mail_bcc .= $madd;
			}
		} else { // 配列以外は、そのままメールアドレスとしてセット
			$mail_bcc = $bcc;
		}

		// FROMが未指定なら取得
		if(!$from) {
			$from = ModelMysql::select_col_by_id('common_parameter', 'from_mail_address', 1);
		}
		
		// 追加ヘッダ作成
		$addhed = 'From:' . $from . "\n";
		if($mail_cc != '') $addhed .= 'Cc:' . $mail_cc . "\n";
		if($mail_bcc != '') $addhed .= 'Bcc:' . $mail_bcc . "\n";
		//文字コードを指定する
		$addhed .="Content-Type: text/html; charset=\"ISO-2022-JP\";\n";
		mb_internal_encoding("UTF-8");	//エンコード指定
		
		// メール送信
		if(!mail(
				$mail_to,
				mb_encode_mimeheader($subject, 'ISO-2022-JP-MS'),          //エンコードはISO-2022-JP-MSで行う！
				mb_convert_encoding($content, 'ISO-2022-JP-MS'),          //エンコードはISO-2022-JP-MSで行う！
				$addhed
			)
		) {
			// 失敗時は管理者へメール送信
            $fail_title = ' メール送信エラー';
            // 管理者アドレス取得
			$admin_to = self::get_admin_mail();
            $fail_content = self::cat_mail_content_and_to(
            	$content
            	,$mail_to
            	,$mail_cc
            	,$mail_bcc
            );
		
         	//失敗時のメールを送信する
			mail(
				$admin_to,
				mb_encode_mimeheader($subject. $fail_title, 'ISO-2022-JP-MS'),    //エンコードはISO-2022-JP-MSで行う！
				mb_convert_encoding($fail_content, 'ISO-2022-JP-MS'),        	  //エンコードはISO-2022-JP-MSで行う！
				"Content-Type: text/html; charset=\"ISO-2022-JP\";\n"    		 //ヘッダはISO-2022-JPを指定する！
			);
			
			// 失敗を返却
			return false;
		}
		// 成功を返却
		return true;
	}
    
	/**
	 * 内容、to、cc、bccを連結
	 *
	 * @param $content 本文
	 * @param $to to文字列
	 * @param $cc cc文字列
	 * @param $bcc bcc文字列
	 * @return String $content . $to . $cc . $bcc
	*/
    private static function cat_mail_content_and_to($content, $to, $cc='', $bcc='') {
        $result = $content . PHP_EOL . $to;
        if($cc) {
            $result .= PHP_EOL . $cc;
        }
        if($bcc) {
            $result .= PHP_EOL . $bcc;
        }
        return $result;
    }

	//
	// メソッド名   ：get_admin_mail
	// 概要         ：管理者メールアドレス取得
	// 戻り値       ：管理者メールアドレス(カンマ区切り)
	// 引数         ：$school_key=0
	//                店舗管理者も含める場合セット
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//
	public static function get_admin_mail($school_key=0) {
		// 返却アドレス初期化
		$address='';

		// 管理者メールアドレス取得(全管理者権限の登録者メールアドレスを取得)
		$recs = ModelMysql::select_all2('mail_address', 'user_inf', 'authority=' . self::aSManager);
		// メールアドレスをカンマで連結
		foreach($recs as $rec) {
			if($address != '') $address .= ',';
			$address .= $rec['mail_address'];
		}

		// 店舗マネージャー、サブマネージャー取得
		if($school_key > 0) {
			// 店舗キーを指定した場合だけ追加
			// 店舗レコード取得
			$rec = ModelMysql::select_one2('*', 'school_inf', 'id=' . $school_key);
			// マネージャーがいる場合、メールアドレスを取得して追加
			if($rec['manager_key'] > 0) {
				if($address != '') $address .= ',';
				$address .= ModelMysql::select_col_by_id('user_inf', 'mail_address', $rec['manager_key']);
			}
			// サブマネージャー1がいる場合、メールアドレスを取得して追加
			if($rec['submanager1_key'] > 0) {
				if($address != '') $address .= ',';
				$address .= ModelMysql::select_col_by_id('user_inf', 'mail_address', $rec['submanager1_key']);
			}
			// サブマネージャー2がいる場合、メールアドレスを取得して追加
			if($rec['submanager2_key'] > 0) {
				if($address != '') $address .= ',';
				$address .= ModelMysql::select_col_by_id('user_inf', 'mail_address', $rec['submanager2_key']);
			}
		}

		// 最終結果返却
		return $address;
	}

	//
	// メソッド名   ：create_mail_content
	// 概要         ：雛形よりメール内容作成
	// 戻り値       ：タイトルと内容の配列(雛形種別を指定しない場合、タイトルは空白)
	// 引数         ：$temp_type
	//                雛形種別
	// 引数         ：$template
	//                雛形(種別で指定しない場合、汎用)
	// 引数         ：$school_key
	//                店舗関連置き換え用店舗キー
	// 引数         ：$user_key
	//                登録者関連置き換え用登録者キー
	// 引数         ：$lesson_key
	//                レッスン関連置き換え用レッスンキー
	// 引数         ：$classwork_key
	//                授業関連置き換え用授業キー
	// 引数         ：$commodity_key
	//                商品関連置き換え用商品キー
	// 引数			：$lesson_days
	//				  授業までの日数
	// 引数			：$paramList
	//				　パラーメタリスト、指定されていたらDBアクセス無しでこの値を使用
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//				  2010/12/25		庄				$lesson_days追加
	//				：2011/09/10	本村	引数追加
	//
	public static function create_mail_content($temp_type, $template, $school_key, $user_key, $lesson_key, $classwork_key, $commodity_key, $lesson_days='',&$paramList = null) {
		// 変数初期化
		$mail_title = ''; // メールタイトル
		$mail_content = ''; // メール内容
		$school_name = ''; // 店舗名
		$user_name = ''; // 登録者名
		$user_mail_address = ''; // 登録者メールアドレス
		$lesson_name = ''; // テーマ名
		$lesson_date = ''; // 授業日
		$lesson_start_time = ''; // 開始時間
		$lesson_end_time = ''; // 終了時間
		$commodity_name = ''; // 商品名
		$suggest_content = '';
		$suggest_title = '';
		// レコード取得
		if($temp_type) {
			// 雛形種別が指定されている場合、雛形取得
			$temp_rec = ModelMysql::select_one2('mail_title,mail_content', 'mail_template', 'template_type=' . $temp_type. ' and disable = 0');
			if(!temp_rec)
			{
				return array(null,null);
			}
			$mail_title = $temp_rec['mail_title']; // 雛形タイトル
			$mail_content = $temp_rec['mail_content']; // 雛形内容
		} else { // それ以外は引数の雛形を使用
			$mail_content = $template;
		}
		if($school_key) {
			// 店舗キー指定の場合、店舗情報取得
			$school_rec = ModelMysql::select_one2('*', 'school_inf', 'id=' . $school_key);
			$school_name = $school_rec['school_name']; // 店舗名取得
		}
		if($user_key) {
			// 登録者キー指定の場合、登録者情報取得
			$user_rec = ModelMysql::select_one2('*', 'user_inf', 'id=' . $user_key);
			$user_name = $user_rec['user_name']; // 名前取得
			$user_mail_address = $user_rec['mail_address']; // メールアドレス取得
			$suggest_rec = ModelMysql::select_one2('*', 'suggestion_box', 'user_key=' . $user_key, '', 'create_datetime DESC');
			if(strpos($template,'[[suggest_title]]')) {
				$suggest_content = $suggest_rec['suggest_content'];
				$suggest_title = $suggest_rec['suggest_title'];
			}
		}
		if($lesson_key) {
			// レッスンキー指定の場合、テーマ情報取得
			$lesson_rec = ModelMysql::select_one2('*', 'lesson_inf', 'id=' . $lesson_key);
			$lesson_name = $lesson_rec['lesson_name']; // テーマ名取得
		}
		if($classwork_key) {
			// 授業キー指定の場合、授業情報、テーマ情報、時間割情報取得
			$classwork_rec = ModelMysql::select_one2('*', 'classwork', 'id=' . $classwork_key);
			$lesson_rec = ModelMysql::select_one2('*', 'lesson_inf', 'id=' . $classwork_rec['lesson_key']);
			$timetable_rec = ModelMysql::select_one2('*', 'timetable_inf', 'id=' . $classwork_rec['timetable_key']);
			$lesson_name = $lesson_rec['lesson_name']; // テーマ名取得
			$lesson_date = $classwork_rec['lesson_date']; // レッスン日取得
			$lesson_start_time = substr($timetable_rec['start_time'], 0, 5); // 開始時間取得
			$lesson_end_time = substr($timetable_rec['end_time'], 0, 5); // 終了時間取得
			//2010/8/1_honmura_add_from
			$lesson_pre_order_days = $lesson_rec['pre_order_days']; // 仮予約日取得
			//2010/8/1_honmura_add_to
		}
		if($commodity_key) {
			// 商品キー指定の場合、商品情報取得
			$commodity_rec = ModelMysql::select_one2('*', 'commodity_inf', 'id=' . $commodity_key);
			$commodity_name = $commodity_rec['commodity_name']; // 商品名取得
		}
		// 一括置き換え配列初期化
		$search = array();
		$replace = array();

		// 2011/09/10_honmura_add
		//パラーメタ指定時はDBアクセスせずに置換情報を設定
		if($paramList)
		{
			$search = $paramList[0];
			$replace =  $paramList[1];
		}

		//空文字置き換え
		$search[] = '[[empty]]';
		$replace[] = '';

		// 一括置き換え配列設定
		if($school_key) {
			// 店舗キー指定の場合
			$search[] = '[[school_key]]'; // 店舗キー
			$replace[] = $school_key;
			$search[] = '[[school_name]]'; // 店舗名
			$replace[] = $school_name;
		}
		if($user_key) {
			// 登録者キー指定の場合
			$search[] = '[[user_key]]'; // 登録者キー
			$replace[] = $user_key;
			$search[] = '[[user_name]]'; // 登録者名
			$replace[] = $user_name;
			$search[] = '[[user_mail_address]]'; // メールアドレス
			$replace[] = $user_mail_address;
			if($suggest_title) {
				$search[] = '[[suggest_content]]';	// 目安箱本文
				$replace[] = $suggest_content;
				$search[] = '[[suggest_title]]';	// 目安箱タイトル
				$replace[] = $suggest_title;
			}
		}
		if($classwork_key) {
			// 授業キー指定の場合
			$search[] = '[[lesson_name]]'; // テーマ名
			$replace[] = $lesson_name;
			$search[] = '[[lesson_date]]'; // レッスン日
			$replace[] = $lesson_date;
			$search[] = '[[lesson_start_time]]'; // 開始時間
			$replace[] = $lesson_start_time;
			$search[] = '[[lesson_end_time]]'; // 終了時間
			$replace[] = $lesson_end_time;
			//2010/8/1_honmura_add_from
			$search[] = '[[lesson_pre_order_days]]'; // 仮予約日
			$replace[] = $lesson_pre_order_days;
			//2010/8/1_honmura_add_to
		} else if($lesson_key) {
			// レッスンキーの場合
			$search[] = '[[lesson_name]]'; // テーマ名
			$replace[] = $lesson_name;
		}
		if($commodity_key) {
			// 商品キーの場合
			$search[] = '[[commodity_key]]'; // 商品キー
			$replace[] = $commodity_key;
			$search[] = '[[commodity_name]]'; // 商品名
			$replace[] = $commodity_name;
		}
		//授業までの日数
		//2010/12/25　shou
		if ($lesson_days) {
			//授業日
			$search[] = '[[lesson_days]]'; // 検索ワード
			$replace[] = $lesson_days;		//置換ワード
		}
		//2010/12/25　shou end
		//2011/01/13　shou
		if ($user_name) {
			//送信先ユーザー名
			$search[] = '[[user_name]]';	//検索ワード
			$replace[] = $user_name;		//置換ワード
		}
		//2011/01/13　shou end
		// 雛形の一括置き換え実施
		$mail_content = str_replace($search, $replace, $mail_content);
		// タイトルと雛形返却
		return array($mail_title, $mail_content);error_log('__now__'.$mail_content);
	}

	//
	// メソッド名   ：send_mail_each
	// 概要         ：メール送信(リスト個別送信)
	// 戻り値       ：送信数、失敗数、メールアドレス無し数の配列
	// 引数         ：$to
	//                (配列もしくはカンマで区切られたIDリスト)
	// 引数         ：$from
	//				  (送信元のユーザid➡0やnull️の場合は管理者になる)
	// 引数         ：$subject
	//                タイトル
	// 引数         ：$template
	//                内容
	// 引数         ：$admin_flag=false
	//                管理者送信フラグ(管理者に送信メール情報を送る場合true)
	// 引数         ：$school_key=0
	//                店舗管理者用店舗キー(店舗管理者にも送る場合)
	// 引数			：$paramList
	//				　パラーメタリスト、指定されていたらDBアクセス無しでこの値を使用
	// 履歴         ：2010/02/19      林　直貴          新規作成
	//				：2011/09/10	本村	引数追加
	//
	public static function send_mail_each($to, $from=0, $subject, $template, $cc='', $bcc='', $admin_flag=false, $school_key=0, &$paramList = null) {
		$none_num = 0; // メールアドレス無し数
		$send_num = 0; // 送信成功数
		$fail_num = 0; // 送信失敗数
		// toが配列で無い場合、配列に変換
		if(! is_array($to)) $to = explode(',', $to);

		// 管理者送信内容初期化
		$admin_content = '';

		// 2011/09/10_honmura_add
		$cnt = 0;

		// toのIDをループ
		foreach($to as $id) {
			// 登録者情報取得
			$user_rec = ModelMysql::select_one2('user_name,mail_address', 'user_inf', 'id=' . $id);
			// 管理者送信用の送信者リスト追加
			$admin_content .= sprintf("%010d %s", intval($id), $user_rec['user_name']);
			// メールアドレス無し判定
			if($user_rec['mail_address'] == '') {
				$admin_content .= "メールアドレス無し\n";
				++ $none_num;
				continue;
			}
			// メール雛形で、送信者情報のみ置き換え
			// 送信元が指定されている場合はユーザのキーは送信元を使う。
			$user_key = $id;
			$from_str = '';
			if($from) {
				$user_key = $from;
				$from_str = ModelMysql::select_col_by_id('user_inf', 'mail_address', $from);
			}
			list($dummy, $content) = self::create_mail_content(0, $template, 0, $user_key, 0, 0, 0, '', $paramList[$cnt]);
			// メール送信
			if(self::send_mail($user_rec['mail_address'], $subject, $content, $from_str, $cc, $bcc) == false) {
				// 失敗の場合
				$admin_content .= sprintf("送信失敗[%s]\n", $user_rec['mail_address']);
				++ $fail_num;
			} else {
				// 成功の場合
				$admin_content .= "送信成功\n";
				++ $send_num;
			}

			// 2011/09/10_honmura_add
			$cnt++;
		}

		// 管理者メール送信
		if($admin_flag) {
			// 管理者アドレス取得
			$admin_to = self::get_admin_mail($school_key);
			// 内容作成
			$admin_content = sprintf("送信成功数 %d, 失敗数 %d メールアドレス無し数 %d\n[送信者リスト]\n%s[送信タイトル]%s\n[送信内容]\n%s",
			$send_num, $fail_num, $none_num, $admin_content, $subject, $template);
			// 送信
			self::send_mail($admin_to, '送信通知', $admin_content);
		}

		// 結果数返却
		return array($send_num, $fail_num, $none_num);
	}

	const SUGGEST_TMP_NAME = '___suggestion_box___';
	const ADMIN_ID = '1';
	
	public static function sendSuggestion($type, $from, $title, $content, $school){
		if(!self::saveSuggestion($from, $type, $title, $content, $school)) {
			throw new MailSendFailException('failed to insert suggestion.');
		}
		
		$tmpName = self::SUGGEST_TMP_NAME;
		
		$sql =<<<EOF
			SELECT
				mail_title
				,mail_content
			FROM
				mail_template
			WHERE
				template_name = '{$tmpName}' 
			LIMIT 1
EOF;
		
		$ret = ModelMysql::query($sql);
		$template = mysql_fetch_array($ret, MYSQL_ASSOC);
		mysql_free_result($ret);
		if(!$template) {
			throw new MailSendFailException('failed to insert suggestion.');
		}

		return self::send_mail_each(array(self::ADMIN_ID), $from, $template['mail_title'], $template['mail_content']);
	}
	
	const SUGGEST_TABLE = 'suggestion_box';
	
	private static function saveSuggestion($userId, $type, $title, $content, $school) {
		$mysql = new ModelMysql();
		// insert項目作成
		$items = array(
			'user_key',
			'suggest_title',
			'suggest_content',
			'send_datetime',
			'suggest_type',	
			'school_key'	
		);
		$values = array(
				array($userId, false),
				array($title, true),
				array($content, true),
				array(Date('Y-m-d H:i:s'), true),
				array($type, false),
				array($school, true)
		);
		
		return $mysql->insert(self::SUGGEST_TABLE, $items, $values);
	}
}
