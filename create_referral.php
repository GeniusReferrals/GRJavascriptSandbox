<div id="referrer-advocate-details" class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <a class="close" data-dismiss="modal" >&times;</a>
            <h3>Create referrer</h3>
        </div>
        <form class="form-signin" action="" method="POST" id="form_create_referral">
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label class="control-label required" for="advocate_referrer">Advocate referrer *:</label>
                            <input id="advocate_referrer" class="form-control" type="text" maxlength="255" required="required" name="advocate_referrer">
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="campaing">Campaings *:</label>
                            <select id="campaing" name="campaing" class="form-control">
                                <option value="">Choose</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="control-label required" for="network">Network *:</label>
                            <select id="referral_origins" name="referral_origins" class="form-control">
                                <option value="">Choose</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <input type="hidden" name="advocate_token" id="advocate_token" value="<?php echo $_GET['advocate_token'] ?>">
                <button data-dismiss="modal" class="btn btn-default" type="button">Close</button>
                <input class="btn btn-primary" type="button" data-loading-text="Loading..." value="Update" id="btn_create_referral">
            </div>
        </form>
    </div>
</div>

<link href="public/css/jquery.ui.theme.css" rel="stylesheet">

<link href="public/css/jquery.ui.menu.css" rel="stylesheet">

<link href="public/css/jquery.ui.autocomplete.css" rel="stylesheet">

<script type="text/javascript" src="public/js/jquery.ui.core.js"></script>

<script type="text/javascript" src="public/js/jquery.ui.widget.js"></script>

<script type="text/javascript" src="public/js/jquery.ui.position.js"></script>

<script type="text/javascript" src="public/js/jquery.ui.menu.js"></script>

<script type="text/javascript" src="public/js/jquery.ui.autocomplete.js"></script>

<script type="text/javascript" src="public/js/autocomplete.js"></script>

<script type="text/javascript" src="public/js/advocate_actions.js"></script>