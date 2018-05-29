function handleLogout(){
    $('#logout-button').click(function(event){
        localStorage.removeItem('authToken');
        location.href='/index.html';
    })
}

handleLogout();