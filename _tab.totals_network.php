<div class="col-xs-12" style="padding-top: 20px;">
    <div class="breadcrumb" style="background-color: #F5F5F5">
        <fieldset>
            <legend>Referrals</legend>
            <div class="col-sm-12" style="margin-bottom: 5px; height: 25px; height: auto;">
                <?php foreach ($arrReferralsSummaryPerOriginReport as $objReferralsSummaryPerOriginReport) { ?>
                    <div class="container_referral">
                        <label style="width: 100%;"><?php echo $objReferralsSummaryPerOriginReport->name ?></label>
                        <div class="div_referral breadcrumb"><?php echo $objReferralsSummaryPerOriginReport->amount ?></div>
                    </div>
                <?php } ?>
            </div>
        </fieldset>

        <fieldset>
            <legend>Bonuses generated</legend>
            <div class="col-sm-12" style="margin-bottom: 5px; height: 25px; height: auto;">
                <?php foreach ($arrBonusesSummaryPerOriginReport as $objBonusesSummaryPerOriginReport) { ?>
                <div class="container_referral">
                    <label style="width: 100%;"><?php echo $objBonusesSummaryPerOriginReport->name ?></label>
                    <div class="div_referral breadcrumb"><?php echo $objBonusesSummaryPerOriginReport->amount ?></div>
                </div>
                <?php } ?>
            </div>
        </fieldset>
    </div>
</div> 
