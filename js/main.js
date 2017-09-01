viewListContacts();
let returnContacts = JSON.parse(localStorage.getItem('contacts'));


let btnAdd = document.getElementById('btn-add');
btnAdd.addEventListener('click', showModal(btnAdd));
let btn404 = document.getElementById('btn-404');
btn404.addEventListener('click', showModal(btn404));

function showModal(btn) {
    let modal = document.getElementById('modal-add');
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
}

function addContact() {
    let contactList = document.getElementById('contact-list');
    let contactListEmpty = document.getElementById('contact-list-empty');
    let modal = document.getElementById('modal-add');
    let name_new = document.getElementById('name-new').value;
    let last_name_new = document.getElementById('last-name-new').value;
    let numbers_new = document.getElementsByClassName('number-new');
    let emails_new = document.getElementsByClassName('email-new');
    let i;

    if ((name_new !== '') && (numbers_new !== '')){
        let id_contact = Date.now();

        let contact = {
            name: name_new,
            last_name: last_name_new,
            number: [],
            email: [],
            id: id_contact
        };

        for (i = 0; i < numbers_new.length; i++){
            contact.number.push(numbers_new[i].value);
            // console.log(numbers_new[i].value);
        }
        for (i = 0; i < emails_new.length; i++){
            contact.email.push(emails_new[i].value);
            console.log(emails_new[i].value);
        }

        // localStorage.removeItem('contacts');
        if (localStorage.getItem('contacts') === null){
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
        modal.style.display = 'none';
        contactListEmpty.style.display = 'none';
        contactList.style.display = 'block';

        document.getElementById('name-new').value = null;
        document.getElementById('last-name-new').value = null;
        document.getElementsByClassName('number-new')[0].value = null;
        document.getElementsByClassName('email-new')[0].value = null;
    }else{
        alert('Заполните обязательные поля: Имя и Мобильный');
    }
}
function searchContact() {
    let search, filter, contact, name;
    search = document.getElementById('search');
    filter = search.value.toUpperCase();
    contact = document.getElementsByClassName('contact-info');
}

function viewListContacts() {
    let contactList = document.getElementById('contact-list');



    // nameInfo.innerHTML = '';
    // numbers.innerHTML = '';
    // emails.innerHTML = '';
    // management.innerHTML = '';


    function viewArrayElements(element, index, array) {
        let returnContacts = JSON.parse(localStorage.getItem('contacts'));
        let contactInfoDel = document.getElementsByClassName('contact-info')[index];
        if (contactInfoDel){
            contactInfoDel.innerHTML = '';
        }else{
            console.log('Elements not found');
        }
        let contactInfo = document.createElement('div');
        contactInfo.setAttribute('class', 'contact-info');
        contactInfo.innerHTML = '';
        contactList.appendChild(contactInfo);

        let contactArrInfo = document.getElementsByClassName('contact-info')[index];
        let nameInfoEl = document.createElement('div');
        nameInfoEl.setAttribute('class', 'name-info');
        nameInfoEl.innerHTML = '<span class="name" onclick="showContact(this.id)" id="'+ returnContacts[index].id +'">' + returnContacts[index].name + '</span>' + ' ' + '<span class="last-name">' + returnContacts[index].last_name + '</span>';
        contactArrInfo.appendChild(nameInfoEl);

        let i;

        let numbersEl = document.createElement('div');
        numbersEl.setAttribute('class', 'numbers');
        contactArrInfo.appendChild(numbersEl);
        let numbers = document.getElementsByClassName('numbers')[index];
        for (i = 0; i < array[index].number.length; i++){
            let numbersEl = document.createElement('div');
            numbersEl.innerHTML = '<span class="number">' + returnContacts[index].number[i] + '</span>';
            numbers.appendChild(numbersEl);
        }

        let emailsEl = document.createElement('div');
        emailsEl.setAttribute('class', 'emails');
        contactArrInfo.appendChild(emailsEl);
        let emails = document.getElementsByClassName('emails')[index];
        for (i = 0; i < array[index].email.length; i++){
            let emailsEl = document.createElement('div');
            emailsEl.innerHTML = '<span class="email">' + returnContacts[index].email[i] + '</span>';
            emails.appendChild(emailsEl);
        }
        let managementEl = document.createElement('div');
        managementEl.setAttribute('class', 'management');
        managementEl.innerHTML = '<ul><li><i class="fa fa-pencil" aria-hidden="true" onclick="editContact(this.id)" id="'+ returnContacts[index].id +'"></i></li><li><i class="fa fa-eye" aria-hidden="true" onclick="showContact(this.id)" id="'+ returnContacts[index].id +'"></i></li><li><i class="fa fa-trash" aria-hidden="true" onclick="deleteContact(this.id)" id="'+ returnContacts[index].id +'"></i></li></ul>';
        contactArrInfo.appendChild(managementEl);

        if (contactInfo.innerHTML === ''){
            contactList.removeChild(contactInfo);
        }

    }
    let returnContacts = JSON.parse(localStorage.getItem('contacts'));
    if (returnContacts !== null){
        returnContacts.forEach(viewArrayElements);
    }


    validation(returnContacts);
}
let contactList = document.getElementById('contact-list');
let contactDetail = document.getElementById('contact-detail');
let contactEdit = document.getElementById('contact-edit');


function showContact(contactId) {

    let edit = document.getElementsByClassName('edit')[0];
    let nameD = document.getElementById('name-d');
    let contactList = document.getElementById('contact-list');
    let contactDetail = document.getElementById('contact-detail');
    let contactEdit = document.getElementById('contact-edit');
    let numbersD = document.getElementById('numbers-d');
    let emailsD = document.getElementById('emails-d');
    let i;
    // let numbersD = document.getElementById('numbers-d');
    // let emailsD = document.getElementById('emails-d');

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    edit.innerHTML = '';
    nameD.innerHTML = '';
    numbersD.innerHTML = '';
    emailsD.innerHTML = '';

    function comparisonId(element, index, array) {
        if (returnContacts[index].id == contactId){
            edit.removeAttribute("id");
            edit.setAttribute('id', contactId);

            let editDEl = document.createElement('span');
            editDEl.innerHTML = '<span onclick="editContact(this.id)" id="'+ returnContacts[index].id +'">Редактировать</span><i class="fa fa-pencil"></i>';
            edit.appendChild(editDEl);

            let nameDEl = document.createElement('span');
            nameDEl.innerHTML = '<span class="name-d">' + returnContacts[index].name + '</span>' + ' ' + '<span class="last-name-d">' + returnContacts[index].last_name + '</span>';
            nameD.appendChild(nameDEl);

            for (i = 0; i < array[index].number.length; i++){
                let numbersDEl = document.createElement('span');
                numbersDEl.setAttribute('class', 'numbers-el');
                numbersDEl.innerHTML = returnContacts[index].number[i];
                numbersD.appendChild(numbersDEl);
            }

            for (i = 0; i < array[index].email.length; i++){
                let emailsDEl = document.createElement('span');
                emailsDEl.setAttribute('class', 'emails-el');
                emailsDEl.innerHTML = returnContacts[index].email[i];
                emailsD.appendChild(emailsDEl);
            }
        }
    }

    returnContacts.forEach(comparisonId);



    contactList.style.display = 'none';
    contactDetail.style.display = 'block';
    contactEdit.style.display = 'none';
}

let backD = document.getElementById('back-d');
let backE = document.getElementById('back-e');
backD.addEventListener('click', goList);
backE.addEventListener('click', goDetail);

function goList() {
    let contactList = document.getElementById('contact-list');
    let contactDetail = document.getElementById('contact-detail');
    let contactEdit = document.getElementById('contact-edit');

    contactList.style.display = 'block';
    contactDetail.style.display = 'none';
    contactEdit.style.display = 'none';
}

function goDetail() {
    let contactList = document.getElementById('contact-list');
    let contactDetail = document.getElementById('contact-detail');
    let contactEdit = document.getElementById('contact-edit');

    contactList.style.display = 'none';
    contactDetail.style.display = 'block';
    contactEdit.style.display = 'none';
}

function deleteContact(contactId) {
    let returnContacts = JSON.parse(localStorage.getItem('contacts'));
    function comparisonIdDel(element, index, array) {
        if (returnContacts[index].id == contactId){
            returnContacts.splice(index, 1);
            let contactInfoDel = document.getElementsByClassName('contact-info')[index];
            contactList.removeChild(contactInfoDel);
            console.log('Element deleted');
        }

    }
    returnContacts.forEach(comparisonIdDel);


    let serialContacts = JSON.stringify(returnContacts);
    localStorage.removeItem('contacts');
    localStorage.setItem('contacts', serialContacts);

    viewListContacts();
}

// let edit = document.getElementsByClassName('edit')[0];
// edit.addEventListener('click', editContact);

function editContact(contactId) {
    let titleE = document.getElementById('title-e');
    let save = document.getElementsByClassName('save')[0];
    let nameE = document.getElementById('name-e');
    let numbersE = document.getElementById('numbers-e');
    let emailsE = document.getElementById('emails-e');
    let i;

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));
    titleE.innerHTML = '';
    save.innerHTML = '';
    nameE.innerHTML = '';
    numbersE.innerHTML = '';
    emailsE.innerHTML = '';

    function comparisonIdEdit(element, index, array) {
        if (returnContacts[index].id == contactId){

            let titleEEl = document.createElement('span');
            titleEEl.innerHTML = '<h1 class="title" id="title-e">Редактирование контакта</h1>';
            titleE.appendChild(titleEEl);

            let saveEEl = document.createElement('span');
            saveEEl.innerHTML = '<span id="'+ returnContacts[index].id +'" onclick="saveChanges(this.id)">Сохранить изменения</span><i class="fa fa-pencil"></i>';
            save.appendChild(saveEEl);

            let nameEEl = document.createElement('span');
            nameEEl.innerHTML = '<input id="edit-name" value='+ array[index].name +'><input id="edit-last-name" value='+ array[index].last_name +'>';
            nameE.appendChild(nameEEl);

            for (i = 0; i < array[index].number.length; i++){
                let numbersEEl = document.createElement('span');
                numbersEEl.innerHTML = '<input class="edit-numbers" value='+ array[index].number[i] +'>';
                numbersE.appendChild(numbersEEl);
            }

            for (i = 0; i < array[index].email.length; i++){
                let emailsEEl = document.createElement('span');
                emailsEEl.innerHTML = '<input class="edit-emails" value='+ array[index].email[i] +'>';
                emailsE.appendChild(emailsEEl);
            }

        }
    }

    returnContacts.forEach(comparisonIdEdit);

    showContact(contactId);

    let contactList = document.getElementById('contact-list');
    let contactDetail = document.getElementById('contact-detail');
    let contactEdit = document.getElementById('contact-edit');

    contactList.style.display = 'none';
    contactDetail.style.display = 'none';
    contactEdit.style.display = 'block';
}

