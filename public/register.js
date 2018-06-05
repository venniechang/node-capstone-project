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
            .catch(res => {
            console.log(res);
            })
        }
    })
}

function registerSuccess(){
    $('.placeholder').text("Account Created, please login");
}


handleRegistration();