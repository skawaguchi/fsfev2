const webSocketOutput = document.querySelector('.output');
const inputBtn = document.querySelector('.input-box');

inputBtn.addEventListener('keyup', function(event) {
    if (event.key === "Enter") {
        const query = event.target.value;
        event.target.value = '';
        sendQuery(query);
    }
});

let ws;
try {
  // Local dev
  if (['localhost', '127.0.0.1', ''].includes(location.hostname)) {
    ws = new WebSocket(`ws://localhost:3000`);
  } else {
    ws = new WebSocket(`wss://jemisthe.best`);
  }
} catch(e) {
  console.log('Web socket init error', e);
}


function sendQuery(query) {
    ws.send(JSON.stringify({type: 'query', payload: query}))
}

ws.onmessage = function({data}) {
    const msgEl = document.createElement('div');

    try {
        data = JSON.parse(data);
        const {type, payload} = data;

        switch(type) {
            case 'ping':
                // console.log('ping');
                return;
            default:
                msgEl.innerHTML = payload;
                webSocketOutput.prepend(msgEl);
                break;
        }
    } catch(e) {
        console.log('Websocket error', e);
    }
}
