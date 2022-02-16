var storage = chrome.storage.local; // Доступ к локальному хранилищу
var fishing = [];					// Массив фишинговых сайтов
storage.get('fishing', function(items) {
	if (items.fishing) {
	  fishing = JSON.parse(items.fishing);
//	  console.log(fishing);
	}
	else console.log("Нет fishing");
});
chrome.identity.getProfileUserInfo(function(userInfo) {
 /* Use userInfo.email, or better (for privacy) userInfo.id
    They will be empty if user is not signed in in Chrome */
	console.log(userInfo.id);
});