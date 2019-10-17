// adding new chat documents
// setting up a real time listener to get new chats
// updating the username
// updating the room

class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
    this.unsub;
  }
  async addChat(message){
    // chat object
    const now = new Date();
    const chat = {
      message,
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
  updateName(username){
    this.username = username;
    localStorage.setItem('username', username);
  }
  updateRoom(room){
    this.room = room;
    console.log('room updated');
    if (this.unsub) { // check status of variable (empty = false)
      this.unsub(); // stop listening db
    }
  }
}
