<div id="process_bonus" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <a class="close" data-dismiss="modal" >&times;</a>
            <h3>Process give bonus</h3>
        </div>
        <form class="form-signin" action="" method="POST" id="form_process_bonus">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div style="margin-bottom: 20px;">
                            <h5>Use this tool to give a bonus to the advocate's referrer.</h5>
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
                            <input class="btn btn-primary" data-loading-text="Loading..." type="button" value="Give bonus" id="btn_process_bonus">
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
                                    <label id="lb_bonus_amount">Bonus amount:</label>
                                    <span id="lb_bonus_amount"></span>
                                </div>
                                <div style="margin-bottom: 5px; height: 25px; height: auto;">
                                    <label id="lb_advocates_referrer">Advocate referrer:</label>
                                    <span id="lb_advocates_referrer"></span>
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
                                    <span id="lb_fail_1">We could not give a bonus to the advocates referrer. For more</span>
                                    <span id="lb_fail_2">info review the trace for this request on</span>
                                    <a style="text-decoration: underline;" id="bonuses_request_traces" class="bonuses_request_traces" href="#">Bonuses request traces</a>
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
