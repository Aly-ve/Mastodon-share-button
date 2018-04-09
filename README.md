# Mastodon share button

As the same way than Facebook or Twitter, this "plugin" allows developers to append a button to share content to Mastodon.

You just need to append `mastodon.js` or `mastodon.min.js` at the end of your `<body>`.

## Create the elements
To create elements in page's DOM, you have to create a div with `mastodon-share-button` as a class.

For example:

```html
<div 
  class="mastodon-share-button"
  data-target="https://framapiaf.org"
  data-name="Framapiaf"
  data-buttonstyle="btn btn-secondary"
></div>
```

## Some explications

* **data-target**: the link you want to share
* **data-name**: A little resume of your link
* **data-buttonstyle**: to add some style to the button, it muste be a class like `btn` on Bootstrap.

## Adapt Mastodon Share Button to your design

To open a homogenious modal, get the instance's address field [etc], you need to put a variable with your preferences.
This variable contains callback to open and close modal and/or dialog, the id of the button to share and close modal.

Example:

```javascript
var msbConfig = {
  openModal: function () {
    $('#exampleModal').modal('show');
  },
  closeModal: function () {
    $('#exampleModal').modal('hide');
  },
  addressFieldId: 'mbs-address',
  buttonModalId: 'modalShareButton'
};
```

Too see an concrete example, please see the `index.html` at the root of this repository.

And its create all elements itself.

# Attention
For now, it's working only for Firefox.
Others browsers will be supported as soon as possible.
