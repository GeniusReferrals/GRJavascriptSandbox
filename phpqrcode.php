<?php

require_once './vendor/autoload.php';

use GeniusReferrals\GRPHPAPIClient;

class phpqrcode {

    protected $objGeniusReferralsAPIClient;

    public function __construct() {

        session_start();

        // Create a new GRPHPAPIClient object
        $this->objGeniusReferralsAPIClient = new GRPHPAPIClient('alain@hlasolutionsgroup.com', '8450103c06dbd58add9d047d761684096ac560ca');
    }

    /**
     * tab Referral tools
     */
    public function getPhpQRCode() {

        try {
            if (!empty($_SESSION['strAdvocateToken'])) {

                $strGRAdvocateToken = $_SESSION['strAdvocateToken'];
                $arrAdvocatesShareLinks = $this->objGeniusReferralsAPIClient->getAdvocatesShareLinks('genius-referrals', $strGRAdvocateToken);
                $arrAdvocatesShareLinks = json_decode($arrAdvocatesShareLinks);

                $tempDir = __DIR__ . '\..\uploads';
                $codeContents = isset($arrAdvocatesShareLinks->data->{'get-15-for-90-days-1'}->{'genius-referrals-default-2'}->{'personal'}) ? $arrAdvocatesShareLinks->data->{'get-15-for-90-days-1'}->{'genius-referrals-default-2'}->{'personal'} : '';
                if (file_exists(__DIR__ . '\..\Library\phpqrcode\qrlib.php')) {
                    require __DIR__ . '\..\Library\phpqrcode\qrlib.php';
                    \QRcode::png($codeContents, $tempDir . '\qrcode.png', QR_ECLEVEL_H);
                }
            }
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }

}
