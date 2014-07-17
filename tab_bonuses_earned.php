<div style="padding-top: 15px;">
    <div style="padding-bottom: 15px;">
        <h3>Review your bonuses and statistics</h3>
        <p>Review your stats, analyse your number and improve your performance by working on the areas with higher response.<p>
    </div>
    <div id="bonuses_earned_container">
        <ul class="nav nav-tabs">
            <li id="totals_network_tab" class="active">
                <a href="#content_tab_totals_network" data-toggle="tab">Totals by network</a>
            </li>
            <li id="shares_participation_tab">
                <a href="#content_tab_shares_participation" data-toggle="tab">Shares participation</a>
            </li>
            <li id="clicks_participation_tab">
                <a href="#content_tab_clicks_participation" data-toggle="tab">Clicks participation</a>
            </li>
            <li id="referral_participation_tab">
                <a href="#content_tab_referral_participation" data-toggle="tab">Referral participation</a>
            </li>
            <li id="bonuses_given_tab">
                <a href="#content_tab_bonuses_given" data-toggle="tab">Bonuses given</a>
            </li>
        </ul>
        <div class="tab-content">
            <div class="tab-pane active" id="content_tab_totals_network">
                <?php include './_tab.totals_network.php'; ?>
            </div>
            <div class="tab-pane" id="content_tab_shares_participation">
                <?php include './_tab.shares_participation.php'; ?>
            </div>
            <div class="tab-pane" id="content_tab_clicks_participation">
                <?php include './_tab.clicks_participation.php'; ?>
            </div>
            <div class="tab-pane" id="content_tab_referral_participation">
                <?php include './_tab.referral_participation.php'; ?>
            </div>
            <div class="tab-pane" id="content_tab_bonuses_given">
                <?php include './_tab.bonuses_given.php'; ?>
            </div>
        </div>
    </div>
</div>
