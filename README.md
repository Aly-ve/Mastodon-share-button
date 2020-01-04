# Mastodon share button

➡️ For a demo, click [here](https://aly-ve.github.io/Mastodon-share-button/).

As the same way than Facebook or Twitter, this "plugin" allows developers to append a button to share content to Mastodon.

You just need to append `mastodon.js` at the end of your `<body>`.

## Create the elements
To create elements in page's DOM, you have to create a div with `mastodon-share-button` as a class.

For example:

```html
<div 
  class="mastodon-share-button"
  data-target="https://framapiaf.org"
  data-name="Framapiaf"
  data-buttonstyle="btn btn-secondary"
  data-text="Share on Mastodon"
></div>
```

## Some explanations

* **data-target**: this is the URL which will be shared on Mastodon
* **data-name**: Text to introduce the URL in your toot
* **data-buttonstyle**: buttonstyle is the class which is added to the button as a DOM property
* **data-text**: *(Optional)* Override default text for the button. If `data-text` does not exist, the default "Toot" button will be displayed.

## Adapt Mastodon Share Button to your design

To open a homogenious modal, get the instance's address field [etc], you need to put a variable with your preferences.
This variable contains callback to open and close modal and/or dialog, the id of the button to share and close modal.

### Integration

#### Bootstrap or your own modal

In the example, `addressFieldSelector` is automatically autofocused. In the case of you are using Bootstrap with jQuery (like mine), you must add an event like below.

```javascript
var msbConfig = {
  openModal: function () {
    $('#exampleModal').modal('show');
  },
  closeModal: function () {
    $('#exampleModal').modal('hide');
  },
  addressFieldSelector: '#mbs-address',
  buttonModalSelector: '#modalShareButton',
  memorizeFieldId: 'msb-memorize-instance',
  buttonDisplayText: false, 
  buttonIconHtml: '<i class="fa fa-mastodon" aria-hidden="true"></i>'

};

$('#exampleModal').on('shown.bs.modal', function() {
  $('#msb-address').focus();
}); 
```

#### Alertify.js
First of all, you have to write your own confirm's content yourself
```html
<div id="mastodon-share-button">
    <div class="form-group">
        <label for="msb-address">Enter your instance's address </label>
        <input type="text" class="form-control" id="msb-address" placeholder="https://framapiaf.org">
    </div>
    <div class="form-check">
        <input type="checkbox" class="form-check-input" id="msb-memorize-instance">
        <label class="form-check-label" for="msb-memorize-instance">Memorize my instance</label>
    </div>
</div>
```

```javascript
var msbConfig = {
    openModal: function (name, target) {
        alertify.confirm('Share on Mastodon', document.querySelector('#mastodon-share-button'), () => msbOnShare(name, target), function())
    },
    addressFieldSelector: '.ajs-body input#msb-address',
    buttonModalSelector: '.ajs-button ajs-ok',
    memorizeFieldId: 'msb-memorize-instance',
    buttonIconHtml: '<i class="fa fa-mastodon" aria-hidden="true"></i>'
};
```

## Explainations
* openModal: **callback** to open the modal when the user isn't running Firefox
* closeModal: **callback** to close the modal
* addressFieldSelector: The selector (`.selector` or `#selector` for example) of the model's input to complete the instance's link
* buttonModalSelector: Select the modal to open the new window and share your toot on Mastodon
* memorizeFieldId: It's the **id** of the checkbox to create a cookie and save the instance on user's browser
* buttonDisplayText: *(optional)* By default, a text is displayed. If you put `buttonDisplayText` to `false`, only your icon (if setted) will be displayed.
* buttonIconHtml: Contains HTML tags to append an icon (like Fork-Awesome's Mastodon icon)

Too see an concrete example, please see the [Github Pages](https://aly-ve.github.io/Mastodon-share-button/) at the root of this repository.

And it creates all elements by itself.
