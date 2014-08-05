Description
-----------

Genius Referrals in an attempt to improve the integration process with its services has created the GRJavascriptSandbox application. Which allows, through Javascript, to show customers the integration process with the Genius Referrals platform in a sample application.


Instalation:
------------

The installation process of this application is very simple.

## 1- Install the GRJavascriptSandbox application. You can choose any of these two options:

### 1- Clone the application using git: 

```
git clone git@github.com:GeniusReferrals/GRJavascriptSandbox.git
```

### 2- Download the application zip using this link [GRJavascriptSandbox](https://github.com/GeniusReferrals/GRJavascriptSandbox/archive/master.zip), and locate it in your web browser directory.


## 2- Install vendor GUZZLE with it's dependencies, needed for developing the GRJavascriptSandbox application.

### Using Composer

We recommend Composer to install this vendor.

#### 1- Install Composer

```cd``` in the app directory (eg: my_project) and execute:

```
curl -sS https://getcomposer.org/installer | php
```

#### 2- Add the GUZZLE package as a dependency executing:  

```
php composer.phar require guzzle/guzzle:~3.7
```


Application structure
---------------------

The app has only 2 pages that describe all things you can do with our [clients](https://github.com/GeniusReferrals), find below all the functionalities:

### 1- Manage advocate, where you can do the following:

 - List advocate
 - Search advocate
 - Create advocate

Per each advocate you can do the following:

 - Refer a friend program
 - Create referrer
 - Process bonus
 - Checkup bonus

### 2- Refer a friend program (4 tabs)

 - Overview
 - Referral tools
 - Bonuses earned
 - Redeem bonuses

To report issues use [Github issue tracker.](https://github.com/GeniusReferrals/GRJavascriptSandbox/issues)
