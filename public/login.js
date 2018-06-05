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
        .catch(err =>{
            console.log(err)
            badLogin()
        })
    })
};

function badLogin(){
    $('.bad-message').show();
}

function postLogin(response){
    localStorage.setItem('authToken', response.authToken);
    location.href='/entries.html';
}

handleLogin();