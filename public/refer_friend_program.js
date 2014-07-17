
$(document).ready(function() {

    var apiUsername = 'alain@hlasolutionsgroup.com';
    var apiToken = '8450103c06dbd58add9d047d761684096ac560ca';

    var client = new gr.client();
    var auth = new gr.auth(apiUsername, apiToken);

    $('#paypal_account_actions').click(function(e) {
        var stepRequest = $.ajax({
            type: "GET",
            url: 'paypal_account_list.php'
        });
        $('#paypalAccountModal').modal('show');
        stepRequest.done(function(response) {
            if (response) {
                $('#paypalAccountModal').html(response);
            }
        });
    });

    $('#btn_redeem_bonuses').click(function(e) {
        var isValid = validate();
        if (isValid) {

            aryRedemptionRequest = '{"redemption_request":{"advocate_token":"767d478bd662cfe419e1ff6e70c0a7d723493c8b","request_status_slug":"requested","request_action_slug":"' + $('#redemption_type').val() + '", "currency_code":"USD", "amount":"' + $('#amount_redeem').val() + '", "description":"cash o pay-out", "advocates_paypal_username":"' + $('#paypal_account').val() + '"}}';
            $('#btn_redeem_bonuses').button('loading');
            $('#btn_redeem_bonuses').removeClass('btn-primary');
            $('#btn_redeem_bonuses').addClass('btn-info');
            var objResponse1 = client.postRedemptionRequest(auth, 'genius-referrals', $.parseJSON(aryRedemptionRequest));
            objResponse1.success(function(data) {

                arrLocation = objResponse1.getHeader('Location').raw();
                strLocation = arrLocation[0];
                arrParts = strLocation.split('/');
                intRedemptionRequestId = arrParts.pop();

                var objResponse2 = client.getRedemptionRequest(auth, 'genius-referrals', intRedemptionRequestId);
                objResponse2.success(function(data) {
                    $.each(data.data, function(i, elem) {
                        row_redemption = $('<tr>' +
                                '<td>' + dateFormat(new Date(elem.created), "mediumDate") + '</td>' +
                                '<td>' + elem.amount + '</td>' +
                                '<td> Referral </td>' +
                                '<td>' + elem._advocate.name + '</td>' +
                                '<td>' + elem.request_status_slug + '</td>' +
                                '<td>' + elem.request_action_slug + '</td>' +
                                '</tr>');
                        $('#table_redemption').append(row_redemption);
                    });
                    $('#amount_redeem').val('');
                    $('#redemption_type').val();
                    document.getElementById('paypal_account').selectedIndex = 0;

                    $('#btn_redeem_bonuses').button('reset');
                    $('#btn_redeem_bonuses').removeClass('btn-info');
                    $('#btn_redeem_bonuses').addClass('btn-primary');
                });
            });
        }
    });

    $('#referral_tools_next').click(function() {
        $('#overview_tab').removeClass('active');
        $('#referral_tools_tab').addClass('active');
        $('#bonuses_earned_tab').removeClass('active');
        $('#redeem_bonuses_tab').removeClass('active');

        $('#content_tab_overview').removeClass('active');
        $('#content_tab_referral_tools').addClass('active');
        $('#content_tab_bonuses_earned').removeClass('active');
        $('#content_tab_redeem_bonuses').removeClass('active');
    });
    $('#bonuses_earned_next').click(function() {
        $('#overview_tab').removeClass('active');
        $('#referral_tools_tab').removeClass('active');
        $('#bonuses_earned_tab').addClass('active');
        $('#redeem_bonuses_tab').removeClass('active');

        $('#content_tab_overview').removeClass('active');
        $('#content_tab_referral_tools').removeClass('active');
        $('#content_tab_bonuses_earned').addClass('active');
        $('#content_tab_redeem_bonuses').removeClass('active');
    });
    $('#redeem_bonuses_next').click(function() {
        $('#overview_tab').removeClass('active');
        $('#referral_tools_tab').removeClass('active');
        $('#bonuses_earned_tab').removeClass('active');
        $('#redeem_bonuses_tab').addClass('active');

        $('#content_tab_overview').removeClass('active');
        $('#content_tab_referral_tools').removeClass('active');
        $('#content_tab_bonuses_earned').removeClass('active');
        $('#content_tab_redeem_bonuses').addClass('active');
    });

});

function validate()
{
    $('#form_redeem_bonuses').validate({
        rules: {
            'amount_redeem': {required: true},
            'redemption_type': {required: true},
            'paypal_account': {required: true, email: true}
        }
    });
    return $('#form_redeem_bonuses').valid();
}