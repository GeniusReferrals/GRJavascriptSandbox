Descripción:
------------

Genius Referrals en un intento de mejorar el proceso de integración con sus servicios ha creado esta biblioteca (cliente). La cual permite a sus clientes, a través de Javascript, consumir los recursos de su RESTful API localizada en http://api.geniusreferrals.com/doc/ . 

Instalación:
------------

El proceso de instalación de este cliente es bien sencillo, solo en tres pasos. 

### 1- Agregar la biblioteca jQuery a su página Web. 

Hay varias vías para integrar jQuery a su página Web, para consultar otras vías dirigirse al sitio de jQuery www.jquery.com. En este ejemplo vamos a agregar jQuery utilizando la etiqueta script. Agregue la etiqueta en la sección head de su página.

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

### 2- Descargar la biblioteca GRAPIJavascriptClient 

Clone la biblioteca usando git dentro de su proyecto: 

```
git clone git@github.com:GeniusReferrals/GRAPIJavascriptClient.git
```

#### O

Descargue la biblioteca compactada utilizando este vínculo [GRAPIJavascriptClient](https://github.com/GeniusReferrals/GRAPIJavascriptClient/archive/master.zip) , descompactela y guardela en un directorio en su proyecto que sea de acceso público, ejemplo: /web 

### 3- Agregar la biblioteca GRAPIJavascriptClient en su página Web. 

Utilize la etiqueta script para agregar la biblioteca a su página Web. 
      
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
Después de estos pasos de instalación cargue su página en un navegador Web y revise que la bibliotecas de jQuery y GRAPIJavascriptClient fueron cargadas exitosamente.

Si necesita más ayuda revise este ejemplo: 

* [geniusreferrals tests](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.html) 

Ejemplos:
---------

Hemos implementado varios ejemplos donde se muestra cómo utilizar la biblioteca. Por favor revise [Ejemplos de integración](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.html). 

Para probar los ejemplos debe sustituir los parameters YOUR_USERNAME y YOUR_API_TOKEN que aparecen en el archivo [geniusreferrals-test.js](https://github.com/GeniusReferrals/GRAPIJavascriptClient/blob/master/tests/geniusreferrals-test.js) por su usuario y api token asignados en la plataforma Genius Referrals.

Reportando un problema o nueva funcionalidad:
---------------------------------------------

Para reportar un problema utilice [Github issue tracker.](https://github.com/GeniusReferrals/GRAPIJavascriptClient/issues)
