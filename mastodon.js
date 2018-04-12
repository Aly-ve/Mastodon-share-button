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

  function msbSetCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + days*86400000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = name + '=' + value + '; ' + expires + '; path=/'
  }

  function msbGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }

  function msbDeleteCookie() {
    document.cookie = "";
  }
  
  var COOKIE_NAME = 'instance-address';
  var URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
  var msbButtons = document.getElementsByClassName('mastodon-share-button');
  
  for(var i = 0; i < msbButtons.length ; i++) {
    (function(j) {

      var msbTarget = msbButtons[j].dataset.target;
      var name = msbButtons[j].dataset.name;
      var msbButtonStyle = msbButtons[j].dataset.buttonstyle;
      
      var button = document.createElement('button');

      if (msbButtonStyle) {
        button.setAttribute('class', msbButtonStyle)
      }

      var buttonText = document.createTextNode('Toot');
      button.appendChild(buttonText);
      msbButtons[j].appendChild(button);
  
      button.addEventListener('click', function () {
        var instanceAddress = null;
        if (isFirefox()) {
          var windowId = window.open('web+mastodon://share?text=' + name + '%20' + msbTarget, '__blank');
          if (!windowId) {
            instanceAddress = msbGetCookie(COOKIE_NAME);
            if (instanceAddress) {
              window.open(instanceAddress + '/share?text=' + name + '%20' + msbTarget, '__blank');
            } else {
              mbsOpenModal();
            }
          }
        } else {
          instanceAddress = msbGetCookie(COOKIE_NAME);
          if (instanceAddress) {
            window.open(instanceAddress + '/share?text=' + name + '%20' + msbTarget, '__blank');
          } else {
            msbOpenModal();
          }
        }
      }, false)

      if (msbConfig && msbConfig.addressFieldId && msbConfig.buttonModalId) {
        document.getElementById(msbConfig.buttonModalId).addEventListener('click', function () {
          var msbInstanceAddress = document.getElementById(msbConfig.addressFieldId).value;
          if (msbInstanceAddress.match(URL_REGEX).length > 0) {
            if (msbInstanceAddress && msbInstanceAddress.length > 0) {
              var msbMemorizeIsChecked = document.getElementById(msbConfig.memorizeFieldId).checked;
              if (msbConfig.memorizeFieldId && !msbGetCookie(COOKIE_NAME) && msbMemorizeIsChecked) {
                msbSetCookie(COOKIE_NAME, msbInstanceAddress, 7);
              }
              window.open(msbInstanceAddress + '/share?text=' + name + '%20' + msbTarget, '__blank');
              msbCloseModal()
            }
          }
        }, false);
      }
    })(i)
  }
})()