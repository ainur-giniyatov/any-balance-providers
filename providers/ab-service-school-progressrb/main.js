/**
Провайдер AnyBalance (http://any-balance-providers.googlecode.com)
*/

var g_headers = {
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
	'Accept-Charset': 'windows-1251,utf-8;q=0.7,*;q=0.3',
	'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',
	'Connection': 'keep-alive',
	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',
};

function main() {
	var prefs = AnyBalance.getPreferences();
	var baseurl = 'http://progressrb.ru/';
	// AnyBalance.setDefaultCharset('utf-8');
	
	// checkEmpty(prefs.login, 'Введите логин!');
	// checkEmpty(prefs.password, 'Введите пароль!');
	
	var html = AnyBalance.requestGet(baseurl, g_headers);
	AnyBalance.trace(html, null);
	if(!html || AnyBalance.getLastStatusCode() > 400)
		throw new AnyBalance.Error('Ошибка при подключении к сайту провайдера! Попробуйте обновить данные позже.');
	
	html = AnyBalance.requestPost(baseurl, {
		login: prefs.login,
		password: prefs.password,
		'log-in': 'Войти'
	}, addHeaders({Referer: baseurl, 'Content-Type': 'application/x-www-form-urlencoded'}));
	
	var result = {success: true};

	getParam(html, result, 'pupil', /<div class="name">(.*?)<\/div>/);
	getParam(html, result, 'balance', /class="balance-cont">\D*(\d*)\D*<\/div>/);
	getParam(html, result, 'account', /Л\/с: (.*?)<\/h2>/);
	
	// if (!/logout/i.test(html)) {
	// 	var error = getParam(html, null, null, /alert-error['"][^>]*>[\s\S]*?([\s\S]*?)<\//i, replaceTagsAndSpaces, html_entity_decode);
	// 	if (error)
	// 		throw new AnyBalance.Error(error, null, /Неверный логин или пароль/i.test(error));
		
	// 	throw new AnyBalance.Error('Не удалось зайти в личный кабинет. Сайт изменен?');
	// }
	
	AnyBalance.setResult(result);
}