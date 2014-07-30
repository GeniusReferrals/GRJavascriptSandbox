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

        <link href="public/css/styles.css" rel="stylesheet">

    </head>

    <body>
        <img id="loading-image" src="public/images/loader.gif"/>

        <div class="container">
            <div class="header">
                <ul class="nav nav-pills pull-right">
                    <li class="active"><a href="index.php">Manage advocate</a></li>
                </ul>
                <h3 class="text-muted">GRJavascriptSandbox</h3>
            </div>

            <div class="jumbotron clearfix">
                <div class="header"><p>Make your search using this criteria</p></div>
                <form class="form-horizontal" role="form" id="form_seach_advocate">
                    <div class="col-xs-12 col-sm-6">
                        <div class="form-group">
                            <label for="inputName" class="col-sm-4 control-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputName" name="inputName" placeholder="Name">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="inputLastname" class="col-sm-4 control-label">Last name</label>
                            <div class="col-sm-8">
                                <input type="text" class="form-control" id="inputLastname" name="inputLastname" placeholder="Last name">
                            </div>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6">
                        <div class="form-group">
                            <label for="inputEmail" class="col-sm-4 control-label">Email</label>
                            <div class="col-sm-8">
                                <input type="email" class="form-control" id="inputEmail" name="inputEmail" placeholder="Email">
                            </div>
                        </div>
                        <div style="text-align: right;">
                            <button data-loading-text="Loading..." id="btn_search_advocate" type="button" class="btn btn-primary"><span class="glyphicon glyphicon-search"></span> Search</button>
                        </div>
                    </div>
                </form>
            </div>

            <div id="no_result_found" class="alert alert-info" style="display:none">No result were found!</div>
            <div id="no_result_found" class="alert alert-warning" style="display:none">Could not get the data, please try again later!</div>
            <div id="unique_email_advocate" class="alert alert-warning" style="display:none">The email of advocate must be unique!</div>

            <div class="row marketing">
                <div style="text-align: right; margin-bottom: 10px;">
                    <button id="btn_new_advocate" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-pencil"></span> New advocate</button>
                </div>
                <div id="new_advocate_container" class="jumbotron clearfix" style="display: none;">
                    <div class="header">
                        <p>New Advocate</p>
                        <button type="button" class="close" id="btn_close_advocate">&times;</button>
                    </div>
                    <form class="form-horizontal" role="form" id="form_new_advocate" method="POST">
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <label for="name" class="col-sm-4 control-label">Name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="name" name="name" placeholder="Name">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="last_name" class="col-sm-4 control-label">Last name</label>
                                <div class="col-sm-8">
                                    <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Last name">
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12 col-sm-6">
                            <div class="form-group">
                                <label for="email" class="col-sm-4 control-label">Email</label>
                                <div class="col-sm-8">
                                    <input type="email" class="form-control" id="email" name="email" placeholder="Email">
                                </div>
                            </div>
                            <div style="text-align: right;">
                                <input data-loading-text="Loading..." class="btn btn-primary" type="button" value="Submit" id="btn1_new_advocate">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered" id="table_advocate">
                        <tr>
                            <th>Name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Account</th>
                            <th>Campaign</th>
                            <th>Creation date</th>
                            <th>Actions</th>
                        </tr>
                        <tbody id="lstadvocate"></tbody>
                    </table>
                    <div id="lstadvocate-pagination" style="display:none">
                        <a id="lstadvocate-previous" href="#" class="disabled">&laquo; Previous</a> 
                        <a id="lstadvocate-next" href="#">Next &raquo;</a> 
                    </div>
                </div>
            </div>

            <div class="modal fade" id="createReferralModal" tabindex="-1" role="dialog" aria-labelledby="createReferralLabel" aria-hidden="true"></div>
            <div class="modal fade" id="checkupBonusModal" tabindex="-1" role="dialog" aria-labelledby="checkupBonusLabel" aria-hidden="true"></div>
            <div class="modal fade" id="processBonusModal" tabindex="-1" role="dialog" aria-labelledby="processBonusLabel" aria-hidden="true"></div>

            <div class="footer">
                <ul class="nav nav-pills pull-left">
                    <li class="active"><a href="index.php">Manage advocate</a></li>
                </ul>
                <div style="clear: both; text-align: center;">
                    <p>Copyright ©2014 GRPHPSandbox. All rights reserved.</p>
                </div>

                <script type="text/javascript" src="public/js/jquery-2.0.3.min.js"></script>

                <script type="text/javascript" src="public/js/jquery.validate.min.js"></script>

                <script type="text/javascript" src="public/js/jquery.validate.defaults.js"></script>

                <script type="text/javascript" src="public/bootstrap/js/bootstrap.min.js"></script>

                <script type="text/javascript" src="public/js/date.format.js"></script>

                <script type="text/javascript" src="GRAPIJavascriptClient/geniusreferrals-api-client.js"></script>

                <script type="text/javascript" src="config/config.js"></script>

                <script type="text/javascript" src="public/js/jquery.paginate.min.js"></script>

                <script type="text/javascript" src="public/js/manage_advocate.js"></script>
            </div>
        </div> <!-- /container -->
    </body>
</html>

