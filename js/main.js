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

    function validationNumber() {
        let n;
        for (n = 0; n < numbers_new.length; n++){
            let re = /^\d[\d\(\)\ -]{4,14}\d$/;
            let myPhone = numbers_new[n].value;
            let valid = re.test(myPhone);

            if (valid){
                console.log('jyguy');
            }else{
                return false;
            }
        }
    }

    function validationEmail() {
        let em;
        for (em = 0; em < emails_new.length; em++){
            let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
            let myEmail = emails_new[em].value;
            let valid = re.test(myEmail);

            if (valid){
                console.log('jyguy');
            }else{
                return false;
            }
        }
    }

    if ((name_new !== '') && (numbers_new !== '')){
        if (validationNumber() !== false && validationEmail() !== false){
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
            }
            for (i = 0; i < emails_new.length; i++){
                contact.email.push(emails_new[i].value);
            }
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
            let numbers = document.getElementsByClassName('number-new');
            let emails = document.getElementsByClassName('email-new');
            let n;
            for (n = 0; n < numbers.length; n++){
                document.getElementsByClassName('number-new')[n].value = null;
            }
            let em;
            for (em = 0; em < emails.length; em++){
                document.getElementsByClassName('email-new')[em].value = null;
            }
        }else{
            alert('Поле "Мобильный" должно содержать только цифры');
        }
    }else{
        alert('Заполните обязательные поля: Имя и Мобильный');
    }
}

