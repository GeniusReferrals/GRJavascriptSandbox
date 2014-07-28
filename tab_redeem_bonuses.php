<div class="col-xs-12" style="padding-top: 15px;">
    <div style="padding-bottom: 15px;">
        <h3>Redeem your bonuses as cash or credit</h3>
    </div>
    <div id="redeem_bonuses_container">
        <div class="row">
            <div class="col-sm-9 col-xs-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <div class="col-sm-7 col-xs-12">
                            <form class="form-horizontal" role="form" id="form_redeem_bonuses">
                                <div class="form-group">
                                    <label for="amount_redeem" class="col-sm-5 control-label">Amount to redeem:</label>
                                    <div class="col-xs-7">
                                        <input type="text" class="form-control" id="amount_redeem" name="amount_redeem">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="redemption_type" class="col-sm-5 control-label">Redemption type:</label>
                                    <div class="col-xs-7">
                                        <select id="redemption_type" name="redemption_type" class="form-control">
                                            <option value="">Choose</option>
                                            <option value="pay-out">pay-out</option>
                                            <option value="credit">credit</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group" id="container_paypal_account" style="display: none;">
                                    <label for="paypal_account" class="col-sm-5 control-label">Paypal account:</label>
                                    <div class="col-xs-7">
                                        <select id="paypal_account" name="paypal_account" class="form-control">
                                            <option value="">Choose</option>
                                        </select>
                                    </div>
                                    <div style="float: right; margin-top: -26px; margin-right: -7px;">
                                        <a id="paypal_account_actions" type="button" name="paypal_account_actions" title="Actions" href="#"><span class="glyphicon glyphicon-edit"></span></a>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div style="float: right; margin-right: 14px;">
                                        <button data-loading-text="Loading..." type="button" id="btn_redeem_bonuses" class="btn btn-primary">Redeem bonuses</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="col-sm-5 col-xs-12">
                            <ul class="help-text">
                                <li>Fill in the form and click on Redeem bonuses.</li>
                                <li>This will send a request that will be processed ASAP for our team.</li>
                                <li>The minimun amount to request is $20.</li>
                            </ul>
                        </div>
                        <div style="clear: both;"></div>
                    </div>
                </div>
            </div>

            <div class="col-sm-3 col-xs-12 text-center">
                <div class="panel panel-default">
                    <div class="panel-heading" style="line-height: 2">
                        <div style="height: 94px;">
                            <h5><strong>Redeemable amount:</strong></h5>
                            <h3 style="color: #5CB85C;"><strong><?php isset($objAdvocate->unclaimed_balance) ? $objAdvocate->unclaimed_balance : '' ?></strong></h3>
                        </div>
                        <div style="height: 93px;">
                            <h5><strong>Redeemed amount:</strong></h5>
                            <h3 style="color: #D9534F;"><strong><?php isset($objAdvocate->claimed_balance) ? $objAdvocate->claimed_balance : '' ?></strong></h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h4 style="margin-bottom: 15px;">Redemption history</h4>

        <div class="table-responsive">
            <table class="table table-striped table-bordered" id="table_redemption" >
                <thead>
                    <tr>
                        <th>Redeemed on</th>
                        <th>Amount</th>
                        <th>Details</th>
                        <th>Referred advocate</th>
                        <th>Status</th>
                        <th>Type</th>
                    </tr>
                </thead>
            </table>
        </div>
    </div>
</div>