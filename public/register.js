function handleRegistration(){
    $('#register').submit(function(event){
        event.preventDefault();

        const newUser = {
            username: $('#new-username').val(),
            password: $('#new-password').val(),
            email: $('#new-email').val()
        }

        if(!$('#new-password').val() == $('#verify-password').val()) {
            return('Password does not match. Please try again.')     
        }
        else {
            $.ajax({
                url: '/api/users', 
                type: 'POST', 
                contentType: 'application/json', 
                data: JSON.stringify(newUser)
            })
            .then
            (registerSuccess)
            .catch(registerFail)
        }
    })
}

function registerFail(error){
    $('.placeholder').text(error.responseJSON.message)
}


function registerSuccess(){
    $('.placeholder').text("Account Created, please login.");
}


handleRegistration();