function viewListContacts() {
    let contactList = document.getElementById('contact-list');

    function viewArrayElements(element, index, array) {
        let returnContacts = JSON.parse(localStorage.getItem('contacts'));
        let contactInfoDel = document.getElementsByClassName('contact-info')[index];
        if (contactInfoDel){
            contactInfoDel.innerHTML = '';
        }
        let contactInfo = document.createElement('div');
        contactInfo.setAttribute('class', 'contact-info');
        contactInfo.innerHTML = '';
        contactList.appendChild(contactInfo);

        let contactArrInfo = document.getElementsByClassName('contact-info')[index];
        let nameInfoEl = document.createElement('div');
        nameInfoEl.setAttribute('class', 'name-info');
        nameInfoEl.innerHTML = '<span class="name" onclick="showContact(this.id)" id="'+ returnContacts[index].id +'">' + returnContacts[index].name + '</span>' + ' ' + '<span class="last-name" onclick="showContact(this.id)" id="'+ returnContacts[index].id +'">' + returnContacts[index].last_name + '</span>';
        contactArrInfo.appendChild(nameInfoEl);

        // let i;

        // let numbersEl = document.createElement('div');
        // numbersEl.setAttribute('class', 'numbers');
        // contactArrInfo.appendChild(numbersEl);
        // let numbers = document.getElementsByClassName('numbers')[index];
        // for (i = 0; i < array[index].number.length; i++){
        //     let numbersEl = document.createElement('div');
        //     numbersEl.innerHTML = '<span class="number">' + returnContacts[index].number[i] + '</span>';
        //     numbers.appendChild(numbersEl);
        // }

        let numbersEBl = document.createElement('div');
        numbersEBl.setAttribute('class', 'numbers');
        contactArrInfo.appendChild(numbersEBl);
        let numbers = document.getElementsByClassName('numbers')[index];
        let numbersEl = document.createElement('div');
            numbersEl.innerHTML = '<span class="number">' + returnContacts[index].number[0] + '</span>';
            numbers.appendChild(numbersEl);

        // let emailsEl = document.createElement('div');
        // emailsEl.setAttribute('class', 'emails');
        // contactArrInfo.appendChild(emailsEl);
        // let emails = document.getElementsByClassName('emails')[index];
        // for (i = 0; i < array[index].email.length; i++){
        //     let emailsEl = document.createElement('div');
        //     emailsEl.innerHTML = '<span class="email">' + returnContacts[index].email[i] + '</span>';
        //     emails.appendChild(emailsEl);
        // }
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


function showContact(contactId) {

    let edit = document.getElementsByClassName('edit')[0];
    let nameD = document.getElementById('name-d');
    let contactList = document.getElementById('contact-list');
    let contactDetail = document.getElementById('contact-detail');
    let contactEdit = document.getElementById('contact-edit');
    let numbersD = document.getElementById('numbers-d');
    let emailsD = document.getElementById('emails-d');
    let i;

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
                let nextId = Date.now() + i;
                let numbersEEl = document.createElement('span');
                numbersEEl.innerHTML = '<div class = "input-block-number" id="'+ nextId +'"><input class="edit-numbers" value='+ array[index].number[i] +'><i class="fa fa-times delete-input-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div>';
                numbersE.appendChild(numbersEEl);
            }

            for (i = 0; i < array[index].email.length; i++){
                let nextId = Date.now() + i;
                let emailsEEl = document.createElement('span');
                emailsEEl.innerHTML = '<div class = "input-block-email" id="'+ nextId +'"><input class="edit-emails" value='+ array[index].email[i] +'><i class="fa fa-times delete-input-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div>';
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
                if (numbersE !== ''){
                    returnContacts[index].number.push(numbersE);
                }else{
                    console.log('Not Worked');
                }

            }

            for (i = 0; i < emailsE.length; i++){
                let emailsE = document.getElementsByClassName('edit-emails')[i].value;
                if (emailsE !== ''){
                    returnContacts[index].email.push(emailsE);
                }else{
                    console.log('Not Worked');
                }

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
    }
}

let plusNumber = document.getElementById('plus-number');
plusNumber.addEventListener('click', addNumber);
let plusEmail = document.getElementById('plus-email');
plusEmail.addEventListener('click', addEmail);

function addNumber() {
    let numbersBlock = document.getElementById('numbers-block');

    let nextId = Date.now();

    let numbersAE = document.createElement('span');
    numbersAE.innerHTML = '<div class = "input-block-number" id="'+ nextId +'"><input class="number-new"><i class="fa fa-times delete-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div>';
    numbersBlock.appendChild(numbersAE);
}
function addEmail() {
    let emailsBlock = document.getElementById('emails-block');

    let nextId = Date.now();

    let emailsAE = document.createElement('span');
    emailsAE.innerHTML = '<div class = "input-block-email" id="'+ nextId +'"><input class="email-new"><i class="fa fa-times delete-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div>';
    emailsBlock.appendChild(emailsAE);
}

let plusNumberE = document.getElementById('plus-number-e');
plusNumberE.addEventListener('click', addNumberEdit);
function addNumberEdit() {
    let numbersBlock = document.getElementById('numbers-e');

    let nextId = Date.now();

    let numbersAE = document.createElement('span');
    numbersAE.innerHTML = '<div class = "input-block-number" id="'+ nextId +'"><input class="edit-numbers"><i class="fa fa-times delete-input-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div>';
    numbersBlock.appendChild(numbersAE);

}

let plusEmailE = document.getElementById('plus-email-e');
plusEmailE.addEventListener('click', addEmailEdit);
function addEmailEdit() {
    let emailsBlock = document.getElementById('emails-e');

    let nextId = Date.now();

    let emailsAE = document.createElement('span');
    emailsAE.innerHTML = '<div class = "input-block-email" id="'+ nextId +'"><input class="edit-emails"><i class="fa fa-times delete-input-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div>';

    emailsBlock.appendChild(emailsAE);

}

function deleteNumberElement(idInput) {
    let numbersE = document.getElementsByClassName('input-block-number');
    let i;

    for (i = 0; i < numbersE.length; i++){
        let numbersE = document.getElementsByClassName('input-block-number');

        if (numbersE[i].id == idInput){
            numbersE[i].parentNode.removeChild(numbersE[i]);
        }
    }
}
function deleteEmailElement(idInput) {
    let emailsE = document.getElementsByClassName('input-block-email');
    let i;

    for (i = 0; i < emailsE.length; i++){
        let emailsE = document.getElementsByClassName('input-block-email');

        if (emailsE[i].id == idInput){
            emailsE[i].parentNode.removeChild(emailsE[i]);
        }
    }
}

function searchContact(){
    let input = document.getElementById('search');
    let filter = input.value.toUpperCase();
    let contacts = document.getElementsByClassName('contact-info');
    let i, n, em;


    for (i = 0; i < contacts.length; i++){
        let name = contacts[i].getElementsByClassName('name-info')[0].getElementsByClassName('name')[0];
        let lastName = contacts[i].getElementsByClassName('name-info')[0].getElementsByClassName('last-name')[0];
        let number = contacts[i].getElementsByClassName('numbers')[0].getElementsByClassName('number');
        let email = contacts[i].getElementsByClassName('emails')[0].getElementsByClassName('email');
        
        function searchByNumber() {

            for (n = 0; n < number.length; n++){
                if (number[n].innerHTML.toUpperCase().indexOf(filter) > -1){
                    return true;
                }
            }
        }

        function searchByEmail() {

            for (em = 0; em < email.length; em++){
                if (email[em].innerHTML.toUpperCase().indexOf(filter) > -1){
                    return true;
                }
            }
        }

        if (name.innerHTML.toUpperCase().indexOf(filter) > -1 || lastName.innerHTML.toUpperCase().indexOf(filter) > -1 || searchByNumber() === true || searchByEmail() === true){
            contacts[i].style.display = '';
        }else{
            contacts[i].style.display = 'none';
        }
  }
}