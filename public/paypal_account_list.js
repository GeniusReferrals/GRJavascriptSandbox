
$(document).ready(function() {

    var apiUsername = 'alain@hlasolutionsgroup.com';
    var apiToken = '8450103c06dbd58add9d047d761684096ac560ca';

    var client = new gr.client();
    var auth = new gr.auth(apiUsername, apiToken);

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
        if ($(this).data('state') === '1')
        {
            var objResponse1 = client.getAdvocatePaymentMethods(auth, 'genius-referrals', strGRAdvocateToken, 1, 50, 'is_active::true');
            objResponse1.success(function(data) {

                $.each(data.data.results, function(i, elem) {
                    aryPaymentMethod = '{"advocate_payment_method":{"username":"' + $(this).data('email') + '", "description":"' + $(this).data('name') + '"}}';
                    client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, elem.id, $.parseJSON(aryPaymentMethod));
                });
            });
        }

        if ($(this).data('state') === '1')
            aryPaymentMethod = '{"advocate_payment_method":{"username":"' + $(this).data('email') + '", "description":"' + $(this).data('name') + '", "is_active":"true"}}';
        else
            aryPaymentMethod = '{"advocate_payment_method":{"username":"' + $(this).data('email') + '", "description":"' + $(this).data('name') + '"}}';

        $('#' + $(this).attr('id')).button('loading');
        var objResponse2 = client.putAdvocatePaymentMethod(auth, 'genius-referrals', strGRAdvocateToken, $(this).attr('id'), $.parseJSON(aryPaymentMethod));
        objResponse2.success(function(data) {

            arrLocation = objResponse2.getHeader('Location').raw();
            strLocation = arrLocation[0];
            arrParts = strLocation.split('/');
            intAdvocatePaymentMethodId = arrParts.pop();

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

        arrLocation = objResponse2.getHeader('Location').raw();
        strLocation = arrLocation[0];
        arrParts = strLocation.split('/');
        intAdvocatePaymentMethodId = arrParts.pop();

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