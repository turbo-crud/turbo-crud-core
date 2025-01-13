# FuckPress

<p float="left">
  <img src="./coverage/branches.svg">
  <img src="./coverage/functions.svg">
  <img src="./coverage/lines.svg">
  <img src="./coverage/statements.svg">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/1aa03ce3-94ea-49c5-9860-89d0d33fda26" width=150>  
</p>

 	Yes, another lightweight, headless and simple static page generator but on html and yaml steroids. 

Made with love <3

## Why?

- Not all the webs needs Wordpress
- Not all the webs needs a database
- Why a CMS if the final users raise Jira ticket to change the home image, change the company address, etc
- You don't want to convert your cool html design to a wordpress theme (php)

## Steps

- Buy or download any html theme or template
- Install fuckpress
- Run fuckpress
- Build the static site
- Deploy it wherever you want: aws s3, github pages, apache, nginx, tomcat, iis, tiiny.host, namecheap, godaddy, render.com, Cloudflare Pages, Netlify, Vercel

## Requirements

- Nodejs
- Html pages

## Demo

- https://fuckpress.github.io/fuckpress-demo/
  - Hosted with github page
  - source: https://github.com/fuckpress/fuckpress-demo

## Tutorial

- https://youtu.be/Yvybagh2zcs

## Install

Install the tool

```
npm install -g github:/fuckpress/fuckpress-core
```

## Create new site

```
fuckpress --new-site acme
cd ./acme
```

## Start

```
fuckpress --start
```

Go to http://localhost:2708 and you will see the demo

<p align="center">
 <img src="https://github.com/user-attachments/assets/2ecc6d95-efd3-49f8-a3d6-9b88d3482411" width=500>
</p>

> This is just for dev, not for prod usage

## Publish

If you are ready to publish your awesome site, follow these steps

Generate the static site

```
fuckpress --publish
```

By default, it creates a **site** folder. If you need a custom folder:

```
fuckpress --publish --output=docs
```

The result folder will contain your static site ready to be deployed wherever you want.

## How to customize?

Just add a new field in **fp-admin.yaml**:

```
foo : bar
```

And put this field wherever you want in your html using [handlebars](https://handlebarsjs.com/contributing/interactive-examples.html) syntax

```
<h1>{{foo}}</h1>
```

Refresh the url or restart fuckpress

## Your own theme

Just download any theme from internet with the classic index.html and set the fields from the **fp-admin.yaml** using [handlebars](https://handlebarsjs.com/contributing/interactive-examples.html) syntax

```
<title>{{site_name}}</title>
```

Refresh the url or restart fuckpress

## Features

For more features or complex usage check the [wiki](https://github.com/fuckpress/fuckpress-core/wiki) or the [github page](https://fuckpress.github.io)

## For nodejs developers (contributors)

Clone this repository and execute

```js
npm run dev
```


## Acknowledgments

- https://www.brandcrowd.com/maker/logos
- https://github.com/lemidia/shopping-website-javascript
- https://github.com/creativetimofficial/awesome-landing-page
- https://codepen.io/shePen/pen/rNVyLPo


## Roadmap

- Check the issues page

## Contributors

<table>
  <tbody>    
    <td>
      <img src="https://avatars0.githubusercontent.com/u/3322836?s=460&v=4" width="100px;"/>
      <br />
      <label><a href="http://jrichardsz.github.io/">JRichardsz</a></label>
      <br />
    </td>
  </tbody>
</table>


https://github.com/constgenius/SidebarMenu

https://github.com/rad-frameworks/Admin-Dashboard-Template-and-UI-Kit

masonry

change jQuery by $ in theme/notify.min.js

https://github.com/codewithkyle/notifyjs
https://notifyjs.jpillora.com/
https://handlebarsjs.com/examples/builtin-helper-if-block.html

https://colorlib.com/polygon/adminator/forms.html

https://www.openxava.org/invoicedemo/m/Customer

https://themify.me/themify-icons

Success

$.notify("Access granted", "success");

Info

$.notify("Do not press this button", "info");

Warning

$.notify("Warning: Self-destruct in 3.. 2..", "warn");

Error

$.notify("BOOM!", "error");

## todo

- edit
- progress bar


## sandbox

   var requiredhatAreMissingCount = 0;
    var fieldsToCreate = {};
    for(var field of entityInfo.fields){
      let expectedHtmlElementId = `create_form_field_${entityInfo.name}_${field.name}`;
      var htmlElement = document.getElementById(expectedHtmlElementId);
      if (htmlElement.value != "") {
        fieldsToCreate[field.name] = htmlElement.value;
      }else{
        if(field.required ===true){
          requiredhatAreMissingCount++;
        }
      }
    }
    
    if(requiredhatAreMissingCount>0){
      $.notify("Please fill the required fields and try again", "error");
      return;
    }