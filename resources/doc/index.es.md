Descripción:
------------

Genius Referrals en un intento de mejorar el proceso de integración con sus servicios ha creado esta aplicación GRJavascriptSandbox.
La cual permite a sus clientes, a través de JS, mostrarle a los clientes el proceso de integración con la plataforma de GR en una aplicación de ejemplo.

Instalación:
------------

El proceso de instalación de esta aplicación GRJavascriptSandbox es muy sencillo 

## 1- Instalar aplicación GRJavascriptSandbox. Puede escoger cualquiera de estas 2 opciones:

### 1- Clone la aplicación usando git: 

```
git clone git@github.com:GeniusReferrals/GRJavascriptSandbox.git
```

### 2- Descargar la aplicación compactada utilizando este vínculo [GRJavascriptSandbox](https://github.com/GeniusReferrals/GRJavascriptSandbox/archive/master.zip).


## 2- Instalar vendor GUZZLE con sus dependencias, necesarias para el desarrollo de la aplicación GRJavascriptSandbox.

### Usando Composer

Recomendamos composer para intallar la aplicación.

#### 1- Installar Composer

```cd``` en el directorio de la aplicación (ej: my_project) y ejecute:

```
curl -sS https://getcomposer.org/installer | php
```

#### 2- Adicionar el paquete GUZZLE como una dependencia ejecutando:  

```
php composer.phar require guzzle/guzzle:~3.7
```


Estructura de la aplicación
---------------------------

La aplicación consta de 2 páginas que se describen a continuación:

### 1- Manage advocate, en la cual se pueden realizar las siguientes funcionalidades::

 - List advocate
 - Search advocate
 - Create advocate

Por cada advocate se pueden realizar las siguientes funcionalidades:

 - Refer a friend program
 - Create referrer
 - Process bonus
 - Checkup bonus

### 2- Refer a friend program (Consta de 4 tabs)

 - Overview
 - Referral tools
 - Bonuses earned
 - Redeem bonuses

Para reportar un problema utilice [Github issue tracker.](https://github.com/GeniusReferrals/GRJavascriptSandbox/issues)
