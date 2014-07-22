<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <a class="close" data-dismiss="modal" >&times;</a>
            <h3>New paypal account</h3>
        </div>
        <form class="form-signin" method="POST" id="form_paypal_account">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="control-label required" for="paypal_username">Username *:</label>
                            <input id="paypal_username" class="form-control" type="text" maxlength="255" required="required" name="paypal_username">
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="advocate_description">Description *:</label>
                            <input id="paypal_description" class="form-control" type="text" maxlength="255" name="paypal_description">
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="paypal_is_active">Is active *:</label>
                            <select id="paypal_is_active" name="paypal_is_active" class="form-control">
                                <option value="">Choose</option>
                                <option value="1">Yes</option>
                                <option value="0">No</option>
                            </select> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                <input data-loading-text="Loading..." class="btn btn-primary" type="button" value="Submit" id="btn_new_paypal_account">
            </div>
        </form>   
    </div>
</div>
<script type="text/javascript" src="public/js/new_paypal_account.js"></script>