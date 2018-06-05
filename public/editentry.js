function entrySubmission(){
    $('#entry-id').val(window.location.search.split('=')[1])
    $('#new-entry').submit(function(event){
        event.preventDefault()
        
        let entryDetails = {
            name: $('#entry-name').val(),
            date: $('#entry-date').val(),
            story: $('#entry-story').val(),
            typeOfEntry: $('input[name=typeOfEntry]:checked').val()
        }
        $.ajax({
            url: `/api/entries/${$('#entry-id').val()}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(entryDetails),
            headers: {
                Authorization: `Bearer ${localStorage.getItem('authToken')}`
            }
        })
        .then
        (afterSubmission)
    })
}

function afterSubmission(){
    location.href='/entries.html';
}

entrySubmission();