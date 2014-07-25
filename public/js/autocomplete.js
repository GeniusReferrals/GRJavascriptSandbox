$(document).ready(function() {

    var strUsername = apiConfig.gr_username;
    var strAuthToken = apiConfig.gr_auth_token;
    var strAccount = apiConfig.gr_rfp_account;

    var client = new gr.client();
    var auth = new gr.auth(strUsername, strAuthToken);

    /**
     * Search advocate referer.
     */
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

    /**
     * Get campaigns.
     */
    var response = client.getCampaigns(auth, strAccount);
    response.success(function(data) {

        $.each(data.data.results, function(i, elem) {
            option = $('<option value="' + elem.slug + '">' + elem.name + '</option>');
            $('select#campaing').append(option);
        });
    });

    /**
     * Get referral origins.
     */
    var response = client.getReferralOrigins(auth);
    response.success(function(data) {

        $.each(data.data, function(i, elem) {
            option = $('<option value="' + elem.slug + '">' + elem.name + '</option>');
            $('select#referral_origins').append(option);
        });
    });
});
