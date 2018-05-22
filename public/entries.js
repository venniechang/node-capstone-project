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
    
}


getEntries();
