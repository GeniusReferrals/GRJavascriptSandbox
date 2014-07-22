
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;
    var strCampaign = apiConfig.gr_rfp_campaign;
    var strWidgetsPackage = apiConfig.gr_rfp_widgets_package;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    sessionStorage.setItem('strAdvocateToken', $('#advocate_token').val());

    $('select#redemption_type').change(function() {
        if ($(this).val() == 'pay-out')
            $('#container_paypal_account').attr('style', 'display:block');
        else
            $('#container_paypal_account').attr('style', 'display:none');
    });

    if (sessionStorage.getItem('strAdvocateToken') != '')
    {
        var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');
        var response = client.getAdvocatesShareLinks(auth, strAccount, strGRAdvocateToken);
        response.success(function(data) {
            $('#qrcode').qrcode(data.data[strCampaign][strWidgetsPackage]['personal']);

            $('#link_facebook').attr('href', 'https://' + data.data[strCampaign][strWidgetsPackage]['facebook-like']);
            $('#link_twitter').attr('href', 'https://' + data.data[strCampaign][strWidgetsPackage]['twitter-post']);
            $('#link_google').attr('href', 'https://' + data.data[strCampaign][strWidgetsPackage]['google-1']);
            $('#link_linkedin_post').attr('href', 'https://' + data.data[strCampaign][strWidgetsPackage]['linkedin-post']);
            $('#link_pinterest').attr('href', 'https://' + data.data[strCampaign][strWidgetsPackage]['pin-it']);
            $('#personal_url').val('https://' + data.data[strCampaign][strWidgetsPackage]['personal']);
        });

        var response = client.getReferralsSummaryPerOriginReport(auth, strGRAdvocateToken);
        response.success(function(data) {

            var arrReferralsSummaryPerOrigin = convertSummaryPerOrigin(data.data);
            $.each(arrReferralsSummaryPerOrigin, function(i, elem) {
                row = $('<div class="container_referral">' +
                        '<label style="width: 100%;">' + elem.name + '</label>' +
                        '<div class="div_referral breadcrumb">' + elem.amount + '</div>' +
                        '</div>');
                $('#referral_totals_network').append(row);
            });
        });

        var response = client.getBonusesSummaryPerOriginReport(auth, strGRAdvocateToken);
        response.success(function(data) {

            var arrBonusesSummaryPerOrigin = convertSummaryPerOrigin(data.data);
            $.each(arrBonusesSummaryPerOrigin, function(i, elem) {
                row = $('<div class="container_referral">' +
                        '<label style="width: 100%;">' + elem.name + '</label>' +
                        '<div class="div_referral breadcrumb">' + elem.amount + '</div>' +
                        '</div>');
                $('#bonuses_totals_network').append(row);
            });
        });

        var response = client.getAdvocate(auth, strAccount, strGRAdvocateToken);
        response.success(function(data) {

            var response = client.getRedemptionRequests(auth, strAccount, 1, 50, 'email::' + data.data.email + '');
            response.success(function(data) {
                $.each(data.data.results, function(i, elem) {
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
            });
        });

        var response = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50);
        response.success(function(data) {

            $.each(data.data.results, function(i, elem) {
                option = $('<option value="' + elem.username + '">' + elem.username + '</option>');
                $('select#paypal_account').append(option);
            });
        });
    }

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

            redemption_type = $('#redemption_type').val();
            amount_redeem = $('#amount_redeem').val();
            paypal_account = $('#paypal_account').val();
            aryRedemptionRequest = '{"redemption_request":{"advocate_token":"' + strGRAdvocateToken + '","request_status_slug":"requested","request_action_slug":"' + redemption_type + '", "currency_code":"USD", "amount":"' + amount_redeem + '", "description":"cash o pay-out", "advocates_paypal_username":"' + paypal_account + '"}}';

            $('#btn_redeem_bonuses').button('loading');
            $('#btn_redeem_bonuses').removeClass('btn-primary');
            $('#btn_redeem_bonuses').addClass('btn-info');

            var objResponse1 = client.postRedemptionRequest(auth, strAccount, $.parseJSON(aryRedemptionRequest));
            objResponse1.success(function(data) {

                var objResponse2 = client.getRedemptionRequests(auth, strAccount, 1, 50);
                objResponse2.success(function(data) {
                    $.each(data.data.results, function(i, elem) {
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
            'redemption_type': {required: true}
        }
    });
    return $('#form_redeem_bonuses').valid();
}

function convertSummaryPerOrigin(arrSummaryPerOrigin) {

    arrNetwork = [];
    arrSummaryPerOriginResult = [];
    arrNetwork.push({'slug': 'facebook-share', 'name': 'Facebook share'});
    arrNetwork.push({'slug': 'twitter-post', 'name': 'Twitter post'});
    arrNetwork.push({'slug': 'linkedin-post', 'name': 'LinkedIn post'});
    arrNetwork.push({'slug': 'pin-it', 'name': 'Pin it'});
    arrNetwork.push({'slug': 'google-plus', 'name': 'Google plus'});
    arrNetwork.push({'slug': 'direct-email', 'name': 'Email'});
    arrNetwork.push({'slug': 'personal-url', 'name': 'PURL'});
    arrNetwork.push({'slug': 'other', 'name': 'Other'});
    flag = false;
    $.each(arrNetwork, function(i, elemNetwork) {
        $.each(arrSummaryPerOrigin, function(j, elemSummaryPerOrigin) {
            if (elemNetwork.slug == elemSummaryPerOrigin.slug) {
                arrSummaryPerOriginResult.push(elemSummaryPerOrigin);
                flag = true;
            }
            if (!flag) {
                objBonusResult = {};
                objBonusResult.name = elemNetwork.name;
                objBonusResult.amount = 0;
                arrSummaryPerOriginResult.push(objBonusResult);
            }
            flag = false;
        });
    });
    return arrSummaryPerOriginResult;
}