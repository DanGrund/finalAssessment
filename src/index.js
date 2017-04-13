let currentItems;

const loadItems = () => {
  fetch('/api/v1/garage', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(items => renderItems(items));
}

$('document').ready(loadItems);

const renderItems = (items) => {
  currentItems = items;
  let total = 0;
  let sparkling = 0;
  let dusty = 0;
  let decrepid = 0;
  $('.item').remove();
  items.forEach(item => {
    total++;
    switch(item.cleanliness) {
      case 'Sparkling':
        sparkling++;
        break;
      case 'Dusty':
        dusty++;
        break;
      case 'Decrepid':
        decrepid++;
        break;
      default:
        break;
    }

    $('#the-list').prepend(`
      <li class='item ${item.cleanliness}' id=${item.id}>
        ${item.name}
      </li>`
    )
  })
  $('#total').text(`There are ${total} things in your garage`)
  $('#sparkle-total').text(`${sparkling} sparkling`)
  $('#dusty-total').text(`${dusty} dusty`)
  $('#decrepid-total').text(`${decrepid} decrepid`)
}

const addItem = (itemAttributes) => {
  fetch(`/api/v1/garage/`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    body: JSON.stringify(itemAttributes)
  })
    .then(res => res.json())
    .then(items => {
      renderItems(items);
    })
}

const updateItem = (id, itemAttributes) => {
  fetch(`/api/v1/garage/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
    body: JSON.stringify(itemAttributes)
  })
    .then(res => res.json())
    .then(items => {
      renderItems(items);
    })
}

const deleteItem = (id) => {
  fetch(`/api/v1/garage/${id}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'Delete'
  })
    .then(res => res.json())
    .then(items => {
      renderItems(items);
    })
}

$('#put-it-in').on('click', (e)=>{
  e.preventDefault();
  const name = $('#new-name').val()
  const reason = $('#new-reason').val()
  const cleanliness = $('#new-cleanliness').val()
  addItem({name, reason, cleanliness})
  $('input').val('')
})

$('#the-list').on('click', '.item', (e) => {
  fetch(`/api/v1/garage/${e.target.id}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(item => showItemDetails(item));
})

const showItemDetails = (item) => {
  $('.selected-item').remove();
  $('body').append(
    `<div class='selected-item' id=${item[0].id}>
      NAME: <span class="dont-close" id="selected-name">${item[0].name}</span>
      REASON: <span class="dont-close" id="selected-reason">${item[0].reason}</span>
      <select class="dont-close" id='update-cleanliness'>
        <option value="Sparkling">Sparkling</option>
        <option value="Dusty">Dusty</option>
        <option value="Decrepid">Decrepid</option>
      </select>
      <div id='controls'>
        <button id='update-item'>update</button>
        <button id='delete-item'>delete</button>
        <button id='hide-item'>hide</button>
      </div>
    </div>`
  )
  $("#update-cleanliness").val(`${item[0].cleanliness}`);
}

$('body').on('click', '#update-item', function() {
  const id = $(this).closest('.selected-item').attr('id')
  const name = $('#selected-name').text()
  const reason = $('#selected-reason').text()
  const cleanliness = $('#update-cleanliness').val()
  updateItem(id, {name, reason, cleanliness})
  $('.selected-item').remove();
})

$('body').on('click', '#delete-item', function() {
  const id = $(this).closest('.selected-item').attr('id')
  deleteItem(id)
  $('.selected-item').remove();
})

$('body').on('click', '#hide-item', ()=> {
  $('.selected-item').remove();
})

$('body').on('click', (e)=>{
  if(e.target.className !=='selected-item' && e.target.className!=='dont-close') {
    $('.selected-item').remove();
  }
})

$('#open-close').on('click', ()=>{
  $('.garage-door').toggleClass('open')
})

$('#sort-list').on('click', ()=>{
  if ($('#sort-list').hasClass('up')) {
    sortDown()
  } else {
    sortUp()
  }
  $('#sort-list').toggleClass('up')
})

const sortUp = () => {
  newOrder = currentItems.sort((a,b)=>{return a.name > b.name })
  renderItems(newOrder)
}

const sortDown = () => {
  newOrder = currentItems.sort((a,b)=>{return a.name < b.name })
  renderItems(newOrder)
}

// module.exports = {sortUp, sortDown}
