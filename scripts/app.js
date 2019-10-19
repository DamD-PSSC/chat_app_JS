// dom queries
const chatList = document.querySelector('.chat-list');
const chatButtons = document.querySelector('.chat-buttons');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const rooms = document.querySelector('.chat-rooms');
const search = document.querySelector('.search input');

// add a new chat
newChatForm.addEventListener('submit', ev => {
  ev.preventDefault();
  const message = newChatForm.message.value.trim();
  chatroom.addChat(message)
    .then(() => newChatForm.reset())
    .catch(err => console.log(err));
});

// update username
newNameForm.addEventListener('submit', ev => {
  ev.preventDefault();
  // update name via GUI chat
  const newName = newNameForm.name.value.trim();
  chatroom.updateName(newName);
  // reset the Form
  newNameForm.reset();
  // show them hide update msg
  updateMsg.innerText = `Your name was updated to ${newName}`;
  setTimeout(() =>  {
    updateMsg.innerText = '';
  }, 3000);
});

// update the chat room
rooms.addEventListener('click', ev => {
  if (ev.target.tagName === 'BUTTON') {
    chatUI.clear();
    chatroom.updateRoom(ev.target.getAttribute('id'));
    chatroom.getChats(chat => chatUI.render(chat));
  }
});

// filter chatrooms
const filterItems = item => {
  Array.from(chatButtons.children) //Convert HTML to Array
    .filter(button => !button.textContent.toLowerCase().includes(item))
    .forEach(button => button.classList.add('filtered'));
  Array.from(chatButtons.children) //Convert HTML to Array
    .filter(button => button.textContent.toLowerCase().includes(item))
    .forEach(button => button.classList.remove('filtered'));
}
search.addEventListener('keyup', ev => {
  const term = search.value.trim().toLowerCase();
  filterItems(term);
  console.log(term);
});

// check local storage for the username
const username = localStorage.username ? localStorage.username : 'anon';

// class instances
const chatUI = new ChatUI(chatList);
const chatroom = new Chatroom('general', username);

// get chats from db and render UI
chatroom.getChats(data => {
  chatUI.render(data);
});
