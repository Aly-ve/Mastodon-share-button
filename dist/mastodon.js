"use strict";

const isFirefox = () => {
  return typeof InstallTrigger !== 'undefined'
}

const COOKIE_NAME = 'instance-address'
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/

function msbShareButtonAction(name, target) {
  let msbInstanceAddress = ''

  if (isFirefox()) {
    let windowId = window.open(`web+mastodon://share?text=${name}%20${target}`, `__blank`)
    return
  }
  else {
    msbInstanceAddress = msbGetCookie(name)
  }

  if (msbInstanceAddress.length > 0) {
    window.open(`${msbInstanceAddress}/share?text=${name}%20${target}`, `__blank`)
  }
  else {
    if (msbConfig && msbConfig.openModal && msbConfig.addressFieldId && msbConfig.buttonModalId) {
      let buttonModal = document.querySelector(`#${msbConfig.buttonModalId}`)
      buttonModal.data = { target, name }
      msbConfig.openModal()
    }
  }
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

function msbSetCookie(name, value, days) {
  let d = new Date()
  d.setTime(d.getTime() + days*86400000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = `${name}=${value}; ${expires}; path=/`
}

(function() {

  let msbButtons = document.querySelectorAll('.mastodon-share-button')

  for(let i = 0; i < msbButtons.length; i++) {
    (function(j) {

      let msbTarget = msbButtons[j].dataset.target
      let msbName = msbButtons[j].dataset.name
      let msbButtonStyle = msbButtons[j].dataset.buttonstyle

      /**
       * Create buttons
       */
      let button = document.createElement('button')
      let buttonText = document.createTextNode('Toot')

      if (msbButtonStyle) {
        button.setAttribute('class', msbButtonStyle)
      }

      button.appendChild(buttonText)
      msbButtons[j].appendChild(button)

      /**
       * Set the listener in each button
       */
      button.addEventListener('click', () => { msbShareButtonAction(msbName, msbTarget) }, true)

    })(i)
  }

  if (msbConfig && msbConfig.addressFieldId && msbConfig.buttonModalId) {
    document.querySelector(`#${msbConfig.buttonModalId}`).addEventListener('click', (e) => {

      let { name, target } = document.querySelector(`#${msbConfig.buttonModalId}`).data
      let msbInstanceAddress = document.querySelector(`#${msbConfig.addressFieldId}`).value

      if (!!msbInstanceAddress.match(URL_REGEX)) {
        if (msbConfig.memorizeFieldId) {
          let msbMemorizeIsChecked = document.querySelector(`#${msbConfig.memorizeFieldId}`).checked
          if (msbConfig.memorizeFieldId && !msbGetCookie(COOKIE_NAME).length > 0 && msbMemorizeIsChecked) {
            msbSetCookie(COOKIE_NAME, msbInstanceAddress, 7);
          }
        }

        window.open(`${msbInstanceAddress}/share?text=${name}%20${target}`, `__blank`)
        if (msbConfig && msbConfig.openModal) {
          msbConfig.closeModal()
        }
      }
    }, false)
  }

})()