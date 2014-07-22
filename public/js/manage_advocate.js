
$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    var response = client.getAdvocates(auth, strAccount, 1, 50);
    response.success(function(data) {

        $('#table_advocate td').remove();
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
                    '<a id="' + elem.token + '" class="refer_friend_program" href="refer_friend_program.php?advocate_token=' + elem.token + '" title="Refer a friend program" data-toggle="modal"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
                    '<a id="' + elem.token + '" class="create_referral" href="#" title="Create referrer" data-toggle="modal" onclick="createReferral(\'' + elem.token + '\')"><span class="glyphicon glyphicon-pencil"></span></a>');
            row_advocate3 = $('<a id="' + elem.token + '" class="process_bonus" href="#" title="Process bonus" data-toggle="modal" onclick="processBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-retweet"></span></a>' +
                    '<a id="' + elem.token + '" class="checkup_bonus" href="#" title="Checkup bonus" data-toggle="modal" onclick="checkupBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-check"></span></a>');

            $('#table_advocate').append(row_advocate1);
            row_advocate1.append(row_advocate2);
            if (typeof elem._advocate_referrer !== 'undefined')
                row_advocate2.append(row_advocate3);
        });
    });

    $('#btn_new_advocate').click(function() {
        $('#new_advocate_container').show();
    });

    $('#btn_close_advocate').click(function() {
        $('#new_advocate_container').hide();
    });

    $('#btn1_new_advocate').click(function() {
        var isValid = validateNewAdvocate();
        if (isValid) {

            name = $('#name').val();
            last_name = $('#last_name').val();
            email = $('#email').val();

            $('#btn1_new_advocate').button('loading');
            $('#btn1_new_advocate').removeClass('btn-primary');
            $('#btn1_new_advocate').addClass('btn-info');

            var aryAdvocate = '{"advocate": {"name":"' + name + '", "lastname":"' + last_name + '", "email":"' + email + '", "payout_threshold":20}}';
            var objResponse1 = client.postAdvocate(auth, strAccount, $.parseJSON(aryAdvocate));
            objResponse1.success(function(data) {

                var objResponse2 = client.getAdvocates(auth, strAccount, 1, 1, 'email::' + email + '');
                objResponse2.success(function(data) {

                    strAdvocateToken = data.data.results.token;
                    aryAdvocate = '{"currency_code":"USD"}';
                    var objResponse3 = client.patchAdvocate(auth, strAccount, strAdvocateToken, $.parseJSON(aryAdvocate));
                    objResponse3.success(function(data) {

                        var objResponse4 = client.getAdvocate(auth, strAccount, strAdvocateToken);
                        objResponse4.success(function(data) {

                            if (typeof data.data._campaign_contract === 'undefined')
                                campaign_contract = '';
                            else
                                campaign_contract = data.data._campaign_contract.name;
                            row_advocate1 = $('<tr>' +
                                    '<td>' + data.data.name + '</td>' +
                                    '<td>' + data.data.lastname + '</td>' +
                                    '<td>' + data.data.email + '</td>' +
                                    '<td>Genius referral</td>' +
                                    '<td>' + campaign_contract + '</td>' +
                                    '<td>' + dateFormat(new Date(data.data.created), "mediumDate") + '</td>');
                            row_advocate2 = $('<td class="actions">' +
                                    '<a id="' + data.message.token + '" class="refer_friend_program" href="refer_friend_program.php?advocate_token=' + data.message.token + '" title="Refer a friend program" data-toggle="modal"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
                                    '<a id="' + data.data.token + '" class="create_referral" href="#" title="Create referrer" data-toggle="modal" onclick="createReferral(\'' + data.message.token + '\')"><span class="glyphicon glyphicon-pencil"></span></a>');
                            row_advocate3 = $('<a id="' + data.data.token + '" class="process_bonus" href="#" title="Process bonus" data-toggle="modal" onclick="processBonus(\'' + data.message.token + '\')"><span class="glyphicon glyphicon-retweet"></span></a>' +
                                    '<a id="' + data.data.token + '" class="checkup_bonus" href="#" title="Checkup bonus" data-toggle="modal" onclick="checkupBonus(\'' + data.message.token + '\')"><span class="glyphicon glyphicon-check"></span></a>');

                            $('#table_advocate').append(row_advocate1);
                            row_advocate1.append(row_advocate2);
                            if (typeof data.message._advocate_referrer !== 'undefined')
                                row_advocate2.append(row_advocate3);

                            $('#btn1_new_advocate').button('reset');
                            $('#btn1_new_advocate').removeClass('btn-info');
                            $('#btn1_new_advocate').addClass('btn-primary');

                            $('#name').val('');
                            $('#last_name').val('');
                            $('#email').val('');
                            $('#new_advocate_container').hide();
                        });
                    });
                });
            });
        }
    });

    $('#btn_search_advocate').click(function() {
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
                            '<a id="' + elem.token + '" class="refer_friend_program" href="refer_friend_program.php?advocate_token=' + elem.token + '" title="Refer a friend program" data-toggle="modal"><span class="glyphicon glyphicon-chevron-down"></span></a>' +
                            '<a id="' + elem.token + '" class="create_referral" href="#" title="Create referrer" data-toggle="modal" onclick="createReferral(\'' + elem.token + '\')"><span class="glyphicon glyphicon-pencil"></span></a>');
                    row_advocate3 = $('<a id="' + elem.token + '" class="process_bonus" href="#" title="Process bonus" data-toggle="modal" onclick="processBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-retweet"></span></a>' +
                            '<a id="' + elem.token + '" class="checkup_bonus" href="#" title="Checkup bonus" data-toggle="modal" onclick="checkupBonus(\'' + elem.token + '\')"><span class="glyphicon glyphicon-check"></span></a>');

                    $('#table_advocate').append(row_advocate1);
                    row_advocate1.append(row_advocate2);
                    if (typeof elem._advocate_referrer !== 'undefined')
                        row_advocate2.append(row_advocate3);

                    $('#btn_search_advocate').button('reset');
                    $('#btn_search_advocate').removeClass('btn-info');
                    $('#btn_search_advocate').addClass('btn-primary');

                    $('#inputName').val('');
                    $('#inputLastname').val('');
                    $('#inputEmail').val('');
                });
            });
        }
    });
});

