(function(){

  function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  }

  function msbOpenModal() {
    if (msbConfig && msbConfig.openModal && msbConfig.addressFieldId) {
      msbConfig.openModal();
    }
  }

  function msbCloseModal() {
    if (msbConfig && msbConfig.closeModal) {
      msbConfig.closeModal();
    }
  }

  var buttons = document.getElementsByClassName('mastodon-share-button');
  
  for(var i = 0; i < buttons.length ; i++) {
    (function(j) {

      var target = buttons[j].dataset.target;
      var name = buttons[j].dataset.name;
      var buttonStyle = buttons[j].dataset.buttonstyle;
      var callbackOpenModel = buttons[j].dataset.open;
      
      var button = document.createElement('button');

      if (buttonStyle)
        button.setAttribute('class', buttonStyle)

      var buttonText = document.createTextNode('Toot');
      button.appendChild(buttonText);
      buttons[j].appendChild(button);
  
      button.addEventListener('click', function () {
        if (isFirefox()) {
          var windowId = window.open('web+mastodon://share?text=' + name + '%20' + target, '__blank');
          if (!windowId) {
            mbsOpenModal();
          }
        } else {
          msbOpenModal();
        }
      }, false)

      if (msbConfig && msbConfig.addressFieldId && msbConfig.buttonModalId) {
        document.getElementById(msbConfig.buttonModalId).addEventListener('click', function () {
          var msbInstanceAddress = document.getElementById(msbConfig.addressFieldId).value;

          /**
           * @Todo: verify the url with a regular expression
           * @Todo: add cookies management to save address instance
           */
          if (msbInstanceAddress && msbInstanceAddress.length > 0) {
            window.open(msbInstanceAddress + '/share?text=' + name + '%20' + target, '__blank');
            msbCloseModal()
          }
        }, false);
      }
    })(i)
  }
})()