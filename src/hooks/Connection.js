export class Connection{

  constructor({serverUrl, roomId}){
    this.serverUrl = serverUrl
    this.roomId = roomId
    this.intervalId = null
    this.messageCallback = null
    if (typeof serverUrl !== 'string') {
      throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
    }
    if (typeof roomId !== 'string') {
      throw Error('Expected roomId to be a string. Received: ' + roomId);
    }
  }

  connect() {
    console.log('✅ Connecting to "' + this.roomId + '" room at ' + this.serverUrl + '...');
    clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.messageCallback) {
        if (Math.random() > 0.5) {
          this.messageCallback('hey')
        } else {
          this.messageCallback('lol');
        }
      }
    }, 3000);
  }

  disconnect() {
    clearInterval(this.intervalId);
    this.messageCallback = null;
    console.log('❌ Disconnected from "' + this.roomId + '" room at ' + this.serverUrl + '');
  }

  on(event, callback) {
    if (this.messageCallback) {
      throw Error('Cannot add the handler twice.');
    }
    if (event !== 'message') {
      throw Error('Only "message" event is supported.');
    }
    this.messageCallback = callback;
  }

}
