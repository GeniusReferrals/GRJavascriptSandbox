$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;
    var strCampaign = apiConfig.gr_rfp_campaign;
    var strWidgetsPackage = apiConfig.gr_rfp_widgets_package;
    
    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    if (sessionStorage.getItem('strAdvocateToken') != '')
        var strAdvocateToken = sessionStorage.getItem('strAdvocateToken');

    var response = client.getCampaigns(auth, strAccount);
    response.success(function(data) {

        $.each(data.data.results, function(i, elem) {
            option = $('<option value="' + elem.slug + '">' + elem.name + '</option>');
            $('select#campaing').append(option);
        });
    });

    var response = client.getReferralOrigins(auth);
    response.success(function(data) {

        $.each(data.data.results, function(i, elem) {
            option = $('<option value="' + elem.slug + '">' + elem.name + '</option>');
            $('select#referral_origins').append(option);
        });
    });

    $("#advocate_referrer").autocomplete({
        source: function(request, response) {
            arrEmail = [];
            var objResponse = client.getAdvocates(auth, strAccount, 1, 50, 'email::' + request.term + '');
            objResponse.success(function(data) {
                $.each(data.data.results, function(i, elem) {
                    arrEmail.push(elem.email);
                    response(arrEmail);
                });
            });
        },
        focus: function() {
            return false;
        }
    });

    $('#btn_create_referral').click(function(e) {
        e.preventDefault();
        var isValid = validateCreateReferral();
        if (isValid)
        {
            email_advocate_referrer = $('input#advocate_referrer').val();
            campaign_slug = $(' select#campaing :selected').val();
            referral_origin_slug = $('select#network :selected').val();

            $('#btn_create_referral').button('loading');
            $('#btn_create_referral').removeClass('btn-primary');
            $('#btn_create_referral').addClass('btn-info');

            var objResponse1 = client.getAdvocates(auth, strAccount, 1, 1, 'email::' + email_advocate_referrer + '');
            objResponse1.success(function(data) {

                aryReferral = '{"referral":{"referred_advocate_token":"' + strAdvocateToken + '","referral_origin_slug":"' + referral_origin_slug + '","campaign_slug":"' + campaign_slug + '","http_referer":"http://www.geniusreferrals.com"}}';
                objResponse2 = client.postReferral(auth, strAccount, data.data.results[0].token, $.parseJSON(aryReferral));
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
            var objResponse1 = client.getBonusesCheckup(auth, strAccount, $.parseJSON(aryBonus));
            objResponse1.success(function(data) {

                var objResponse2 = client.getAdvocate(auth, strAccount, objResponse1.data.advocate_referrer_token);
                var objResponse3 = client.getCampaign(auth, strAccount, objResponse1.data.campaign_slug);

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
            var objResponse1 = client.postBonuses(auth, strAccount, $.parseJSON(aryBonus));
            objResponse1.success(function(data) {

                var objResponse2 = client.getBonuses(auth, strAccount, 1, 1, '', '-created');
                objResponse2.success(function(data) {

                    intBonusId = data.data.bonus_id;
                    var objResponse3 = client.getAdvocate(auth, strAccount, objResponse2.data.referred_advocate_token);
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
