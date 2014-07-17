Description:
------------

Genius Referrals in a intent to improve the integration process with its clients has created this library. 
Which allows customers to consume, using Javascript, all Genius Referrals RESTful API resources located at http://api.geniusreferrals.com/doc/ . 

Installation:
------------

The installation process for this client in very simple, only in three steps. 

### 1- Add the jQuery library to your Web page. 

There are several ways to integrate jQuery with your Web page, to consult more integration ways please check out the jQuery Website at www.jquery.com. 
In this particular case we are going to add jQuery to our Web page using the tag script. Add the tag to the head section on your Web page.

```
<!DOCTYPE html>
<html>
    <head>
        <script src="http://code.jquery.com/jquery-1.9.0.js"></script>
    </head>
    <body>
    </body>
</html>
``` 

### 2- Download the GRAPIJavascriptClient client

Clone the client using git inside your project: 

```
git clone git@github.com:GeniusReferrals/GRAPIJavascriptClient.git
```

#### OR

Download the zip client using this link [GRAPIJavascriptClient](https://github.com/GeniusReferrals/GRAPIJavascriptClient/archive/master.zip), 
unzip the package and save it in a folder under your project directory with public access, example: /web. 

### 3- Add the client GRAPIJavascriptClient to your Web page. 

Use the tag script one more time to add the client to your Web page. 

```
<!DOCTYPE html>
<html>
    <head>
        <script src="http://code.jquery.com/jquery-1.9.0.js"></script>
        <script src="../geniusreferrals-api-client.js"></script>
    </head>
    <body>
    </body>
</html>
``` 

After finishing these installation steps, load the page in you Web browser and make sure that the jQuery libray and the GRAPIJavascriptClient were successfully loaded. 

Should you need more help with the installation please review this: 

* [geniusreferrals tests](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.html) 

Examples:
---------

We have implemented severals examples to show you how to utilize the client. Please check them out here [Integration examples](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.html).

For you to be able to test the examples you must substitute the parameters YOUR_USERNAME y YOUR_API_TOKEN on file [geniusreferrals-test.js](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.js) by the proper username and api token assigned to you on Genius Referrals platform.


Reporting an issue or a feature request
---------------------------------------

Issues and feature requests are tracked in the [Github issue tracker.](https://github.com/GeniusReferrals/GRAPIJavascriptClient/issues)
