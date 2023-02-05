const webDomain = 'https://f640-182-48-235-254.in.ngrok.io';


const addrFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 

const pwdLength = /^.{8,16}$/;
const pwdUpper = /[A-Z]+/;
const pwdLower = /[a-z]+/;
const pwdNumber = /[0-9]+/;
const pwdSpecial = /[!@#$%^&()'[\]"?+-/*={}.,;:_]+/;


const delay = ms => new Promise((resolve) => {
    setTimeout(()=>{
        resolve();
    },ms);
});

const emailField = $('#email');
const passField = $('#pass');
const confPassField = $('#confPass');

const emailErr = $('#emailErr');
const passErr = $('#passErr');
const confPassErr = $('#confPassErr');

const submitBtn = $('#frm-submit');

let isValidEmail = false;
let isValidPass = false;
let isValidConfPass = false;

const onEmailInput = (event) => {
    if(event.keyCode == 8 || event.keyCode == 46){
        validateEmailAddress();
    }
    if(isValidEmail && isValidPass && isValidConfPass){
        submitBtn.removeAttr('disabled');
        return;
    }
    submitBtn.attr('disabled','disabled');
}

const onEmailFocusIn = () => {
    if(emailErr.is(':visible')){
        emailErr.fadeOut(500);
    }
}

const validateConfirmPassword = () => {
    if(passField.val() == confPassField.val()){
        isValidConfPass = true;
        if(confPassErr.is(':visible')){
            confPassErr.fadeOut(500);
        }
        if(isValidEmail && isValidPass){
            submitBtn.removeAttr('disabled');
        }
        return true;
    }
    isValidConfPass = false;
    if(!confPassErr.is(':visible')){
        if(!passErr.is(':visible')){
            confPassErr.fadeIn(500);
        }
    }
    submitBtn.attr('disabled','disabled');
}


/* Validates Password Field */
const validatePassword = () => {
    let password = passField.val();
    if(pwdLength.test(password) && pwdUpper.test(password) && pwdLower.test(password) && pwdNumber.test(password) && pwdSpecial.test(password)){
        isValidPass = true;
        confPassField.removeAttr('disabled');
        if(passErr.is(':visible')){
            passErr.fadeOut(500);
        }
        if(isValidEmail && isValidConfPass){
            submitBtn.removeAttr('disabled');
        }
        if(confPassField.val() != ''){
            validateConfirmPassword();
        }
        return true;
    }
    isValidPass = false;
    if(!passErr.is(':visible')){
        if(confPassErr.is(':visible')){
            confPassErr.fadeOut(500);
        }
        passErr.fadeIn(500);
    }
    if(confPassField.val() != ''){
        validateConfirmPassword();
    }
    submitBtn.attr('disabled','disabled');
    return false;
}

const validateEmailAddress = () => {
    let email = emailField.val();
    if(!addrFormat.test(email)){
        isValidEmail = false;
        emailErr.fadeIn(500);
        passField.attr('disabled','disabled');
        confPassField.attr('disabled','disabled');
        submitBtn.attr('disabled','disabled');
        return false;
    }
    isValidEmail = true;
    passField.removeAttr('disabled');
    if(passField.val() != ""){
        confPassField.removeAttr('disabled');
    }
    emailErr.fadeOut(500);
    return true;
}


/* On Submitting the Form */
$('#signup-form').submit(async (e)=>{
    e.preventDefault();
    let submitBtn = $('#frm-submit');
    submitBtn.attr('disabled','disabled')
    .val("Submitted!")
    .fadeTo(1000,0.8);
        
    const reqBody = {
        email: emailField.val(),
        pass: confPassField.val()
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(reqBody)
    };

    await fetch(`${webDomain}/signup`,options).then(() => {
        submitBtn.removeAttr('disabled')
        .val("Submit")
        .fadeTo(500,1);
    }).catch((err) => {
        console.log(err);
    });

});

emailField.on({
    'keyup':
    onEmailInput,
    'focusin':
    onEmailFocusIn,
    'input':
    onEmailInput,
    'focusout':
    validateEmailAddress
});

passField.on({
    'input':
    validatePassword
});

confPassField.on({
    'input':
    validateConfirmPassword
});