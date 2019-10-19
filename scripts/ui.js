class ChatUI {
  constructor(list) {
    this.list = list;
  }
  clear(){
    this.list.innerHTML = '';
  }
  render(data){
    const when = dateFns.distanceInWordsToNow(
      data.created_at.toDate(),
      { addSuffix: true }
    );
    const html = `
      <li class="list-group-item border rounded mb-1">
        <span class="username font-weight-bold">${data.username} says:</span>
        <span class="message">${data.message}</span>
        <div class="time text-muted">${when}</div>
    `;
    this.list.innerHTML += html;
  };
}
