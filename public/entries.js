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
                <p>${entry.typeOfEntry}</p>
                <button class='edit-button' data-id=${entry._id}>Edit Entry</button>
                <button class='delete-button' data-id=${entry._id}>Delete Entry</button>`
            )
        })

    }
}

function deleteEntries() {
    $('.dream-entries').on('click', '.delete-button', function(event) {
        return $.ajax({
            type:'DELETE',
            url: `/api/entries/${$(this).data('id')}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then(res => {
        getEntries();
        })
    })
}


function editEntries() {
    $('.dream-entries').on('click', '.edit-button', function(event) {
        event.preventDefault();
        location.href=`/editentry.html?id=${$(this).data('id')}`;
    })

}

function handleLogout(){
    $('#logout-button').click(function(event){
        localStorage.removeItem('authToken');
        location.href='/index.html';
    })
}

deleteEntries();
getEntries();
handleLogout();
editEntries();