// الحصول على العناصر بواسطة معرفاتها
let title = document.getElementById('title');
let price = document.getElementById('Price');
let taxes = document.getElementById('Taxes');
let ads = document.getElementById('Ads');
let discount = document.getElementById('Discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let Catagory = document.getElementById('Catagory');
let Submit = document.getElementById('Submit');
let mood = 'creat';
let tmp;
let tbody = document.getElementById('tbody')
// حساب المجموع
function getTotal() {
    if (price.value !== '') {
        let priceValue = parseFloat(price.value) || 0;
        let taxesValue = parseFloat(taxes.value) || 0;
        let adsValue = parseFloat(ads.value) || 0;
        let discountValue = parseFloat(discount.value) || 0;

        let result = (priceValue + taxesValue + adsValue) - discountValue;
        total.innerHTML = result;
        total.style.background = 'rgba(0, 240, 0, 0.493)';
        total.style.color = 'white';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
        total.style.color = 'white';
    }
}
total.style.transition = '1.5s';

// إنشاء المنتج
let dataPro;

if (localStorage.Product != null) {
    dataPro = JSON.parse(localStorage.Product);
} else {
    dataPro = [];
}

Submit.onclick = function() {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        catagory: Catagory.value.toLowerCase(),
    }
    if(title.value != ''&& price.value !=''&& Catagory.value != ''&& newPro.count < 100){
        if(mood === 'create'){
        if (newPro.count > 1) {
            for (let i = 0; i < newPro.count; i++) {
                dataPro.push(newPro);
            }
        } else {
            dataPro.push(newPro);
        }
    }else{
        dataPro[  tmp  ] = newPro;
        mood = 'create';
        Submit.innerHTML = 'Create'
        count.style.display = 'block';
    }
    clearData();
    }
    
    

    localStorage.setItem('Product', JSON.stringify(dataPro));

    showData();
};

function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    Catagory.value = '';
}

function showData(){
    getTotal()
    let table = '';
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].catagory}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
        </tr>`;
    }
    document.getElementById('tbody').innerHTML = table;

    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length > 0){
        btnDelete.innerHTML = '<button onclick="deleteAll()">Delete All</button>';
    } else {
        btnDelete.innerHTML = '';
    }
}

// عرض البيانات عند تحميل الصفحة
showData();

function updateData(index) {
    title.value = dataPro[index].title;
    price.value = dataPro[index].price;
    taxes.value = dataPro[index].taxes;
    ads.value = dataPro[index].ads;
    discount.value = dataPro[index].discount;
    count.value = dataPro[index].count;
    Catagory.value = dataPro[index].catagory;
    getTotal();
    count.style.display = 'none'
    Submit.innerHTML = 'Update'
    mood = 'Update';
    tmp = index;
    scroll({
        top:0,
        behavior:"smooth"
    }) 
}
function deleteData(index) {
    dataPro.splice(index, 1);
    localStorage.setItem('Product', JSON.stringify(dataPro));
    showData();
}

function deleteAll(){
    localStorage.clear();
    dataPro = [];
    document.getElementById('tbody').innerHTML = '';
    showData();
}


let searchMood = 'title';
function getSearchMood(id) {
    let search = document.getElementById('Search');
    if (id == 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'Catagory';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus()
    search.value = '';
    showData();
}


function searchData(value){
    let table = '';
for(let i = 0; i < dataPro.length;i++){
    if(searchMood == 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += `
                          <tr>
                              <td>${i + 1}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].catagory}</td>
                              <td><button id="update" onclick="updateData(${i})">Update</button></td>
                              <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                           </tr>`;
            }
    }else{
            if(dataPro[i].catagory.includes(value.toLowerCase())){
                table += `
                          <tr>
                              <td>${i + 1}</td>
                              <td>${dataPro[i].title}</td>
                              <td>${dataPro[i].price}</td>
                              <td>${dataPro[i].taxes}</td>
                              <td>${dataPro[i].ads}</td>
                              <td>${dataPro[i].discount}</td>
                              <td>${dataPro[i].total}</td>
                              <td>${dataPro[i].catagory}</td>
                              <td><button id="update" onclick="updateData(${i})">Update</button></td>
                              <td><button id="delete" onclick="deleteData(${i})">Delete</button></td>
                           </tr>`;
            }
        
    }
}
    document.getElementById('tbody').innerHTML = table;
}