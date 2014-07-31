$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    /**
     * Add referrer.
     */
    $('#btn_create_referral').click(function(e) {
        e.preventDefault();
        var isValid = validateCreateReferral();
        if (isValid)
        {
            email_advocate_referrer = $('input#advocate_referrer').val();
            campaign_slug = $('select#campaing option:selected').val();
            referral_origin_slug = $('select#referral_origins option:selected').val();
            advocate_token = $('#createReferralModal #advocate_token').val();

            $('#btn_create_referral').button('loading');
            $('#btn_create_referral').removeClass('btn-primary');
            $('#btn_create_referral').addClass('btn-info');

            var objResponse1 = client.getAdvocates(auth, strAccount, 1, 1, 'email::' + email_advocate_referrer + '');
            objResponse1.success(function(data) {

                arrReferral = '{"referral":{"referred_advocate_token":"' + advocate_token + '","referral_origin_slug":"' + referral_origin_slug + '","campaign_slug":"' + campaign_slug + '","http_referer":"http://www.geniusreferrals.com"}}';
                objResponse2 = client.postReferral(auth, strAccount, data.data.results[0].token, $.parseJSON(arrReferral));
                objResponse2.success(function(data) {
                    $('#btn_create_referral').button('reset');
                    $('#btn_create_referral').removeClass('btn-info');
                    $('#btn_create_referral').addClass('btn-primary');

                    $('#createReferralModal #advocate_referrer').val('');
                    document.getElementById('campaing').selectedIndex = 0;
                    document.getElementById('referral_origins').selectedIndex = 0;

                    $('#createReferralModal').modal('hide');
                });
            });
        }
    });

    /**
     * Checkup bonus.
     */
    $('#btn_checkup_bonus').click(function(e) {

        e.preventDefault();

        $('#checkupBonusModal #status_success span#lb_status').html('');
        $('#checkupBonusModal #status_success span#lb_reference').html('');
        $('#checkupBonusModal #status_success .advocate_details').html('');
        $('#checkupBonusModal #status_success .advocate_details').attr('id', '');
        $('#checkupBonusModal #status_success .btn-details-campaign').html('');
        $('#checkupBonusModal #status_success .btn-details-campaign').attr('id', '');
        $('#checkupBonusModal #status_success span#lb_message').html('');
        $('#checkupBonusModal #container_status_success #div_trace ul').html('');

        $('#checkupBonusModal #status_fail span#lb_status').html('');
        $('#checkupBonusModal #status_fail span#lb_reference').html('');
        $('#checkupBonusModal #status_fail .advocate_details').html('');
        $('#checkupBonusModal #status_fail .advocate_details').attr('id', '');
        $('#checkupBonusModal #status_fail .btn-details-campaign').html('');
        $('#checkupBonusModal #status_fail .btn-details-campaign').attr('id', '');
        $('#checkupBonusModal #status_fail span#lb_message').html('');
        $('#checkupBonusModal #container_status_fail #div_trace ul').html('');

        $('#checkupBonusModal #container_status_fail #div_trace').css('display', 'none');
        $('#checkupBonusModal #container_status_success #div_trace').css('display', 'none');
        $('#checkupBonusModal #container_status_success').css('display', 'none');
        $('#checkupBonusModal #container_status_fail').css('display', 'none');

        var isValid = validateCheckupBonus();
        if (isValid)
        {
            reference = $('#checkupBonusModal #reference').val();
            amount_payments = $('#checkupBonusModal #amount_payments').val();
            payment_amount = $('#checkupBonusModal #payment_amount').val();
            advocate_token = $('#checkupBonusModal #advocate_token').val();

            $('#btn_checkup_bonus').button('loading');
            $('#btn_checkup_bonus').removeClass('btn-primary');
            $('#btn_checkup_bonus').addClass('btn-info');

            if (amount_payments == '' && payment_amount == '')
                arrReferral = '{"advocate_token":"' + advocate_token + '","reference":"' + reference + '"}';
            else if (amount_payments == '')
                arrReferral = '{"advocate_token":"' + advocate_token + '","reference":"' + reference + '","payment_amount":"' + payment_amount + '"}';

            else if (payment_amount == '')
                arrReferral = '{"advocate_token":"' + advocate_token + '","reference":"' + reference + '", "amount_of_payments":"' + amount_payments + '"}';
            else
                arrReferral = '{"advocate_token":"' + advocate_token + '","reference":"' + reference + '", "amount_of_payments":"' + amount_payments + '","payment_amount":"' + payment_amount + '"}';

            var objResponse1 = client.getBonusesCheckup(auth, strAccount, $.parseJSON(arrReferral));
            objResponse1.success(function(data) {
                if (data.data.result == 'success') {

                    $('#checkupBonusModal #status_success span#lb_status').html('Success');
                    $('#checkupBonusModal #status_success span#lb_reference').html(data.data.reference);
                    var objResponse2 = client.getAdvocate(auth, strAccount, data.data.advocate_referrer_token);
                    objResponse2.success(function(dataResponse2) {
                        var strAdvocateName = dataResponse2.data.name;
                        var strAdvocateToken = dataResponse2.data.token;
                        $('#checkupBonusModal #status_success .advocate_details').html(strAdvocateName);
                        $('#checkupBonusModal #status_success .advocate_details').attr('id', strAdvocateToken);
                    });
                    var objResponse3 = client.getCampaign(auth, strAccount, data.data.campaign_slug);
                    objResponse3.success(function(dataResponse3) {
                        var strCampaignName = dataResponse3.data.name;
                        var strCampaignSlug = dataResponse3.data.slug;
                        $('#checkupBonusModal #status_success .btn-details-campaign').html(strCampaignName);
                        $('#checkupBonusModal #status_success .btn-details-campaign').attr('id', strCampaignSlug);
                    });
                    $('#checkupBonusModal #status_success span#lb_message').html(data.data.message);
                    $('#checkupBonusModal #container_status_success #div_trace ul').html('');
                    if (typeof data.data.trace != 'undefined')
                    {
                        $.each(data.data.trace, function(i, elem) {
                            li = $('<li></li>').html(elem);
                            $('#checkupBonusModal #container_status_success #div_trace ul').append(li);
                        });
                        $('#checkupBonusModal #container_status_success #div_trace').css('display', 'block');
                        $('#checkupBonusModal #container_status_fail #div_trace').css('display', 'none');
                    }
                    $('#checkupBonusModal #container_status_success').css('display', 'block');
                    $('#checkupBonusModal #container_status_fail').css('display', 'none');
                }
                else if (data.data.result == 'fail') {
                    $('#checkupBonusModal #status_fail span#lb_status').html('Fail');
                    $('#checkupBonusModal #status_fail span#lb_reference').html(data.data.reference);
                    var objResponse2 = client.getAdvocate(auth, strAccount, data.data.advocate_referrer_token);
                    objResponse2.success(function(dataResponse2) {
                        var strAdvocateName = dataResponse2.data.name;
                        var strAdvocateToken = dataResponse2.data.token;
                        $('#checkupBonusModal #status_fail .advocate_details').html(strAdvocateName);
                        $('#checkupBonusModal #status_fail .advocate_details').attr('id', strAdvocateToken);
                    });
                    var objResponse3 = client.getCampaign(auth, strAccount, data.data.campaign_slug);
                    objResponse3.success(function(dataResponse3) {
                        var strCampaignName = dataResponse3.data.name;
                        var strCampaignSlug = dataResponse3.data.slug;
                        $('#checkupBonusModal #status_fail .btn-details-campaign').html(strCampaignName);
                        $('#checkupBonusModal #status_fail .btn-details-campaign').attr('id', strCampaignSlug);
                    });
                    $('#checkupBonusModal #status_fail span#lb_message').html(data.data.message);
                    $('#checkupBonusModal #container_status_fail #div_trace ul').html('');
                    if (typeof data.data.trace != 'undefined')
                    {
                        $.each(data.data.trace, function(i, elem) {
                            li = $('<li></li>').html(elem);
                            $('#checkup_bonus #container_status_fail #div_trace ul').append(li);
                        });
                        $('#checkupBonusModal #container_status_fail #div_trace').css('display', 'block');
                        $('#checkupBonusModal #container_status_success #div_trace').css('display', 'none');
                    }
                    $('#checkupBonusModal #container_status_fail').css('display', 'block');
                    $('#checkupBonusModal #container_status_success').css('display', 'none');
                }
                $('#btn_checkup_bonus').button('reset');
                $('#btn_checkup_bonus').removeClass('btn-info');
                $('#btn_checkup_bonus').addClass('btn-primary');
            });
        }
    });

    /**
     * Process bonus.
     */
    $('#btn_process_bonus').click(function(e) {
        e.preventDefault();

        $('#processBonusModal #status_success span#lb_status').html('');
        $('#processBonusModal #status_success span#lb_bonus_amount').html('');
        $('#processBonusModal #status_success span#lb_advocates_referrer').html('');
        $('#processBonusModal #status_fail span#lb_status').html('');

        $('#processBonusModal #container_status_success').css('display', 'none');
        $('#processBonusModal #container_status_fail').css('display', 'none');

        var isValid = validateProcessBonus();
        if (isValid)
        {
            reference = $('#processBonusModal #reference').val();
            amount_payments = $('#processBonusModal #amount_payments').val();
            payment_amount = $('#processBonusModal #payment_amount').val();
            advocate_token = $('#processBonusModal #advocate_token').val();

            $('#btn_process_bonus').button('loading');
            $('#btn_process_bonus').removeClass('btn-primary');
            $('#btn_process_bonus').addClass('btn-info');

            if (amount_payments == '' && payment_amount == '')
                arrBonus = '{"bonus":{"advocate_token":"' + advocate_token + '","reference":"' + reference + '"}}';

            else if (amount_payments == '')
                arrBonus = '{"bonus":{"advocate_token":"' + advocate_token + '","reference":"' + reference + '","payment_amount":"' + payment_amount + '"}}';

            else if (payment_amount == '')
                arrBonus = '{"bonus":{"advocate_token":"' + advocate_token + '","reference":"' + reference + '","amount_of_payments":"' + amount_payments + '"}}';

            else
                arrBonus = '{"bonus":{"advocate_token":"' + advocate_token + '","reference":"' + reference + '","amount_of_payments":"' + amount_payments + '","payment_amount":"' + payment_amount + '"}}';

            var objResponse1 = client.postBonuses(auth, strAccount, $.parseJSON(arrBonus));
            objResponse1.success(function(data) {

                var objResponse2 = client.getBonuses(auth, strAccount, 1, 1, '', '-created');
                objResponse2.success(function(dataResponse2) {

                    var objResponse3 = client.getAdvocate(auth, strAccount, dataResponse2.data.results[0].referred_advocate_token);
                    objResponse3.success(function(data) {

                        $('#processBonusModal #status_success span#lb_status').html('Success');
                        $('#processBonusModal #status_success span#lb_bonus_amount').html(dataResponse2.data.results[0].amount);
                        $('#processBonusModal #status_success span#lb_advocates_referrer').html(data.data.name);

                        $('#processBonusModal #container_status_success').css('display', 'block');
                        $('#processBonusModal #container_status_fail').css('display', 'none');
                    });
                    objResponse3.fail(function(data) {

                        $('#processBonusModal #status_fail span#lb_status').html('Fail');

                        $('#processBonusModal #container_status_fail').css('display', 'block');
                        $('#processBonusModal #container_status_success').css('display', 'none');
                    });
                    $('#btn_process_bonus').button('reset');
                    $('#btn_process_bonus').removeClass('btn-info');
                    $('#btn_process_bonus').addClass('btn-primary');
                });
            });
        }
    });
});

/**
 * Validate form add referrer.
 */
function validateCreateReferral()
{
    $('#form_create_referral').validate({
        rules: {
            "advocate_referrer": {required: true},
            "campaing": {required: true},
            "network": {required: true}
        }
    });
    return $('#form_create_referral').valid();
}

/**
 * Validate form checkup bonus.
 */
function validateCheckupBonus()
{
    $('#form_checkup_bonus').validate({
        rules: {
            'reference': {required: true},
            'amount_payments': {digits: true},
            'payment_amount': {number: true}
        }
    });
    return $('#form_checkup_bonus').valid();
}

/**
 * Validate form process bonus.
 */
function validateProcessBonus()
{
    $('#form_process_bonus').validate({
        rules: {
            'reference': {required: true},
            'amount_payments': {digits: true},
            'payment_amount': {number: true}
        }
    });
    return $('#form_process_bonus').valid();
}
