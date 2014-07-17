$(document).ready(function() {

    var apiUsername = 'alain@hlasolutionsgroup.com';
    var apiToken = '8450103c06dbd58add9d047d761684096ac560ca';

    var client = new gr.client();
    var auth = new gr.auth(apiUsername, apiToken);

    $('#btn_create_referral').click(function(e) {
        e.preventDefault();
        var isValid = validateCreateReferral();
        if (isValid)
        {
            advocate_token = $('input#advocate_token').val();
            email_advocate_referrer = $('input#advocate_referrer').val();
            campaign_slug = $(' select#campaing :selected').val();
            referral_origin_slug = $('select#network :selected').val();

            $('#btn_create_referral').button('loading');
            $('#btn_create_referral').removeClass('btn-primary');
            $('#btn_create_referral').addClass('btn-info');
            var objResponse1 = client.getAdvocates(auth, 'genius-referrals', 1, 1, 'email::' + email_advocate_referrer + '');
            objResponse1.success(function(data) {

                aryReferral = '{"referral":{"referred_advocate_token":"' + strAdvocateToken + '","referral_origin_slug":"' + referral_origin_slug + '","campaign_slug":"' + campaign_slug + '","http_referer":"http://www.geniusreferrals.com"}}';
                objResponse2 = client.postReferral(auth, 'genius-referrals', data.data.results[0].token, $.parseJSON(aryReferral));
                objResponse2.success(function(data) {
                    $('#btn_create_referral').button('reset');
                    $('#btn_create_referral').removeClass('btn-info');
                    $('#btn_create_referral').addClass('btn-primary');
                });
            });
        }
    });

    $('#btn_checkup_bonus').click(function(e) {
        e.preventDefault();
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

            aryBonus = '{"advocate_token":"' + advocate_token + '","reference":"' + reference + '", "amount_of_payments":"' + amount_payments + '","payment_amount":"' + payment_amount + '"}';
            var objResponse1 = client.getBonusesCheckup(auth, 'genius-referrals', $.parseJSON(aryBonus));
            objResponse1.success(function(data) {

                var objResponse2 = client.getAdvocate(auth, 'genius-referrals', objResponse1.data.advocate_referrer_token);
                var objResponse3 = client.getCampaign(auth, 'genius-referrals', objResponse1.data.campaign_slug);

                if (data.data.result == 'success') {
                    $('#checkupBonusModal #status_success span#lb_status').html('Success');
                    $('#checkupBonusModal #status_success span#lb_reference').html(data.data.reference);
                    $('#checkupBonusModal #status_success .advocate_details').html(objResponse2.data.name);
                    $('#checkupBonusModal #status_success .advocate_details').attr('id', objResponse2.data.token);
                    $('#checkupBonusModal #status_success .btn-details-campaign').html(objResponse3.data.name);
                    $('#checkupBonusModal #status_success .btn-details-campaign').attr('id', objResponse3.data.slug);
                    $('#checkupBonusModal #status_success span#lb_message').html(data.data.message);
                    $('#checkupBonusModal #container_status_success #div_trace ul').html('');
                    if (data.data.trace != '')
                    {
                        $.each(data.message.trace, function(i, elem) {
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
                    $('#checkupBonusModal #status_fail .advocate_details').html(objResponse2.data.name);
                    $('#checkupBonusModal #status_fail .advocate_details').attr('id', objResponse2.data.token);
                    $('#checkupBonusModal #status_fail .btn-details-campaign').html(objResponse3.data.name);
                    $('#checkupBonusModal #status_fail .btn-details-campaign').attr('id', objResponse3.data.slug);
                    $('#checkupBonusModal #status_fail span#lb_message').html(data.data.message);
                    $('#checkupBonusModal #container_status_fail #div_trace ul').html('');
                    if (data.data.trace != '')
                    {
                        $.each(data.message.trace, function(i, elem) {
                            li = $('<li></li>').html(elem);
                            $('#checkup_bonus #container_status_fail #div_trace ul').append(li);
                        });
                        $('#checkupBonusModal #container_status_fail #div_trace').css('display', 'block');
                        $('#checkupBonusModal #container_status_success #div_trace').css('display', 'none');
                    }
                    $('#checkupBonusModal #container_status_fail').css('display', 'block');
                    $('#checkupBonusModal #container_status_success').css('display', 'none');
                }
            });
        }
    });

    $('#btn_process_bonus').click(function(e) {
        e.preventDefault();
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
            aryBonus = '{"bonus":{"advocate_token":"' + advocate_token + '","reference":"' + reference + '","amount_of_payments":"' + amount_payments + '","payment_amount":"' + payment_amount + '"}}';
            var objResponse1 = client.postBonuses(auth, 'genius-referrals', $.parseJSON(aryBonus));
            objResponse1.success(function(data) {

                arrLocation = objResponse1.getHeader('Location').raw();
                strLocation = arrLocation[0];
                arrParts = strLocation.split('/');
                intBonusId = arrParts.pop();

                var objResponse2 = client.getBonus(auth, 'genius-referrals', intBonusId);
                var objResponse3 = client.getAdvocate(auth, 'genius-referrals', objResponse2.data.referred_advocate_token);
                objResponse3.success(function(data) {

                    $('#processBonusModal #status_success span#lb_status').html('Success');
                    $('#processBonusModal #status_success span#lb_bonus_amount').html(objResponse2.data.amount);
                    $('#processBonusModal #status_success span#lb_advocates_referrer').html(objResponse3.data.name);

                    $('#processBonusModal #container_status_success').css('display', 'block');
                    $('#processBonusModal #container_status_fail').css('display', 'none');
                });
                objResponse3.fail(function(data) {

                    $('#processBonusModal #status_fail span#lb_status').html('Fail');

                    $('#processBonusModal #container_status_fail').css('display', 'block');
                    $('#processBonusModal #container_status_success').css('display', 'none');
                });
            });
            $('#btn_process_bonus').button('reset');
            $('#btn_process_bonus').removeClass('btn-info');
            $('#btn_process_bonus').addClass('btn-primary');
        }
    });
});

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
