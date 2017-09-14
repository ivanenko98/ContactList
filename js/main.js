viewListContacts();
$('#btn-add').on('click', showModal);
$('#btn-404').on('click', showModal);

function showModal() {
    $('#modal-add').show();
    $('#close').on('click', function () {
        $('#modal-add').hide();
    });
}
$('#add-new-contact').on('click', addContact);
function addContact() {
    console.log('work');
    let contactList = $('#contact-list');
    let contactListEmpty = $('#contact-list-empty');
    let modal = $('#modal-add');
    let name_new = $('#name-new').val();
    let last_name_new = $('#last-name-new').val();
    let numbers_new = $('.number-new');
    let emails_new = $('.email-new');
    let i;
    console.log(numbers_new);
    function validationNumber() {
        let n;
        for (n = 0; n < numbers_new.length; n++){
            let re = /^\d[\d\(\)\ -]{4,14}\d$/;
            let myPhone = numbers_new.val();
            console.log(myPhone);
            let valid = re.test(myPhone);

            if (valid){

            }else{
                return false;
            }
        }
    }

    function validationEmail() {
        let em;
        for (em = 0; em < emails_new.length; em++){
            let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
            let myEmail = emails_new.val();
            let valid = re.test(myEmail);
            if (valid){
            }else{
                return false;
            }
        }
    }

    if ((name_new !== '') && (numbers_new !== '')){
        if (validationNumber() !== false){
            if (validationEmail() !== false){
                if (checkForUniqueness(name_new, last_name_new, numbers_new, emails_new) !== false){
                    let id_contact = Date.now();

                    let contact = {
                        name: name_new,
                        last_name: last_name_new,
                        number: [],
                        email: [],
                        id: id_contact
                    };

                    for (i = 0; i < numbers_new.length; i++){
                        contact.number.push($('.number-new').eq(i).val());
                    }
                    for (i = 0; i < emails_new.length; i++){
                        contact.email.push($('.email-new').eq(i).val());
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
                    modal.hide();
                    contactListEmpty.hide();
                    contactList.show();

                    // $('#name-new').val() === null;
                    // $('#last-name-new').val() === null;

                    let numbers = $('#number-new');
                    let emails = $('#email-new');

                    let n;
                    for (n = 0; n < numbers.length; n++){
                        $('number-new').get(n).val().empty();
                    }
                    let em;
                    for (em = 0; em < emails.length; em++){
                        $('email-new').get(em).val().empty();
                    }
                }else{
                    alert('Контакт с такими данными уже существует');
                }
            }else{
                alert('Введите корректный E-mail');
            }
        }else{
            alert('Поле "Мобильный" должно содержать только цифры (от 4 до 14 символов)');
        }
    }else{
        alert('Заполните обязательные поля: Имя и Мобильный');
    }
}
function viewListContacts() {
    let contactList = $('#contact-list');
    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    if (returnContacts !== null){

        for (let i = 0; i < returnContacts.length; i++){
            if ($('.contact-info')){
                $('.contact-info').eq(i).text('');
            }
            contactList.append('<div class="contact-info"></div>');
            $('.contact-info').eq(i).append('<div class="name-info"><span class="name" onclick="showContact(this.id)" id="'+ returnContacts[i].id +'">' + returnContacts[i].name + '</span>' + ' ' + '<span class="last-name" onclick="showContact(this.id)" id="'+ returnContacts[i].id +'">' + returnContacts[i].last_name + '</span></div>');
            $('.contact-info').eq(i).append('<div class="numbers"></div>');

            let numbers = $('.numbers').eq(i);
            numbers.append('<div><span class="number">' + returnContacts[i].number[0] + '</span></div>');
            $('.contact-info').eq(i).append('<div class="management"><ul><li><i class="fa fa-pencil" aria-hidden="true" onclick="editContact(this.id)" id="'+ returnContacts[i].id +'"></i></li><li><i class="fa fa-eye" aria-hidden="true" onclick="showContact(this.id)" id="'+ returnContacts[i].id +'"></i></li><li><i class="fa fa-trash" aria-hidden="true" onclick="deleteContact(this.id)" id="'+ returnContacts[i].id +'"></i></li></ul></div>');

            $('.contact-info').each(function() {
                if ($(this).text() === "") {
                    $(this).remove();
                }
            });
        }
    }
    validation(returnContacts);
}
function showContact(contactId) {

    let edit = $('#edit');
    let nameD = $('#name-d');
    let contactList = $('#contact-list');
    let contactDetail = $('#contact-detail');
    let contactEdit = $('#contact-edit');
    let numbersD = $('#numbers-d');
    let emailsD = $('#emails-d');

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    edit.text('');
    nameD.text('');
    numbersD.text('');
    emailsD.text('');

    for (let i = 0; i < returnContacts.length; i++){
        if (returnContacts[i].id == contactId){

            // edit.removeAttribute("id");
            // edit.setAttribute('id', contactId);

            edit.append('<span onclick="editContact(this.id)" id="'+ returnContacts[i].id +'">Редактировать</span><i class="fa fa-pencil"></i>');
            nameD.append('<span class="name-d">' + returnContacts[i].name + '</span>' + ' ' + '<span class="last-name-d">' + returnContacts[i].last_name + '</span>');

            for (let n = 0; n < returnContacts[i].number.length; n++){
                numbersD.append('<span class="numbers-el">' + returnContacts[i].number[n] + '</span>');
            }
            for (let em = 0; em < returnContacts[i].email.length; em++){
                emailsD.append('<span class="emails-el">' + returnContacts[i].email[em] + '</span>');
            }
        }
    }

    contactList.hide();
    contactDetail.show();
    contactEdit.hide();
}

$('#back-d').on('click', goList);
$('#back-e').on('click', goDetail);

function goList() {
    $('#contact-list').show();
    $('#contact-detail').hide();
    $('#contact-edit').hide();
}

function goDetail() {
    $('#contact-list').hide();
    $('#contact-detail').show();
    $('#contact-edit').hide();
}

function deleteContact(contactId) {
    let returnContacts = JSON.parse(localStorage.getItem('contacts'));
    for (let i = 0; i < returnContacts.length; i++){
        if (returnContacts[i].id == contactId){
            returnContacts.splice(i, 1);
            $('.contact-info').eq(i).remove();
        }
    }
    let serialContacts = JSON.stringify(returnContacts);
    localStorage.removeItem('contacts');
    localStorage.setItem('contacts', serialContacts);
    viewListContacts();
}

function editContact(contactId) {
    let save = $('#save');
    let nameE = $('#name-e');
    let titleE = $('#title-e');
    let numbersE = $('#numbers-e');
    let emailsE = $('#emails-e');

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    save.text('');
    nameE.text('');
    titleE.text('');
    numbersE.text('');
    emailsE.text('');

    for (let i = 0; i < returnContacts.length; i++){
        if (returnContacts[i].id == contactId){

            titleE.append('<span><h1 class="title" id="title-e">Редактирование контакта</h1></span>');
            save.append('<span><span id="'+ returnContacts[i].id +'" onclick="saveChanges(this.id)">Сохранить изменения</span><i class="fa fa-pencil"></i></span>');
            nameE.append('<span><input id="edit-name" value='+ returnContacts[i].name +'><input id="edit-last-name" value='+ returnContacts[i].last_name +'></span>')

            for (let n = 0; n < returnContacts[i].number.length; n++){
                let nextId = Date.now() + n;
                numbersE.append('<span><div class = "input-block-number" id="'+ nextId +'"><input class="edit-numbers" value='+ returnContacts[i].number[n] +'><i class="fa fa-times delete-input-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div></span>');
            }

            for (let em = 0; em < returnContacts[i].email.length; em++){
                let nextId = Date.now() + em;
                emailsE.append('<span><div class = "input-block-email" id="'+ nextId +'"><input class="edit-emails" value='+ returnContacts[i].email[em] +'><i class="fa fa-times delete-input-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div></span>');
            }
        }
    }

    showContact(contactId);

    $('#contact-list').hide();
    $('#contact-detail').hide();
    $('#contact-edit').show();
}

function saveChanges(contactId) {
    let i;
    let nameE = $('#edit-name').val();
    let lastNameE = $('#edit-last-name').val();
    let numbersE = $('.edit-numbers');
    let emailsE = $('.edit-emails');

    let returnContacts = JSON.parse(localStorage.getItem('contacts'));

    function validationNumber() {
        let n;
        for (n = 0; n < numbersE.length; n++){
            let re = /^\d[\d\(\)\ -]{4,14}\d$/;
            let myPhone = numbersE.eq(n).val();
            let valid = re.test(myPhone);

            if (valid){

            }else{
                return false;
            }
        }
    }

    function validationEmail() {
        let em;
        for (em = 0; em < emailsE.length; em++){
            let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
            let myEmail = emailsE.eq(em).val();
            let valid = re.test(myEmail);

            if (valid){

            }else{
                return false;
            }
        }
    }

    for (let i = 0; i < returnContacts.length; i++) {
        if (returnContacts[i].id == contactId) {

            if ((nameE !== '') && ((numbersE !== '') || (numbersE !== undefined))) {
                if (validationNumber() !== false) {
                    if (validationEmail() !== false) {
                        // if (checkForUniqueness(nameE, lastNameE, numbersE, emailsE, contactId) !== false) {
                            returnContacts[i] = {
                                name: nameE,
                                last_name: lastNameE,
                                number: [],
                                email: [],
                                id: returnContacts[i].id
                            };

                            for (let n = 0; n < numbersE.length; n++) {
                                let numbersE = $('.edit-numbers').eq(n).val();
                                if (numbersE !== '') {
                                    returnContacts[i].number.push(numbersE);
                                } else {
                                    console.log('Not Worked');
                                }

                            }

                            for (let em = 0; em < emailsE.length; em++) {
                                let emailsE = $('.edit-emails').eq(em).val();
                                if (emailsE !== '') {
                                    returnContacts[i].email.push(emailsE);
                                } else {
                                    console.log('Not Worked');
                                }

                            }

                            let serialContacts = JSON.stringify(returnContacts);
                            localStorage.setItem('contacts', serialContacts);
                            viewListContacts();
                            showContact(contactId);
                        // } else {
                        //     alert('Контакт с такими данными уже существует');
                        // }
                    } else {
                        alert('Введите корректный E-mail');
                    }
                } else {
                    alert('Поле "Мобильный" должно содержать только цифры (от 4 до 14 символов)');
                }
            } else {
                alert('Заполните обязательные поля: Имя и Мобильный');
            }
        }
    }
}
function validation(returnContacts) {
    if (returnContacts == '' || returnContacts === null){
        $('#contact-list').hide();
        $('#contact-list-empty').show();
    }
}

$('#plus-number').on('click', addNumber);
$('#plus-email').on('click', addEmail);

function addNumber() {
    let numbersBlock = $('#numbers-block');
    let nextId = Date.now();
    numbersBlock.append('<span><div class = "input-block-number" id="'+ nextId +'"><input class="number-new"><i class="fa fa-times delete-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div></span>');
}
function addEmail() {
    let emailsBlock = $('#emails-block');
    let nextId = Date.now();
    emailsBlock.append('<span><div class = "input-block-email" id="'+ nextId +'"><input class="email-new"><i class="fa fa-times delete-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div></span>');
}

$('#plus-number-e').on('click', addNumberEdit);

function addNumberEdit() {
    let numbersBlock = $('#numbers-e');
    let nextId = Date.now();
    numbersBlock.append('<span><div class = "input-block-number" id="'+ nextId +'"><input class="edit-numbers"><i class="fa fa-times delete-input-number" id="'+ nextId +'" onclick="deleteNumberElement(this.id)" aria-hidden="true"></i></div></span>');
}

$('#plus-email-e').on('click', addEmailEdit);

function addEmailEdit() {
    let emailsBlock = $('#emails-e');
    let nextId = Date.now();
    emailsBlock.append('<span><div class = "input-block-email" id="'+ nextId +'"><input class="edit-emails"><i class="fa fa-times delete-input-email" id="'+ nextId +'" onclick="deleteEmailElement(this.id)" aria-hidden="true"></i></div></span>');
}

function deleteNumberElement(idInput) {
    let numbersE = $('.input-block-number');
    console.log(numbersE.attr('title'));
    for (let i = 0; i < numbersE.length; i++){
        if (numbersE.eq(i).attr('id') === idInput){
            numbersE.eq(i).remove();
        }
    }
}
function deleteEmailElement(idInput) {
    let emailsE = $('.input-block-email');
    console.log(emailsE.attr('title'));
    for (let i = 0; i < emailsE.length; i++){
        if (emailsE.eq(i).attr('id') === idInput){
            emailsE.eq(i).remove();
        }
    }
}
function searchContact(){
    let input = $('#search');
    let filter = input.val().toUpperCase();
    let contacts = JSON.parse(localStorage.getItem('contacts'));
    let contactsE = $('.contact-info');

    for (let i = 0; i < contacts.length; i++){
              let name = contacts[i].name;
              let lastName = contacts[i].last_name;
              let number = contacts[i].number;
              let email = contacts[i].email;

              function searchByNumber() {

                  for (let n = 0; n < number.length; n++){
                      if (number[n].toUpperCase().indexOf(filter) > -1){
                          return true;
                      }
                  }
              }

              function searchByEmail() {

                  for (let em = 0; em < email.length; em++){
                      if (email[em].toUpperCase().indexOf(filter) > -1){
                          return true;
                      }
                  }
              }

              if (name.toUpperCase().indexOf(filter) > -1 || lastName.toUpperCase().indexOf(filter) > -1 || searchByNumber() === true || searchByEmail() === true){
                  contactsE.eq(i).show();
              }else{
                  contactsE.eq(i).hide();
              }
        }
}
function checkForUniqueness(name_new, last_name_new, numbers_new, emails_new, contactId) {
    let contacts = JSON.parse(localStorage.getItem('contacts'));

    for (let i = 0; i < contacts.length; i++){
        let name = contacts[i].name;
        let lastName = contacts[i].last_name;
        let number = contacts[i].number;
        let email = contacts[i].email;

        if (contacts[i].id == contactId){
            console.log('Нет проверки');
        }else{
            if (name.toUpperCase() === name_new.toUpperCase() || lastName.toUpperCase() === last_name_new.toUpperCase()){
                console.log('Имя или фамилия совпала');
                return false;
            }

            for (let n = 0; n < number.length; n++){
                for (let nNew = 0; nNew < numbers_new.length; nNew++){
                    if (number[n].toUpperCase() === numbers_new[nNew].value.toUpperCase()){
                        console.log('Номер совпал');
                        return false;
                    }
                }
            }
            for (let em = 0; em < email.length; em++){
                for (let eNew = 0; eNew < emails_new.length; eNew++){
                    if (email[em].toUpperCase() === emails_new[eNew].value.toUpperCase()){
                        console.log('Email совпал');
                        return false;
                    }
                }
            }
        }
    }
}
