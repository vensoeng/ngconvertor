# NGConvertor

**NGConvertor** enables developers to seamlessly convert numbers between Khmer and English (Arabic) numerals. Our mission is to bridge the gap between Latin and Khmer numeral systems and support an inclusive open-source ecosystem for Cambodian software development.

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

© Designs by VenSoeng
