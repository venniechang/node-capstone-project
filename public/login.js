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
            (registerSuccess);
        }
    })
}

function registerSuccess(){
    $('.placeholder').text("Account Created, please login");
}

function handleLogin() {
    $('#login').submit(function(event) {
        event.preventDefault();

        const user = {
            username: $('#username').val(),
            password: $('#password').val()
        };
        $.ajax({
            url: '/api/auth/login',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user)
        })
        .then
        (postLogin)
    })
};

function postLogin(response){
    localStorage.setItem('authToken', response.authToken);
    location.href='/entries.html';
}


handleRegistration();
handleLogin();