$('.create_referral').click(function(e) {
    e.preventDefault();
    advocate_token = $(this).attr('id');
    var stepRequest = $.ajax({
        type: "GET",
        url: 'create_referral.php',
        data: {'advocate_token': advocate_token}
    });
    $('#createReferralModal').modal('show');
    stepRequest.done(function(response) {
        if (response) {
            $('#createReferralModal').html(response);
        }
    });
});

$('.checkup_bonus').click(function(e) {
    e.preventDefault();
    advocate_token = $(this).attr('id');
    var stepRequest = $.ajax({
        type: "GET",
        url: 'checkup_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#checkupBonusModal').modal('show');
    stepRequest.done(function(response) {
        if (response) {
            $('#checkupBonusModal').html(response);
            $('#checkupBonusModal').html(response);
            $('#checkupBonusModal #reference').val('');
            $('#checkupBonusModal #amount_payments').val('');
            $('#checkupBonusModal #payment_amount').val('');
            $('#checkupBonusModal #container_status_success').css('display', 'none');
            $('#checkupBonusModal #container_status_fail').css('display', 'none');
        }
    });
});

$('.process_bonus').click(function(e) {
    e.preventDefault();
    advocate_token = $(this).attr('id');
    var stepRequest = $.ajax({
        type: "GET",
        url: 'process_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#processBonusModal').modal('show');
    stepRequest.done(function(response) {
        if (response) {
            $('#processBonusModal').html(response);
            $('#processBonusModal #reference').val('');
            $('#processBonusModal #amount_payments').val('');
            $('#processBonusModal #payment_amount').val('');
            $('#processBonusModal #container_status_success').css('display', 'none');
            $('#processBonusModal #container_status_fail').css('display', 'none');
        }
    });
});
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

function validateSearchAdvocate()
{
    $('#form_seach_advocate').validate({
        rules: {
            'inputEmail': {email: true}
        }
    });
    return $('#form_seach_advocate').valid();
}

function createReferral(advocate_token)
{
    var stepRequest = $.ajax({
        type: "GET",
        url: 'create_referral.php',
        data: {'advocate_token': advocate_token}
    });
    $('#createReferralModal').modal('show');
    stepRequest.done(function(response) {
        if (response) {
            $('#createReferralModal').html(response);
        }
    });
}
function checkupBonus(advocate_token)
{
    var stepRequest = $.ajax({
        type: "GET",
        url: 'checkup_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#checkupBonusModal').modal('show');
    stepRequest.done(function(response) {
        if (response) {
            $('#checkupBonusModal').html(response);
            $('#checkupBonusModal').html(response);
            $('#checkupBonusModal #reference').val('');
            $('#checkupBonusModal #amount_payments').val('');
            $('#checkupBonusModal #payment_amount').val('');
            $('#checkupBonusModal #container_status_success').css('display', 'none');
            $('#checkupBonusModal #container_status_fail').css('display', 'none');
        }
    });
}
function processBonus(advocate_token)
{
    var stepRequest = $.ajax({
        type: "GET",
        url: 'process_bonus.php',
        data: {'advocate_token': advocate_token}
    });
    $('#processBonusModal').modal('show');
    stepRequest.done(function(response) {
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
