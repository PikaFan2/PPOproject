var storage = chrome.storage.local; // Доступ к локальному хранилищу
var message = document.querySelector('#message');
var img = document.querySelector('#icon');
var optionsUrl = chrome.extension.getURL('options.html');
		
storage.get('fishinMSG', function(items) { // 
	if (items.fishinMSG) {

		message.innerHTML = items.fishinMSG + "<br/>" + 'Нажмите <a target="_blank" href="' + optionsUrl + '">options page</a> чтобы сообщить о фишинге.';
		img.src = "icon-fishing.png";
	}
	else {
		console.log("Нет сообщения fishinMSG");
		message.innerHTML = 'Нажмите <a target="_blank" href="' + optionsUrl + '">options page</a> чтобы сообщить о фишинге.';	
		img.src = "128.png";		
	}
});
storage.remove('fishinMSG', function(items) { // 
	console.log("Удалили сообщение fishinMSG");
});