function saveChanges(contactId) {
    let nameE = document.getElementById('edit-name').value;
    let lastNameE = document.getElementById('edit-last-name').value;
    let numbersE = document.getElementsByClassName('edit-numbers');
    let emailsE = document.getElementsByClassName('edit-emails');
    // let emailsE = document.getElementById('edit-emails').value;
    let i;

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    function comparisonIdEdit(element, index, array) {
        if (returnContacts[index].id == contactId){

            returnContacts[index] = {
                name: nameE,
                last_name: lastNameE,
                number: [],
                email: [],
                id: returnContacts[index].id
            };

            for (i = 0; i < numbersE.length; i++){
                let numbersE = document.getElementsByClassName('edit-numbers')[i].value;
                returnContacts[index].number.push(numbersE);
            }

            for (i = 0; i < emailsE.length; i++){
                let emailsE = document.getElementsByClassName('edit-emails')[i].value;
                returnContacts[index].email.push(emailsE);
            }

            let serialContacts = JSON.stringify(returnContacts);
            // localStorage.removeItem('contacts');
            localStorage.setItem('contacts', serialContacts);
            viewListContacts();
        }
    }

    returnContacts.forEach(comparisonIdEdit);
    showContact(contactId);
}

function validation(returnContacts) {
    if (returnContacts == '' || returnContacts === null){
        let contactList = document.getElementById('contact-list');
        let contactListEmpty = document.getElementById('contact-list-empty');
        contactList.style.display = 'none';
        contactListEmpty.style.display = 'block';
        console.log('add new contact');
    }
}

