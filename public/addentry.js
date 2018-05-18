function entrySubmission(){
    $('#new-entry').submit(function(event){
        event.preventDefault()
        
        let entryDetails = {
            name: $('#entry-name').val(),
            date: $('#entry-date').val(),
            story: $('#entry-story').val(),
            typeOfEntry: $('input[name=typeOfEntry]:checked').val()
        }
        $.ajax({
            url: '/api/entries',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(entryDetails)
        })
        .then
        (afterSubmission)
    })
}

function afterSubmission(){
    location.href='/entries.html';
}



entrySubmission();

