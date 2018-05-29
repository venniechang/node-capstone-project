function settingChanges() {
    $('#settings').submit(function(event){
        event.preventDefault();

        if(!$('#update-password').val() == $('#verify-password').val()) {
            $('placeholder').html('Passwords do not match. Please check again.');
        }
        else{
            updateUserCredentials()
        }
    })
}

function updateUserCredentials() {

    let user = {
        password: $('#update-password').val(),
        email: $('#update-email').val()
    }

    $.ajax({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        },
        url: '/api/users',
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(user)
    })
    .then(afterSubmission)
}

function afterSubmission(){
    location.href='/entries.html';
}

settingChanges();