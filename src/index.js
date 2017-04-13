
const loadItems = () => {
  fetch('/api/v1/garage', {
    method: 'GET'
  })
    .then(res => res.json())
    .then(items => renderItems(items));
}

$('document').ready(loadItems);

const renderItems = (items) => {
  $('.item').remove();
  items.forEach(item => {
    console.log(item)
    $('#the-list').append(`
      <li class='item' id=${item.id}>${item.name}</li>`
    )
  })
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

$('#put-it-in').on('click', (e)=>{
  e.preventDefault();
  const name = $('#new-name').val()
  const reason = $('#new-reason').val()
  const cleanliness = $('#new-cleanliness').val()
  addItem({name, reason, cleanliness})
})

//ADD ON CLICK FUNCTION TO EACH ITEM

//ADD PATCH REQUEST TO INDIVIDUAL ITEM DIV

//ADD COUNTERS FOR TOTAL, AND NUMBER OF EACH KIND

//ADD SORT FUNCTIONS

$('#open-close').on('click', ()=>{
  $('.garage-door').toggleClass('open')
})
