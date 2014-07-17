<?php
include './api/refer_friend_program_api.php';
$api = new refer_friend_program_api();
$arrAdvocatePaymentMethods = $api->getAdvocatePaymentMethods();
?>

<div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
            <h3 class="modal-title">Paypal accounts</h3>
        </div>
        <div class="modal-body" id="modal">
            <div class="row">
                <div class="col-xs-12 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Paypal accounts
                            <span style="bottom: 7px;position: relative;float: right;margin-right: -1px;">
                                <a id="new_paypal_account_ajax" data-toggle="modal" href="#" title="Add paypal account" class="btn btn-primary">
                                    <span class="glyphicon glyphicon-pencil"></span> Add new 
                                </a>
                            </span>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-hover table-condensed" id="table_payment" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <?php foreach ($arrAdvocatePaymentMethods as $objAdvocatePaymentMethods) { ?>
                                    <tr>
                                        <td><?php echo $objAdvocatePaymentMethods->description ?></td>
                                        <td><?php echo $objAdvocatePaymentMethods->username ?></td>
                                        <td><span class="<?php echo $objAdvocatePaymentMethods->is_active == 0 ? 'glyphicon glyphicon-remove-circle' : 'glyphicon glyphicon-check' ?>"></span></td>
                                        <td class="actions">
                                            <a type="button" id="<?php echo $objAdvocatePaymentMethods->id ?>" data-loading-text="Loading..." data-name="<?php echo $objAdvocatePaymentMethods->description ?>" data-email="<?php echo $objAdvocatePaymentMethods->username ?>" data-state="<?php echo $objAdvocatePaymentMethods->is_active ? 0 : 1 ?>" class="activate_desactivate" href="#"><?php echo $objAdvocatePaymentMethods->is_active == 1 ? 'Desactive' : 'Active' ?></a>
                                        </td>
                                    </tr>
                                <?php } ?>
                            </table>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>

<script type="text/javascript" src="public/paypal_account_list.js"></script>


