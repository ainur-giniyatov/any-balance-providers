/**Провайдер AnyBalance (http://any-balance-providers.googlecode.com)*/var g_headers = {	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',	'Accept-Charset': 'windows-1251,utf-8;q=0.7,*;q=0.3',	'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.6,en;q=0.4',	'Connection': 'keep-alive',	'User-Agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.76 Safari/537.36',};function main() {var prefs = AnyBalance.getPreferences();var baseurlApi = 'https://apilist.tronscan.org/';AnyBalance.setDefaultCharset('utf-8');var result = {success: true};if(AnyBalance.isAvailable('balance')){var html = AnyBalance.requestGet(baseurlApi + 'api/account?address=' + encodeURIComponent(prefs.login), g_headers);var json = getJson(html);var balancelong = (+json.balance)/1000000;var balance = balancelong.toFixed(0);getParam(balance, result, 'balance');}	AnyBalance.setResult(result);}