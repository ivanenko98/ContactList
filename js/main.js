viewListContacts();
let modal = document.getElementById('modal-add');
let btn = document.getElementById('btn-add');
let close = document.getElementsByClassName('close')[0];

btn.onclick = function () {
    modal.style.display = 'block';
};
close.onclick = function () {
    modal.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

function addContact() {

    let name_new = document.getElementById('name-new').value;
    let last_name_new = document.getElementById('last-name-new').value;
    let number_new = document.getElementsByClassName('number-new')[0].value;
    let email_new = document.getElementsByClassName('email-new')[0].value;
    console.log(name_new, last_name_new, number_new, email_new);
    let id_contact = Date.now();

    let contact = {
        name: name_new,
        last_name: last_name_new,
        number: [number_new],
        email: [email_new],
        id: id_contact
    };
    // localStorage.removeItem('contacts');
    if (localStorage.getItem('contacts') === null){
        console.log('Не найдено в локальной памяти');
        let returnContacts = [];
        returnContacts.push(contact);
        let serialContacts = JSON.stringify(returnContacts);
        localStorage.setItem('contacts', serialContacts);
        viewListContacts();
    }else{
        let returnContacts = JSON.parse(localStorage.getItem('contacts'));
        returnContacts.push(contact);
        let serialContacts = JSON.stringify(returnContacts);
        localStorage.setItem('contacts', serialContacts);
        viewListContacts();
    }
}
function searchContact() {
    let search, filter, contact, name;
    search = document.getElementById('search');
    filter = search.value.toUpperCase();
    contact = document.getElementsByClassName('contact-info');
}
function viewListContacts() {
    let nameInfo = document.getElementById('name-info');
    let numbers = document.getElementById('numbers');
    let emails = document.getElementById('emails');
    let management = document.getElementById('management');

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    nameInfo.innerHTML = '';
    numbers.innerHTML = '';
    emails.innerHTML = '';
    management.innerHTML = '';

    function viewArrayElements(element, index, array) {
        let nameInfoEl = document.createElement('span');
        nameInfoEl.innerHTML = '<span class="name">' + returnContacts[index].name + '</span>' + ' ' + '<span class="last-name">' + returnContacts[index].last_name + '</span>';
        nameInfo.appendChild(nameInfoEl);

        let numbersEl = document.createElement('span');
        numbersEl.innerHTML = '<span class="number">' + returnContacts[index].number + '</span>';
        numbers.appendChild(numbersEl);

        let emailsEl = document.createElement('span');
        emailsEl.innerHTML = '<span class="email">' + returnContacts[index].email + '</span>';
        emails.appendChild(emailsEl);

        let managementEl = document.createElement('span');
        managementEl.innerHTML = '<ul><li><i class="fa fa-pencil" aria-hidden="true"></i></li><li><i class="fa fa-eye" aria-hidden="true"></i></li><li><i class="fa fa-trash" aria-hidden="true"></i></li></ul>';
        management.appendChild(managementEl);
    }

    if (returnContacts !== null){
        returnContacts.forEach(viewArrayElements);
    }else{
        console.log('add new contact');
    }

}
let contactList = document.getElementById('contact-list');
let contactDetail = document.getElementById('contact-detail');
let nameInfo = document.getElementById('name-info');

nameInfo.addEventListener('click', showContact);

function showContact() {
    contactList.style.display = 'none';
    contactDetail.style.display = 'block';
}

let back = document.getElementById('back');
back.addEventListener('click', goBack);

function goBack() {
    contactList.style.display = 'block';
    contactDetail.style.display = 'none';
}

