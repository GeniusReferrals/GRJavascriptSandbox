<div class="col-xs-12" style="padding-top: 15px;">
    <div style="padding-bottom: 15px;">
        <h3>Use these tools to refer our services</h3>
        <p>Your can refer our services by posting your share links on the social networks, by printing your QR code on business cards, by sending emails or sharing your personal share links directly on Internet.<p>
    </div>
    <div id="referral_tools_container">
        <h4>Ways to share</h4>

        <div class="panel panel-default">
            <div class="panel-heading">
                <div style="margin-bottom: 15px;">
                    <h4 style="display: inline; margin-right: 20px;">1</h4>
                    <p style="display: inline;"><strong>Click on the network links to start sharing</strong></p>
                </div>
                <div class="col-xs-12" style="margin-bottom: 15px;">
                    <div class="col-xs-2 col-sm-1">
                        <a id="link_facebook" href="">
                            <img src="public/images/social/facebook.png" class="img-rounded">
                        </a>
                    </div>
                    <div class="col-xs-2 col-sm-1">
                        <a id="link_twitter"href="">
                            <img src="public/images/social/twitter.png" class="img-rounded">
                        </a>
                    </div>
                    <div class="col-xs-2 col-sm-1">
                        <a id="link_google" href="">
                            <img src="public/images/social/googleplus_red.png" class="img-rounded">
                        </a>
                    </div>
                    <div class="col-xs-2 col-sm-1">
                        <a id="link_linkedin_post" href="">
                            <img src="public/images/social/linkedin.png" class="img-rounded">
                        </a>
                    </div>
                    <div style="clear: both;"></div>
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div style="margin-bottom: 15px;">
                    <h4 style="display: inline; margin-right: 20px;">2</h4>
                    <p style="display: inline;"><strong>Send the following email to your friends</strong></p>
                </div>
                <div class="col-xs-12 col-sm-6" style="background-color: white; padding-top: 15px; padding-bottom: 15px;">
                    <div id="email_to_be_sent">
                        <span>
                            <strong>From:</strong>
                        </span>
                        <span>custumer@email.com</span>
                        <span style="margin-left: 55px;">
                            <strong>To:</strong>
                        </span>
                        <span>[your_friend_email]</span>
                        <br>
                        <br>
                        <span>Hi [your_friend_email],</span>
                        <br>
                        <br>
                        <span>[your_name] ask us to send you this email to recomend you our services and low prices.</span>
                        <br>
                        <br>
                        <span>Please visit Genius Referrals for more details of our services.</span>
                        <br>
                        <br>
                        <span>You can create all resources you need for staring you referral marketing program for free.</span>
                        <br>
                        <br>
                        <span>Best wishes</span>
                        <br>
                        <br>
                        <span>The Genius Referrals Team</span>
                    </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <form class="form-signin" action="#" method="POST" id="form_send_email_friend">
                        <div class="form-group">
                            <label for="exampleInputPassword1">Add list of emails separated by coma.</label>
                            <textarea name="emails" id="emails" class="form-control" rows="7"></textarea>
                        </div>
                        <a id="import_emails" style="text-decoration: underline;">Import emails</a>
                        <div id="wrong_emails_container" style="display: none; margin-bottom: 0px; margin-top: 10px;" class="alert alert-danger alert-dismissable">
                            <button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>
                        </div>
                        <button id="btn_send_email" data-loading-text="Loading..." type="button" class="btn btn-primary" style="float: right;margin-top: 20px;">Send email</button>
                    </form>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div style="margin-bottom: 15px;">
                    <h4 style="display: inline; margin-right: 20px;">3</h4>
                    <p style="display: inline;"><strong>Share your personal URL</strong></p>
                </div>
                <div class="col-xs-12" style="margin-bottom: 15px;">
                    <input id="personal_url" class="form-control" type="text" name="personal_url" value="">
                </div>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div style="margin-bottom: 15px;">
                    <h4 style="display: inline; margin-right: 20px;">4</h4>
                    <p style="display: inline;"><strong>Print this QR code</strong></p>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <div id="qrcode"></div>
                </div>
                <div class="col-xs-12 col-sm-6">
                    <p><strong>Use this QR code to refer our service on:</strong></p>
                    <ul class="help-text" style="line-height: 3; padding: 0 0 0 42px;">
                        <li><strong>Business cards</strong></li>
                        <li><strong>Posters</strong></li>
                        <li><strong>Fliers</strong></li>
                    </ul>
                </div>
                <div style="clear: both;"></div>
            </div>
        </div>
    </div>

</div>