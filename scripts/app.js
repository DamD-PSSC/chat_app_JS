// dom queries
const chatList = document.querySelector('.chat-list');

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', 'anon');

// get chats from db and render UI
chatroom.getChats(data => {
  chatUI.render(data);
});
