# atvImg

`atvImg` = 'AppleTV Image'

---

This plug-in will automatically turn your layered Apple TV PNGs into
3D parallax icons, the same way the new Apple TV treats app icons.
You can have any number of AppleTV Images on the page.
 
An example of this plug-in can bee seen here: http://kloc.pm
 
-------------------
 
Here is how to setup the HTML for a single `atvImg`:
```
<div class="atvImg">
   <div class="atvImg-layer" data-img="/images/back.png"></div>
   <div class="atvImg-layer" data-img="/images/front.png"></div>
</div>
```
 
You can have any number of `'.atvImg-layer'` elements. So add as many as your icon needs. Be sure to use 2x (retina) scale PNGs. The plug-in will downscale for 1x screens. Using 2x scale PNGs is recommended so the icon will appear crisp on 2x screens.

Layer images should be 2x the size you want to display the icon as. The plug-in will adapt the `atvImg` to be whatever size it's parent element is. So if you set your `'.atvImg'` element to be 320px X 190px, that is how big the icon will appear. If you set it to be 640px X 380px, that is how big it will appear. Just be sure to use the correct aspect ratio for AppleTV icons.

Then call the funciton in you `<script>` tag or JS file like this: 

`atvImg();`

Just be sure you add that line after you've loaded the DOM. So put it below all your page's HTML just before the closing `</body>` tag or in a document.ready() function.

-------------------

This `atvImg` plug-in is dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html