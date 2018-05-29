'use strict'

function getEntries(){
    return $.ajax({
        type: 'GET',
        url: '/api/entries',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(res => {
        displayEntries(res);
        }
    )
}

function displayEntries(entries){
    $('.dream-entries').empty();
    console.log(entries);
    if (entries.length==0) {
        $('.dream-entries').text('You currently have no entries.')
    }
    else {
        entries.forEach(entry => {
            $('.dream-entries').append(
               `<h2>${entry.name}</h2>
                <p>${entry.date}</p>
                <p>${entry.story}</p>
                <p>${entry.typeOfEntry}</p>`
            )
        })

    }
}

function handleLogout(){
    $('#logout-button').click(function(event){
        localStorage.removeItem('authToken');
        location.href='/index.html';
    })
}

getEntries();
handleLogout();