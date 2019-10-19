class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats'); // collection choosing
    this.unsub;
  }

  async addChat(message){
    // chat object
    const now = new Date();
    const chat = {
      message, // short version of message: this.message
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat object
    const response = await this.chats.add(chat);
    return response;
  }

  // set real time listener
  getChats(callback){
    this.unsub = this.chats
      .where('room', '==', this.room) // filtering chats
      .orderBy('created_at')
      .onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            // update UI
            callback(change.doc.data());
          }
        });
      });
  }

  // func for update username (also it look into local storage)
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username);
  }

  // room update with disabling real time listener
  updateRoom(room){
    this.room = room;
    console.log('room updated');
    if (this.unsub) { // check status of variable (empty = false)
      this.unsub(); // stop listening db
    }
  }
}
