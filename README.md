# atvImg

This is a fork from [drewwilson](https://github.com/drewwilson/atvImg), thanks for his great work.

And here're some changes:

- Simplify usage with better API
- Add effect on a single `<img>` element
- Add jQuery / Zepto support
- Add Vue.js support

## Installation
- Install via NPM
    > npm install atvimg
    
- Manually add `atvImg.js` and `atvImg.css` into your project

## Demo
- [Demo with Zepto only](http://chuyik.github.io/atvImg/demo/index.html)
- [Demo with Vue.js](http://chuyik.github.io/atvImg/demo/vue-index.html)

## Usage
Available options are listed [here](https://github.com/chuyik/atvImg/blob/master/atvImg.js#L16-L20).

```html
<img id="atvImg1" src="https://raw.githubusercontent.com/BrianCS/atvImg/addDemo/demo/images/kloc-icon-flattened.jpg">

<script>
    $('#atvImg1').atvImg(options)
</script>
```

-------------------

## License

This project is under the same license as the original work.
 
> This `atvImg` plug-in is dual licensed under the MIT and GPL licenses:
>  * http://www.opensource.org/licenses/mit-license.php
>  * http://www.gnu.org/licenses/gpl.html
>
> I used http://designmodo.com/apple-tv-effect as reference and inspiration when creating this plug-in.
