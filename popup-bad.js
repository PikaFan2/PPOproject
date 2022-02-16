var storage = chrome.storage.local; // Доступ к локальному хранилищу
storage.get('fishinMSG', function(items) { // 
	if (items.fishinMSG) {
		var message = document.querySelector('#message');
		var optionsUrl = chrome.extension.getURL('options.html');
		message.innerHTML = items.fishinMSG + "<br/>" + 'Нажмите <a target="_blank" href="' + optionsUrl + '">options page</a> чтобы сообщить о фишинге.';		
	}
	else {
		console.log("Нет сообщения fishinMSG");
		message.innerHTML = 'Нажмите <a target="_blank" href="' + optionsUrl + '">options page</a> чтобы сообщить о фишинге.';			
	}
});

