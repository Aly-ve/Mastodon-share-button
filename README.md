# Mastodon share button

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
></div>
```

## Some explanations

* **data-target**: this is the URL which will be shared on Mastodon
* **data-name**: Text to introduce the URL in your toot
* **data-buttonstyle**: buttonstyle is the class which is added to the button as a DOM property

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

## Explainations
* openModal: **callback** to open the modal when the user isn't running Firefox
* closeModal: **callback** to close the modal
* addressFieldId: The **id** of the model's input to complete the instance's link
* buttonModalId: The **id** to open the new window and share your toot on Mastodon
* memorizeFieldId: It's the **id** of the checkbox to create a cookie and save the instance on user's browser

Too see an concrete example, please see the `demo/index.html` at the root of this repository.

And its create all elements itself.

## Be careful
MSB works fine but don't forget it still on development.
