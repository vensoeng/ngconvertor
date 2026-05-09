# NGConvertor@1.0.0

**NGConvertor @1.0.0** enables developers to seamlessly convert numbers between Khmer and English (Arabic) numerals. Our mission is to bridge the gap between Latin and Khmer numeral systems and support an inclusive open-source ecosystem for Cambodian software development.

| Input | Output |
|-------|--------|
| `098` | `០៩៨` |
| `2024` | `២០២៤` |
| `០៩៨` | `098` |
| `២០២៤` | `2024` |

---

## CDN Usage

```html
<!-- Latest version -->
<script src="https://vensoeng.vercel.app/ngconvertor@1.0.0/dist/ngConvertor.js"></script>
```

### `ngConvertor.toKhmer(input)`

Converts English/Arabic digits to Khmer digits.

```js
ngConvertor.toKhmer(98)       // => "៩៨"
ngConvertor.toKhmer('098')    // => "០៩៨"
ngConvertor.toKhmer('2024')   // => "២០២៤"
```

### `ngConvertor.toEnglish(input)`

Converts Khmer digits to English/Arabic digits.

```js
ngConvertor.toEnglish('០៩៨')  // => "098"
ngConvertor.toEnglish('២០២៤') // => "2024"
```

### `ngConvertor.convert(input)` *(auto-detect)*

Detects the digit type and converts automatically.

```js
ngConvertor.convert('098')    // => "០៩៨"  (English → Khmer)
ngConvertor.convert('០៩៨')   // => "098"   (Khmer → English)
```

### `ngConvertor.isKhmer(input)`

Returns `true` if the string contains only Khmer digits.

```js
ngConvertor.isKhmer('០៩៨')  // => true
ngConvertor.isKhmer('098')   // => false
```

### `ngConvertor.isEnglish(input)`

Returns `true` if the string contains only English/Arabic digits.

```js
ngConvertor.isEnglish('098')  // => true
ngConvertor.isEnglish('០៩៨') // => false
```

# NGConvertor@2.1.0

**NGConvertor @2.1.0** add new feature that converts numbers to Khmer text.

Example:

- `168` -> `មួយរយហុកសិបប្រាំបី`

## CDN Usage (GitHub)

```html
<script src="https://vensoeng.vercel.app/ngconvertor@2.1.0/dist/ngConvertor.js"></script>
<script>
  console.log(NGConvertor.toKhmerText(168));
</script>
```

## Browser Usage

```html
<script src="./dist/dist/ngConvertor@2.1.0.js"></script>
<script>
  const result = NGConvertor.toKhmerText(2026);
  console.log(result);
</script>
```
## With convert number
Converts the number to Englsih after convert to text.

```js
const result = NGConvertor.toKhmerText(ngConvertor.toEnglish("១៦៨"));
console.log(result); // Result => មួយរយហុកសិបប្រាំបី
```

## The Crazy Feature
Converts with logic check value first.

```html
<center>Input: <input data-id="input" placeholder="Please enter number" type="text"><br></center>
<center>Output: <span data-id="output"> __ __ __ </span><br><br></center>
<center>ngconvertor@v2.1.0</center>

<script src="https://vensoeng.vercel.app/ngconvertor@2.1.0/dist/ngConvertor.js"></script>
<script>
//This is for make action feature Try it live
var input = document.querySelector("input[data-id='input']");
var output = document.querySelector("span[data-id='output']");
input.addEventListener("input", function() {
    var value = input.value;
    if (value.trim() === "") {
        output.textContent = "__ __ __";
        return;
    }
    if(ngConvertor.isKhmer(value.trim())) {
       output.textContent = ngConvertor.toKhmerText(ngConvertor.toEnglish(value));
       console.log(ngConvertor.isKhmer(value.trim()));
       return;
    } else if(ngConvertor.isKhmer(value.trim()) == false && ngConvertor.isEnglish(value.trim()) == false) {
        alert("You enter invalid number! Please enter only Khmer or English number.");
        output.textContent = "__ __ __";
        input.value = "";
        return;
    }else{
        var result = ngConvertor.toKhmerText(value);
        output.textContent = result;
    }
});
</script>
```

## Node.js Usage

```js
const NGConvertor = require("./dist/convertor.js");

console.log(NGConvertor.toKhmerText(168));
console.log(NGConvertor.toKhmerText("1002003"));
```

© Designs by VenSoeng
