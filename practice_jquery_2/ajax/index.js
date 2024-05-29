$(document).ready(function (){
    $('#createSmartphone').click(function () {

        let producer = $('#producer').val();
        let model = $('#model').val();
        let price = $('#price').val();
        let newSmartPhone = {
            producer: producer,
            model: model,
            price: price
        }

        $.ajax({
            headers: {'content-type': 'application/json', 'Accept': 'application/json'},
            type: 'POST',
            data: JSON.stringify(newSmartPhone),
            url: 'http://localhost:8080/api/smartphones',
            success: successHandler
        })
        // event.preventDefault();
    });

    function successHandler() {
        $.ajax({
            type: 'GET', url: 'http://localhost:8080//api/smartphones', success: function (data) {
                let content =
                    '<tr>\n' +
                    '<td>Producer</td>\n' +
                    '<td>Model</td>\n' +
                    '<td>Price</td>\n' +
                    '<td colspan="2">Action</td>\n' +
                    '</tr>';
                for (let i= 0; i < data.length; i++) {
                    content += getSmartphone(data[i]);
                }

                document.getElementById('smartphoneList').innerHTML = content;
                $('#productList').val("");
                $('#model').val("");
                $('#price').val("");
                alert('create/update a new smartphone successfully');


                $('.deleteSmartphone').click( function (){
                    let deleteBtn = $(this);
                    let smartphoneId = deleteBtn.attr('data');
                    let deleteConfirm = confirm('Are you sure you want to delete this smartphone?');

                    if (deleteConfirm) {
                        $.ajax({
                            type: 'DELETE', url: `http://localhost:8080/api/smartphones/${smartphoneId}`, success: function (data) {
                                deleteBtn.parent().parent().remove();
                            },
                        })
                    }
                })

                $('.updateSmartphone').click(function () {
                    let updateBtn = $(this);
                    let smartphoneId = updateBtn.data('id');

                    $.ajax({
                        type: 'GET',
                        url: `http://localhost:8080/api/smartphones/${smartphoneId}`,
                        success: function (data) {
                            $('#smartphoneId').val(data.id);
                            $('#producer').val(data.producer);
                            $('#model').val(data.model);
                            $('#price').val(data.price);
                        }
                    })
                })
            },
        })
        // event.preventDefault();
    }

    function getSmartphone(smartphone) {
        return `<tr>
                <td>${smartphone.producer}</td>
                <td>${smartphone.model}</td>
                <td>${smartphone.price}</td> 
                <td><button class="detailSmartphone" data="${smartphone.id}">Detail</button></td> 
                <td><button class="updateSmartphone" data="${smartphone.id}">Update</button></td> 
                <td><button class="deleteSmartphone" data="${smartphone.id}">Delete</button></td>
            </tr>`
    }

    $('#getSmartphoneList').click(function () {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8080/api/smartphones',
            success: function (data) {
                let content =
                    '<tr>\n' +
                    '<td>Producer</td>\n' +
                    '<td>Model</td>\n' +
                    '<td>Price</td>\n' +
                    '<td colspan="2">Action</td>\n' +
                    '</ntr>';
                for (let i= 0; i < data.length; i++) {
                    content += getSmartphone(data[i]);
                }
                document.getElementById('smartphoneList').innerHTML = content;
            }
        })
    })

    $('#updateSmartphone').click(function (event){
        let smartphoneId = $('#smartphoneId').val();
        let producer = $('#producer').val();
        let model = $('#model').val();
        let price = $('#price').val();

        let newSmartphone = {
            id: smartphoneId,
            producer: producer,
            model: model,
            price: price
        }
        let updateConfirm = confirm("Are you sure you want to change this smartphone information?")

        if (updateConfirm){
            $.ajax({
                headers: {'content-type': 'application/json'},
                type: 'PUT',
                data: JSON.stringify(newSmartphone),
                url: '/api/smartphones/update',
                success: successHandler
            })
        }
        // event.preventDefault();
    })
})


