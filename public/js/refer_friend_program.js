
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;
    var strCampaign = apiConfig.gr_rfp_campaign;
    var strWidgetsPackage = apiConfig.gr_rfp_widgets_package;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    sessionStorage.setItem('strAdvocateToken', $('#advocate_token').val());

    if (sessionStorage.getItem('strAdvocateToken') != '')
        var strGRAdvocateToken = sessionStorage.getItem('strAdvocateToken');

    /**
     * Show or hide paypal account.
     */
    $('select#redemption_type').change(function() {
        if ($(this).val() == 'pay-out')
        {
            document.getElementById('paypal_account').selectedIndex = 0;
            $('#container_paypal_account').attr('style', 'display:block');
        }
        else
        {
            document.getElementById('paypal_account').selectedIndex = 0;
            $('#container_paypal_account').attr('style', 'display:none');
        }
    });

    /**
     * Get advocates share links.
     */
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

    /**
     * Get referrals summary per origin report.
     */
    var response = client.getReferralsSummaryPerOriginReport(auth, strGRAdvocateToken);
    response.success(function(data) {

        $('#referral_totals_network').html('');
        var arrReferralsSummaryPerOrigin = convertSummaryPerOrigin(data.data);
        $.each(arrReferralsSummaryPerOrigin, function(i, elem) {
            row = $('<div class="container_referral">' +
                    '<label style="width: 100%;">' + elem.name + '</label>' +
                    '<div class="div_referral breadcrumb">' + elem.amount + '</div>' +
                    '</div>');
            $('#referral_totals_network').append(row);
        });
    });

    /**
     * Get bonuses summary per origin report.
     */
    var response = client.getBonusesSummaryPerOriginReport(auth, strGRAdvocateToken);
    response.success(function(data) {

        $('#bonuses_totals_network').html('');
        var arrBonusesSummaryPerOrigin = convertSummaryPerOrigin(data.data);
        $.each(arrBonusesSummaryPerOrigin, function(i, elem) {
            row = $('<div class="container_referral">' +
                    '<label style="width: 100%;">' + elem.name + '</label>' +
                    '<div class="div_referral breadcrumb">' + elem.amount + '</div>' +
                    '</div>');
            $('#bonuses_totals_network').append(row);
        });
    });

    /**
     * Get advocate.
     */
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

    /**
     * Get advocate payment methods.
     */
    var response = client.getAdvocatePaymentMethods(auth, strAccount, strGRAdvocateToken, 1, 50);
    response.success(function(data) {

        $.each(data.data.results, function(i, elem) {
            option = $('<option value="' + elem.username + '">' + elem.username + '</option>');
            $('select#paypal_account').append(option);
        });
    });

    /**
     * Load modal paypal account.
     */
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

    /**
     * Redeem bonuses.
     */
    $('#btn_redeem_bonuses').click(function(e) {
        var isValid = validate();
        if (isValid) {

            redemption_type = $('#redemption_type').val();
            amount_redeem = $('#amount_redeem').val();
            paypal_account = $('#paypal_account').val();
            if (paypal_account != '')
                aryRedemptionRequest = '{"redemption_request":{"advocate_token":"' + strGRAdvocateToken + '","request_status_slug":"requested","request_action_slug":"' + redemption_type + '", "currency_code":"USD", "amount":"' + amount_redeem + '", "description":"cash o pay-out", "advocates_paypal_username":"' + paypal_account + '"}}';
            else
                aryRedemptionRequest = '{"redemption_request":{"advocate_token":"' + strGRAdvocateToken + '","request_status_slug":"requested","request_action_slug":"' + redemption_type + '", "currency_code":"USD", "amount":"' + amount_redeem + '", "description":"cash o pay-out"}}';

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

    /**
     * Help actions.
     */
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

    /**
     * Load graph share daily participation.
     */
    flag_shares_participation = true;
    $('#shares_participation_tab').on('shown.bs.tab', function(e) {

        if (flag_shares_participation)
        {
            var request = $.ajax({
                type: "POST",
                data: {'data': {'advocate_token': strGRAdvocateToken}},
                url: 'refer_friend_program_ajax.php?method=getShareDailyParticipation'
            });
            request.done(function(data) {
                var data = jQuery.parseJSON(data);
                $('#averages_share_daily_participation').attr('data-averages-share', data.message[0]);
                $('#totals_share_daily_participation').attr('data-totals-share', data.message[1]);

                generateChartPie("pie-chart-share-daily", $('#averages_share_daily_participation').data('averages-share'));
                generateChartSerial("serial-chart-share-daily", $('#totals_share_daily_participation').data('totals-share'));

                flag_shares_participation = false;
            });
        }

    });

    /**
     * Load graph click daily participation.
     */
    flag_clicks_participation = true;
    $('#clicks_participation_tab').on('shown.bs.tab', function(e) {

        if (flag_clicks_participation)
        {
            var request = $.ajax({
                type: "POST",
                data: {'data': {'advocate_token': strGRAdvocateToken}},
                url: 'refer_friend_program_ajax.php?method=getClickDailyParticipation'
            });
            request.done(function(data) {
                var data = jQuery.parseJSON(data);
                $('#averages_click_daily_participation').attr('data-averages-click', data.message[0]);
                $('#totals_click_daily_participation').attr('data-totals-click', data.message[1]);

                generateChartPie("pie-chart-click-daily", $('#averages_click_daily_participation').data('averages-click'));
                generateChartSerial("serial-chart-click-daily", $('#totals_click_daily_participation').data('totals-click'));

                flag_clicks_participation = false;
            });
        }
    });

    /**
     * Load graph referral daily participation.
     */
    flag_referral_participation = true;
    $('#referral_participation_tab').on('shown.bs.tab', function(e) {

        if (flag_referral_participation)
        {
            var request = $.ajax({
                type: "POST",
                data: {'data': {'advocate_token': strGRAdvocateToken}},
                url: 'refer_friend_program_ajax.php?method=getReferralDailyParticipation'
            });
            request.done(function(data) {
                var data = jQuery.parseJSON(data);
                $('#averages_daily_participation').attr('data-averages-participation', data.message[0]);
                $('#totals_daily_participation').attr('data-totals-participation', data.message[1]);

                generateChartPie("pie-chart-referral", $('#averages_daily_participation').data('averages-participation'));
                generateChartSerial("serial-chart-referral", $('#totals_daily_participation').data('totals-participation'));

                flag_referral_participation = false;
            });
        }
    });

    /**
     * Load graph bonuses daily given.
     */
    flag_bonuses_given = true;
    $('#bonuses_given_tab').on('shown.bs.tab', function(e) {

        if (flag_bonuses_given)
        {
            var request = $.ajax({
                type: "POST",
                data: {'data': {'advocate_token': strGRAdvocateToken}},
                url: 'refer_friend_program_ajax.php?method=getBonusesDailyGiven'
            });
            request.done(function(data) {
                var data = jQuery.parseJSON(data);
                $('#averages_bonuses_daily_given').attr('data-averages-bonuses', data.message[0]);
                $('#totals_bonuses_daily_given').attr('data-totals-bonuses', data.message[1]);

                generateChartPie("pie-chart-bonuses", $('#averages_bonuses_daily_given').data('averages-bonuses'));
                generateChartSerial("serial-chart-bonuses", $('#totals_bonuses_daily_given').data('totals-bonuses'));

                flag_bonuses_given = false;
            });
        }
    });
});

/**
 * Validate form_redeem_bonuses.
 */
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

/**
 * Help method.
 */
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

    if (arrSummaryPerOrigin != '')
    {
        for (i = 0; i < arrNetwork.length; i++)
        {
            for (j = 0; j < arrSummaryPerOrigin.length; j++)
            {
                if (arrNetwork[i].slug == arrSummaryPerOrigin[j].slug) {
                    arrSummaryPerOriginResult.push(arrSummaryPerOrigin[j]);
                    flag = true;
                }
            }
            if (!flag) {
                objBonusResult = {};
                objBonusResult.name = arrNetwork[i].name;
                objBonusResult.amount = 0;
                arrSummaryPerOriginResult.push(objBonusResult);
            }
            flag = false;
        }
        return arrSummaryPerOriginResult;
    }
    else
    {
        for (i = 0; i < arrNetwork.length; i++)
        {

            objBonusResult = {};
            objBonusResult.name = arrNetwork[i].name;
            objBonusResult.amount = 0;
            arrSummaryPerOriginResult.push(objBonusResult);
        }
        return arrSummaryPerOriginResult;
    }
}