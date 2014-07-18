
$(document).ready(function() {

    var apiUsername = 'alain@hlasolutionsgroup.com';
    var apiToken = '8450103c06dbd58add9d047d761684096ac560ca';

    var client = new gr.client();
    var auth = new gr.auth(apiUsername, apiToken);

    if (sessionStorage.getItem('strAdvocateToken') != '')
    {
        var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');

        var response = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50);
        response.success(function(data) {

            $.each(data.data, function(i, elem) {
                if (elem.is_active == 0)
                {
                    icon_is_active = 'glyphicon glyphicon-remove-circle';
                    state = 1;
                    title = 'Active';
                }

                else
                {
                    icon_is_active = 'glyphicon glyphicon-check';
                    state = 0;
                    title = 'Desactive';
                }
                row_account = $('<tr>' +
                        '<td>' + data.data.description + '</td>' +
                        '<td>' + data.data.username + '</td>' +
                        '<td><span class="' + icon_is_active + '"></span></td>' +
                        '<td class="actions">' +
                        '<a type="button" id="' + data.data.id + '" data-loading-text="Loading..." data-name="' + data.data.description + '" data-email="' + data.data.username + '" data-state="' + state + '" class="activate_desactivate" onclick="activateDesactivate(\'' + data.data.id + '-' + data.data.description + '-' + data.data.username + '-' + state + '\')">' + title + '</a>' +
                        '</td>' +
                        '</tr>');
                $('#table_payment').append(row_account);
            });
        });
    }

    $('#new_paypal_account_ajax').click(function(e) {
        
        e.preventDefault();
        var stepRequest = $.ajax({
            type: "GET",
            url: 'new_paypal_account.php'
        });
        $('#newPaypalAccountModal').modal('show');
        stepRequest.done(function(response) {
            if (response) {
                $('#newPaypalAccountModal').html(response);
            }
        });
    });

    $('.activate_desactivate').click(function(e) {

        e.preventDefault();
        id = $(this).attr('id');
        username = $(this).data('email');
        description = $(this).data('name');
        state = $(this).data('state');

        if (state === '1')
        {
            var objResponse1 = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50, 'is_active::true');
            objResponse1.success(function(data) {

                $.each(data.data.results, function(i, elem) {
                    aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';
                    client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, elem.id, $.parseJSON(aryPaymentMethod));
                });
            });
        }

        if (state === '1')
            aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '", "is_active":"true"}}';
        else
            aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';

        $('#' + $(this).attr('id')).button('loading');
        var objResponse2 = client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, id, $.parseJSON(aryPaymentMethod));
        objResponse2.success(function(data) {

            var objResponse3 = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50);
            objResponse3.success(function(data) {

                $('#table_payment td').remove();
                $.each(data.data.results, function(i, elem) {
                    if (elem.is_active == 0)
                    {
                        icon_is_active = 'glyphicon glyphicon-remove-circle';
                        state = 1;
                        title = 'Active';
                    }

                    else
                    {
                        icon_is_active = 'glyphicon glyphicon-check';
                        state = 0;
                        title = 'Desactive';
                    }
                    row_account = $('<tr>' +
                            '<td>' + elem.description + '</td>' +
                            '<td>' + elem.username + '</td>' +
                            '<td><span class="' + icon_is_active + '"></span></td>' +
                            '<td class="actions">' +
                            '<a type="button" id="' + elem.id + '" data-loading-text="Loading..." data-name="' + elem.description + '" data-email="' + elem.username + '" data-state="' + state + '" class="activate_desactivate" onclick="activateDesactivate(\'' + elem.id + '-' + elem.description + '-' + elem.username + '-' + state + '\')">' + title + '</a>' +
                            '</td>' +
                            '</tr>');
                    $('#table_payment').append(row_account);
                });

                $('#' + $(this).attr('id')).button('reset');
            });
        });
    });
});

function activateDesactivate(data) {

    result = data.split('-');
    payment_method_id = result[0];
    description = result[1];
    username = result[2];
    is_active = result[3];

    if (is_active === '1')
    {
        var objResponse1 = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50, 'is_active::true');
        objResponse1.success(function(data) {

            $.each(data.data.results, function(i, elem) {
                aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';
                client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, elem.id, $.parseJSON(aryPaymentMethod));
            });
        });
    }

    if (is_active === '1')
        aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '", "is_active":"true"}}';
    else
        aryPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';

    $('#' + payment_method_id).button('loading');
    var objResponse2 = client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, payment_method_id, $.parseJSON(aryPaymentMethod));
    objResponse2.success(function(data) {

        var objResponse3 = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50);
        objResponse3.success(function(data) {

            $('#table_payment td').remove();
            $.each(data.data.results, function(i, elem) {
                if (elem.is_active == 0)
                {
                    icon_is_active = 'glyphicon glyphicon-remove-circle';
                    state = 1;
                    title = 'Active';
                }

                else
                {
                    icon_is_active = 'glyphicon glyphicon-check';
                    state = 0;
                    title = 'Desactive';
                }
                row_account = $('<tr>' +
                        '<td>' + elem.description + '</td>' +
                        '<td>' + elem.username + '</td>' +
                        '<td><span class="' + icon_is_active + '"></span></td>' +
                        '<td class="actions">' +
                        '<a type="button" id="' + elem.id + '" data-loading-text="Loading..." data-name="' + elem.description + '" data-email="' + elem.username + '" data-state="' + state + '" class="activate_desactivate" onclick="activateDesactivate(\'' + elem.id + '-' + elem.description + '-' + elem.username + '-' + state + '\')">' + title + '</a>' +
                        '</td>' +
                        '</tr>');
                $('#table_payment').append(row_account);
            });

            $('#' + payment_method_id).button('reset');
        });
    });
}