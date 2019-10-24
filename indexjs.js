const url = 'https://5d8e0901370f02001405c7c9.mockapi.io/api/v1/postblog/';
const endpoint = 'item';

const $ = function (selector) { 
  return document.querySelector(selector);
}

let selectedItemID = null; 

const onReady = function () {
  getList(function (data) { 
    createTable(data) 
  })

  const submitBtn = $('#submit');
  submitBtn.addEventListener('click', function () { 
    if (selectedItemID) {
      updateItems(); 
    } else {
      createItems(); 
    }
  })
}

const createTable = function (data) {
  const tbody = $('#table-root');
  let template = '';
  for (let i = 0; i < data.length; i++) {
    const row = `
          <tr>
            <th>#${data[i].id}</th>
            <td>${data[i].name}</td>
            <td>${data[i].description}</td>
            <td>$${data[i].price}</td>
            <td><a onclick="onEdit(${data[i].id})" href="#">Edit</a></td>
            <td><a onclick="onDelete(${data[i].id})" href="#">Delete</a></td>
          </tr >
      `;

    template += row 
  }
  tbody.innerHTML = template;
}

const fillForm = function (data) { 
  const name = $('#name');
  const description = $('#description');
  const price = $('#price');

  name.value = data.name;
  description.value = data.description;
  price.value = data.price;

}

const createItems = function () {
  const name = $('#name');
  const description = $('#description');
  const price = $('#price');
  const data = { 
    name: name.value,
    description: description.value,
    price: price.value
  }

  fetch( 
    `${url}${endpoint}`,
    {
      method: "POST", 
      body: JSON.stringify(data), 
      headers: {
        'Content-Type': 'application/json' 
      }
    }
  )
    .then(function (response) {
      if (response.ok && response.status === 201) {
        getList(function (data) { 
          createTable(data) 
        })
         
        name.value = '',
          description.value = '',
          price.value = ''
      }
    })
   
}

const updateItems = function () {
  if (!selectedItemID) { 
    return;
  }
  const name = $('#name');
  const description = $('#description');
  const price = $('#price');

  const updateData = { 
    name: name.value,
    description: description.value,
    price: price.value
  }

  fetch(
    `${url}${endpoint}/${selectedItemID}`,
    {
      method: "PUT",
      body: JSON.stringify(updateData), 
      headers: {
        'Content-Type': 'application/json' 
      }
    }
  )
    .then(function (response) {
      if (response.ok && response.status === 200) { 
        getList(function (data) { 
          createTable(data)
        })
        
        name.value = '';
        description.value = '';
        price.value = '';
        selectedItemID = null; 
      }
    })
    
}

const getId = function (id) { 
  fetch(
    `${url}${endpoint}/${id}`
  ).then(function (response) {
    if (response.ok && response.status === 200) {
      return response.json().then(function (responseData) {
        selectedItemID = responseData.id
        fillForm(responseData);
      });
    }
  })
}

const getList = function (callback) {
  fetch(
    `${url}${endpoint}`
  ).then(function (response) {
    if (response.ok && response.status === 200) {
      return response.json().then(function (responseData) {
        callback(responseData); 
      }) ;
    }
  })
}

const deleteId = function (id) { 
  fetch(
    `${url}${endpoint}/${id}`,
    {
      method: 'DELETE'
    }
  ).then(function (response) {
    if (response.ok && response.status === 200) {
      return response.json().then(function (responseData) {
        getList(function (data) { 
          createTable(data)
        })
      });
    }
  }).catch();
}

const onEdit = function (id) { 
  getId(id)
}

const onDelete = function (id) { 
  const result = confirm('Are you sure you wanna delete this item?');
  if (result) {
    deleteId(id)
  }
}
const show = function () {  
  const heplers = document.querySelectorAll('...');
} 