<?php
include './api/refer_friend_program_api.php';
$api = new refer_friend_program_api();
$arrAdvocatesShareLinks = $api->getAdvocatesShareLinks();
$arrReferralsSummaryPerOriginReport = $api->getReferralsSummaryPerOriginReport();
$arrBonusesSummaryPerOriginReport = $api->getBonusesSummaryPerOriginReport();
$objAdvocate = $api->getAdvocate();
$arrRedemptionRequests = $api->getRedemptionRequests();
$arrAdvocatePaymentMethods = $api->getAdvocatePaymentMethods();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <title>GRJavascriptSandbox</title>

        <link href="public/bootstrap/css/bootstrap.min.css" rel="stylesheet">

        <link href="public/bootstrap/css/jumbotron-narrow.css" rel="stylesheet">

        <link href="public/styles.css" rel="stylesheet">

    </head>

    <body>

        <div class="container">
            <div class="header">
                <ul class="nav nav-pills pull-right">
                    <li><a href="index.php">Manage advocate</a></li>
                    <li><a href="refer_friend_program.php">Refer a friend program</a></li>
                </ul>
                <h3 class="text-muted">GRJavascriptSandbox</h3>
            </div>

            <div class="row marketing">
                <div class="col-xs-12">
                    <ul class="nav nav-tabs">
                        <li id="overview_tab" class="active">
                            <a href="#content_tab_overview" data-toggle="tab">Overview</a>
                        </li>
                        <li id="referral_tools_tab">
                            <a href="#content_tab_referral_tools" data-toggle="tab">Referral tools</a>
                        </li>
                        <li id="bonuses_earned_tab">
                            <a href="#content_tab_bonuses_earned" data-toggle="tab">Bonuses earned</a>
                        </li>
                        <li id="redeem_bonuses_tab">
                            <a href="#content_tab_redeem_bonuses" data-toggle="tab">Redeem bonuses</a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="content_tab_overview">
                            <?php include './tab_overview.php'; ?>
                        </div>
                        <div class="tab-pane" id="content_tab_referral_tools">
                            <?php include './tab_referral_tools.php'; ?>
                        </div>
                        <div class="tab-pane" id="content_tab_bonuses_earned">
                            <?php include './tab_bonuses_earned.php'; ?>
                        </div>
                        <div class="tab-pane" id="content_tab_redeem_bonuses">
                            <?php include './tab_redeem_bonuses.php'; ?>
                        </div>
                    </div>

                    <div class="modal fade" id="paypalAccountModal" tabindex="-1" role="dialog" aria-labelledby="paypalAccountLabel" aria-hidden="true"></div>
                    <div class="modal fade" id="newPaypalAccountModal" tabindex="-1" role="dialog" aria-labelledby="newPaypalAccountLabel" aria-hidden="true"></div>
                </div>
            </div>

            <div class="footer">
                <ul class="nav nav-pills pull-left">
                    <li><a href="index.php">Manage advocate</a></li>
                    <li><a href="refer_friend_program.php">Refer a friend program</a></li>
                </ul>
                <div style="clear: both; text-align: center;">
                    <p>Copyright ©2014 GRPHPSandbox. All rights reserved.</p>
                </div>
            </div>

        </div> <!-- /container -->

        <script src="public/jquery-2.0.3.min.js"></script>

        <script src="public/jquery.validate.min.js"></script>
        
        <script src="public/jquery.validate.defaults.js"></script>

        <script src="public/bootstrap/js/bootstrap.min.js"></script>
        
        <script src="public/date.format.js"></script>
        
        <script src="../geniusreferrals-api-client.js"></script>

        <script src="GRAPIJavascriptClient/geniusreferrals-api-client.js"></script>
        
        <script src="public/paypal_account_list.js"></script>

    </body>
</html>