let plusNumber = document.getElementById('plus-number');
plusNumber.addEventListener('click', addNumber);
let plusEmail = document.getElementById('plus-email');
plusEmail.addEventListener('click', addEmail);

function addNumber() {
    let numbersBlock = document.getElementById('numbers-block');

    let numbersAE = document.createElement('span');
    numbersAE.innerHTML = '<input class="number-new">';
    numbersBlock.appendChild(numbersAE);

    console.log('plusNumber');
}
function addEmail() {
    let emailsBlock = document.getElementById('emails-block');

    let emailsAE = document.createElement('span');
    emailsAE.innerHTML = '<input class="email-new">';
    emailsBlock.appendChild(emailsAE);

    console.log('plusEmail');
}
let plusNumberE = document.getElementById('plus-number-e');
plusNumberE.addEventListener('click', addNumberEdit);
function addNumberEdit() {
    let numbersBlock = document.getElementById('numbers-e');

    let numbersAE = document.createElement('span');
    numbersAE.innerHTML = '<input class="edit-numbers">';
    numbersBlock.appendChild(numbersAE);

    console.log('plusNumber');
}

let plusEmailE = document.getElementById('plus-email-e');
plusEmailE.addEventListener('click', addEmailEdit);
function addEmailEdit() {
    let emailsBlock = document.getElementById('emails-e');

    let emailsAE = document.createElement('span');
    emailsAE.innerHTML = '<input class="edit-emails">';
    emailsBlock.appendChild(emailsAE);

    console.log('plusEmail');
}