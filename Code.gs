var TELEGRAM_TOKEN = '8664390432:AAE-e_xQZY7sCCtZ16OC1Bitw1r2OUApkV4';
var CHAT_ID = '347928993';

function doPost(e) {
  try {
    var data = e.parameter || {};
    var labels = {
      name: 'Имя',
      email: 'Email',
      company: 'Компания / Бренд',
      projectType: 'Тип проекта',
      budget: 'Бюджет',
      shootDate: 'Дата съёмки',
      location: 'Локация',
      description: 'О проекте',
      lang: 'Язык формы'
    };
    var order = ['name','email','company','projectType','budget','shootDate','location','description','lang'];
    var rows = ['🔔 *Новая заявка с сайта*\n'];
    for (var i=0; i<order.length; i++) {
      var key = order[i];
      if (data[key]) rows.push('*' + labels[key] + ':* ' + data[key]);
    }
    UrlFetchApp.fetch('https://api.telegram.org/bot'+TELEGRAM_TOKEN+'/sendMessage', {
      method:'post',
      contentType:'application/json',
      payload: JSON.stringify({chat_id:CHAT_ID, text:rows.join('\n'), parse_mode:'Markdown'})
    });
    return ContentService.createTextOutput('{"success":true}').setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService.createTextOutput('{"error":"'+err+'"}').setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput('{"status":"ok"}').setMimeType(ContentService.MimeType.JSON);
}
