<div id="checkup_bonus" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <a class="close" data-dismiss="modal" >&times;</a>
            <h3>Checkup bonus</h3>
        </div>
        <form class="form-signin" action="" method="POST" id="form_checkup_bonus">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div style="margin-bottom: 20px;">
                            <h5>Use this tool to check if the advocate's referrer can receive a bonus.</h5>
                            <h5>This is a simulation of the action 'Process bonus'. No bonus is created</h5>
                            <h5>created when using this tool.</h5>
                        </div>

                        <div class="form-group">
                            <label class="control-label required" for="reference">Reference *:</label>
                            <input id="reference" class="form-control" type="text" required="required" name="reference">
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="amount_payments">Amount payments :</label>
                            <input id="amount_payments" class="form-control" type="text" name="amount_payments">
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="payment_amount">Payment amount :</label>
                            <input id="payment_amount" class="form-control" type="text" name="payment_amount">
                        </div>
                        <div style="text-align: center; margin-top: 30px;">
                            <input class="btn btn-primary" data-loading-text="Loading..." type="button" value="Check" id="btn_checkup_bonus">
                        </div>

                        <div id="container_status_success" style="display: none;">
                            <div style="margin-bottom: 20px;">
                                <h4>Results:</h4>
                            </div>
                            <div id="status_success" style="background-color: #DFF0D8; padding: 20px;">
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_status">Status:</label>
                                    <span id="lb_status"></span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_reference">Reference:</label>
                                    <span id="lb_reference"></span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_advocate_referrer">Advocate referrer:</label>
                                    <span id="lb_advocate_referrer">
                                        <a style="text-decoration: underline;" id="" class="advocate_details"></a>
                                    </span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_campaing">Campaing:</label>
                                    <span id="lb_campaing">
                                        <a style="text-decoration: underline;" class="btn-details-campaign" data-campaign-slug=""></a>
                                    </span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_message">Message:</label>
                                    <span id="lb_message"></span>
                                </div>
                                <div id="div_trace" style="display: none;">
                                    <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                        <label id="lb_trace">Trace:</label>
                                    </div>
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div id="container_status_fail" style="display: none;">
                            <div style="margin-bottom: 20px;">
                                <h4>Results:</h4>
                            </div>
                            <div id="status_fail" style="background-color: #F2DEDE; padding: 20px;">
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_status">Status:</label>
                                    <span id="lb_status"></span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_reference">Reference:</label>
                                    <span id="lb_reference"></span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_advocate_referrer">Advocate_referrer:</label>
                                    <span id="lb_advocate_referrer">
                                        <a style="text-decoration: underline;" id="" class="advocate_details" title="{{'advocate.view' | trans()}}"></a>
                                    </span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_campaing">Campaing:</label>
                                    <span id="lb_campaing">
                                        <a style="text-decoration: underline;" class="btn-details-campaign" title="{{'btn.view'|trans}}" data-campaign-slug=""></a>
                                    </span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_message">Message:</label>
                                    <span id="lb_message"></span>
                                </div>
                                <div id="div_trace" style="display: none;">
                                    <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                        <label id="lb_trace">Trace:</label>
                                    </div>
                                    <ul>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <input type="hidden" name="advocate_token" id="advocate_token" value="<?php echo $_GET['advocate_token'] ?>">
                    </div>
                </div>
            </div>
        </form>  
    </div>
</div>
<script type="text/javascript" src="public/js/advocate_actions.js"></script>

