
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    /**
     * Get advocates.
     */
    $("body").css('opacity', '0.5');
    $("body img#loading-image").show();
    var response = client.getAdvocates(auth, strAccount, 1, 50);
    response.success(function(data) {

        $('#table_advocate tbody#lstadvocate').html('');
        $.each(data.data.results, function(i, elem) {
            if (typeof elem._campaign_contract === 'undefined')
                campaign_contract = '';
            else
                campaign_contract = elem._campaign_contract.name;
            row_advocate1 = $('<tr>' +
                    '<td>' + elem.name + '</td>' +
                    '<td>' + elem.lastname + '</td>' +
                    '<td>' + elem.email + '</td>' +
                    '<td> Genius referrals </td>' +
                    '<td>' + campaign_contract + '</td>' +
                    '<td>' + dateFormat(new Date(elem.created), "mediumDate") + '</td>');
            row_advocate2 = $('<td class="actions">' +
                    '<a id="' + elem.token + '" href="refer_friend_program.php?advocate_token=' + elem.token + '" title="Refer a friend program"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
                    '<a id="' + elem.token + '" href="#" title="Create referrer" data-toggle="modal" onclick="createReferral(\'' + elem.token + '\')"><span class="glyphicon glyphicon-pencil"></span></a>');
            row_advocate3 = $('<a id="' + elem.token + '" href="#" title="Process bonus" data-toggle="modal" onclick="processBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-retweet"></span></a>' +
                    '<a id="' + elem.token + '" href="#" title="Checkup bonus" data-toggle="modal" onclick="checkupBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-check"></span></a>');

            $('#table_advocate tbody#lstadvocate').append(row_advocate1);
            row_advocate1.append(row_advocate2);
            if (typeof elem._advocate_referrer !== 'undefined')
                row_advocate2.append(row_advocate3);
        });
        $('#lstadvocate').paginate({itemsPerPage: 10});
        $("body").css('opacity', '1');
        $("body img#loading-image").hide();
    });

    $('#btn_new_advocate').click(function() {
        $('#new_advocate_container').show();
    });

    $('#btn_close_advocate').click(function() {
        $('#new_advocate_container').hide();
    });

    /**
     * Create advocate.
     */
    $('#btn1_new_advocate').click(function() {
        var isValid = validateNewAdvocate();
        if (isValid) {

            name = $('#name').val();
            last_name = $('#last_name').val();
            email = $('#email').val();

            $('#btn1_new_advocate').button('loading');
            $('#btn1_new_advocate').removeClass('btn-primary');
            $('#btn1_new_advocate').addClass('btn-info');

            var objResponse1 = client.getAdvocates(auth, strAccount, 1, 1, 'email::' + email + '');
            objResponse1.success(function(data) {
                if (data.data.total == 0)
                {
                    var arrAdvocate = '{"advocate": {"name":"' + name + '", "lastname":"' + last_name + '", "email":"' + email + '", "payout_threshold":20}}';
                    var objResponse2 = client.postAdvocate(auth, strAccount, $.parseJSON(arrAdvocate));
                    objResponse2.success(function(data) {

                        var objResponse3 = client.getAdvocates(auth, strAccount, 1, 1, 'email::' + email + '');
                        objResponse3.success(function(data) {

                            strAdvocateToken = data.data.results[0].token;
                            arrAdvocate = '{"currency_code":"USD"}';
                            var objResponse4 = client.patchAdvocate(auth, strAccount, strAdvocateToken, $.parseJSON(arrAdvocate));
                            objResponse4.success(function(data) {

                                var objResponse5 = client.getAdvocate(auth, strAccount, strAdvocateToken);
                                objResponse5.success(function(data) {
                                    window.location = 'index.php';
                                });
                            });
                        });
                    });
                }
                else
                {
                    $('#no_result_found').hide();
                    $('#unknow_error').hide();
                    $('#unique_email_advocate').show();

                    $('#btn1_new_advocate').button('reset');
                    $('#btn1_new_advocate').removeClass('btn-info');
                    $('#btn1_new_advocate').addClass('btn-primary');
                }

            });
        }
    });

    /**
     * Search advocates.
     */
    $('#btn_search_advocate').click(function() {

        if ($('#inputName').val() != '' || $('#inputLastname').val() != '' || $('#inputEmail').val() != '')
        {
            var isValid = validateSearchAdvocate();
            if (isValid) {

                arrFilter = [];
                filters = [];
                if ($('#inputName').val() != '') {
                    arrFilter.push("name::" + $('#inputName').val());
                }
                if ($('#inputLastname').val() != '') {
                    arrFilter.push("lastname::" + $('#inputLastname').val());
                }
                if ($('#inputEmail').val() != '') {
                    arrFilter.push("email::" + $('#inputEmail').val());
                }
                if (arrFilter != '') {
                    filters = arrFilter.join('|');
                }

                $('#btn_search_advocate').button('loading');
                $('#btn_search_advocate').removeClass('btn-primary');
                $('#btn_search_advocate').addClass('btn-info');

                var objResponse1 = client.getAdvocates(auth, strAccount, 1, 50, filters);
                objResponse1.success(function(data) {

                    $('#table_advocate td').remove();
                    if (data.data.total != 0)
                    {
                        $.each(data.data.results, function(i, elem) {
                            if (typeof elem._campaign_contract === 'undefined')
                                campaign_contract = '';
                            else
                                campaign_contract = elem._campaign_contract.name;
                            row_advocate1 = $('<tr>' +
                                    '<td>' + elem.name + '</td>' +
                                    '<td>' + elem.lastname + '</td>' +
                                    '<td>' + elem.email + '</td>' +
                                    '<td> Genius referrals </td>' +
                                    '<td>' + campaign_contract + '</td>' +
                                    '<td>' + dateFormat(new Date(elem.created), "mediumDate") + '</td>');
                            row_advocate2 = $('<td class="actions">' +
                                    '<a id="' + elem.token + '" href="refer_friend_program.php?advocate_token=' + elem.token + '" title="Refer a friend program"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
                                    '<a id="' + elem.token + '" href="#" title="Create referrer" data-toggle="modal" onclick="createReferral(\'' + elem.token + '\')"><span class="glyphicon glyphicon-pencil"></span></a>');
                            row_advocate3 = $('<a id="' + elem.token + '" href="#" title="Process bonus" data-toggle="modal" onclick="processBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-retweet"></span></a>' +
                                    '<a id="' + elem.token + '" href="#" title="Checkup bonus" data-toggle="modal" onclick="checkupBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-check"></span></a>');

                            $('#table_advocate').append(row_advocate1);
                            row_advocate1.append(row_advocate2);
                            if (typeof elem._advocate_referrer !== 'undefined')
                                row_advocate2.append(row_advocate3);

                            $('#no_result_found').hide();
                            $('#unknow_error').hide();
                        });
                    }
                    else
                    {
                        $('#no_result_found').show();
                        $('#unknow_error').hide();
                    }
                    $('#btn_search_advocate').button('reset');
                    $('#btn_search_advocate').removeClass('btn-info');
                    $('#btn_search_advocate').addClass('btn-primary');

                });
                objResponse1.fail(function(data) {
                    $('#no_result_found').hide();
                    $('#unknow_error').show();

                    $('#btn_search_advocate').button('reset');
                    $('#btn_search_advocate').removeClass('btn-info');
                    $('#btn_search_advocate').addClass('btn-primary');

                });
            }
        }
    });
});

