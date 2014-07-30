
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    if (sessionStorage.getItem('strAdvocateToken') != '')
        var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');

    /**
     * New paypal account.
     */
    $('#btn_new_paypal_account').click(function(e) {

        var isValid = validatePaypalAccount();
        if (isValid) {

            paypal_username = $('#paypal_username').val();
            paypal_description = $('#paypal_description').val();

            $('#btn_new_paypal_account').button('loading');
            $('#btn_new_paypal_account').removeClass('btn-primary');
            $('#btn_new_paypal_account').addClass('btn-info');

            if ($('#paypal_is_active').val() === '1')
            {
                var objResponse1 = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50, 'is_active::true');
                objResponse1.success(function(data) {

                    $.each(data.data.results, function(i, elem) {
                        arrPaymentMethod = '{"advocate_payment_method":{"username":"' + elem.username + '", "description":"' + elem.description + '"}}';
                        client.putAdvocatePaymentMethod(auth, strAccount, strGRAdvocateToken, elem.id, $.parseJSON(arrPaymentMethod));
                    });
                });
            }
            if ($('#paypal_is_active').val() === '1')
                arrPaymentMethod = '{"advocate_payment_method":{"username":"' + paypal_username + '", "description":"' + paypal_description + '", "is_active":true}}';
            else
                arrPaymentMethod = '{"advocate_payment_method":{"username":"' + paypal_username + '", "description":"' + paypal_description + '"}}';

            var objResponse2 = client.postAdvocatePaymentMethod(auth, strAccount, strGRAdvocateToken, $.parseJSON(arrPaymentMethod));
            objResponse2.success(function(data) {

                var objResponse3 = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50);
                objResponse3.success(function(data) {
                    $('#paypal_account').append('<option value="' + paypal_username + '">' + paypal_username + '</option>');

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

                    $('#btn_new_paypal_account').button('reset');
                    $('#btn_new_paypal_account').removeClass('btn-info');
                    $('#btn_new_paypal_account').addClass('btn-primary');

                    $('#form_paypal_account #paypal_username').val('');
                    $('#form_paypal_account #paypal_description').val('');
                    document.getElementById('paypal_is_active').selectedIndex = 0;
                    $('#newPaypalAccountModal').modal('hide');
                });
            });
        }
    });
});

/**
 * Validate form_paypal_account.
 */
function validatePaypalAccount()
{
    $('#form_paypal_account').validate({
        rules: {
            'paypal_username': {required: true, email: true},
            'paypal_description': {required: true},
        }
    });
    return $('#form_paypal_account').valid();
}
