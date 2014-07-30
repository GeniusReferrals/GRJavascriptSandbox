
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    if (sessionStorage.getItem('strAdvocateToken') != '')
        var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');

    /**
     * Get advocate payment methods.
     */
    var response = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50);
    response.success(function(data) {

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
                    '<a id="' + elem.id + '" data-loading-text="Loading..." onclick="activateDesactivate(\'' + elem.id + '-' + elem.description + '-' + elem.username + '-' + state + '\')">' + title + '</a>' +
                    '</td>' +
                    '</tr>');
            $('#table_payment').append(row_account);
        });
    });

    /**
     * Load modal new paypal account.
     */
    $('#new_paypal_account_ajax').click(function(e) {

        e.preventDefault();
        var request = $.ajax({
            type: "GET",
            url: 'new_paypal_account.php'
        });
        $('#newPaypalAccountModal').modal('show');
        request.done(function(response) {
            if (response) {
                $('#newPaypalAccountModal').html(response);
            }
        });
    });
});

/**
 * Activate or desactivate paypal account.
 */
function activateDesactivate(data) {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');

    result = data.split('-');
    payment_method_id = result[0];
    description = result[1];
    username = result[2];
    is_active = result[3];

    $('#' + payment_method_id).button('loading');

    if (is_active === '1')
    {
        var objResponse1 = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50, 'is_active::true');
        objResponse1.success(function(data) {

            $.each(data.data.results, function(i, elem) {
                arrPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';
                client.putAdvocatePaymentMethod(auth, strAccount, strGRAdvocateToken, elem.id, $.parseJSON(arrPaymentMethod));
            });
        });
    }

    if (is_active === '1')
        arrPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '", "is_active":true}}';
    else
        arrPaymentMethod = '{"advocate_payment_method":{"username":"' + username + '", "description":"' + description + '"}}';

    var objResponse2 = client.putAdvocatePaymentMethod(auth, strAccount, strGRAdvocateToken, payment_method_id, $.parseJSON(arrPaymentMethod));
    objResponse2.success(function(data) {

        var objResponse3 = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50);
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
                        '<a id="' + elem.id + '" data-loading-text="Loading..." onclick="activateDesactivate(\'' + elem.id + '-' + elem.description + '-' + elem.username + '-' + state + '\')">' + title + '</a>' +
                        '</td>' +
                        '</tr>');
                $('#table_payment').append(row_account);
            });

            $('#' + payment_method_id).button('reset');
        });
    });
}