/**
 * Validate form_new_advocate.
 */
function validateNewAdvocate()
{
    $('#form_new_advocate').validate({
        rules: {
            'name': {required: true},
            'last_name': {required: true},
            'email': {required: true, email: true}
        }
    });
    return $('#form_new_advocate').valid();
}

/**
 * Validate form_seach_advocate.
 */
function validateSearchAdvocate()
{
    $('#form_seach_advocate').validate({
        rules: {
            'inputEmail': {email: true}
        }
    });
    return $('#form_seach_advocate').valid();
}

/**
 * Load modal add referrer.
 */
function createReferral(advocate_token)
{
    var request = $.ajax({
        type: "GET",
        url: 'create_referral.php',
        data: {'advocate_token': advocate_token}
    });
    $('#createReferralModal').modal('show');
    request.done(function(response) {
        if (response) {
            $('#createReferralModal').html(response);
        }
    });
}

/**
 * Load modal checkup bonus.
 */
function checkupBonus(advocate_token)
{
    var request = $.ajax({
        type: "GET",
        url: 'checkup_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#checkupBonusModal').modal('show');
    request.done(function(response) {
        if (response) {
            $('#checkupBonusModal').html(response);
            $('#checkupBonusModal #reference').val('');
            $('#checkupBonusModal #amount_payments').val('');
            $('#checkupBonusModal #payment_amount').val('');
            $('#checkupBonusModal #container_status_success').css('display', 'none');
            $('#checkupBonusModal #container_status_fail').css('display', 'none');
        }
    });
}

/**
 * Load modal process bonus.
 */
function processBonus(advocate_token)
{
    var request = $.ajax({
        type: "GET",
        url: 'process_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#processBonusModal').modal('show');
    request.done(function(response) {
        if (response) {
            $('#processBonusModal').html(response);
            $('#processBonusModal #reference').val('');
            $('#processBonusModal #amount_payments').val('');
            $('#processBonusModal #payment_amount').val('');
            $('#processBonusModal #container_status_success').css('display', 'none');
            $('#processBonusModal #container_status_fail').css('display', 'none');
        }
    });
}
