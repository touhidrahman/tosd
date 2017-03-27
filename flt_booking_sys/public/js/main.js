$(document).ready(function () {
  // first book button 
  let form = $('#firstBookForm')
  form.submit(function (e) {
    e.preventDefault()

    let id = form.find("input[name='id']").val()
    let pax = form.find("input[name='pax']").val()
    $.post(
      form.attr('action'),
      {id: id, pax: pax},
      function (result) {
        $('#statusFirst').removeClass('invisible')
        $('#firstItnID').attr('href', '/travel-details/' + result.reservationId)
      }
    )
  })

  // return book button
  let form2 = $('#returnBookForm')
  form2.submit(function (e) {
    e.preventDefault()

    let id = form2.find("input[name='id']").val()
    let pax = form2.find("input[name='pax']").val()
    $.post(
      form2.attr('action'),
      {id: id, pax: pax},
      function (result) {
        $('#statusReturn').removeClass('invisible')
        $('#returnItnID').attr('href', '/travel-details/' + result.reservationId)
      }
    )
  })
})
