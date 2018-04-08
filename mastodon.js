(function(){

  function isFirefox() {
    return typeof InstallTrigger !== 'undefined';
  }

  var buttons = document.getElementsByClassName('mastodon-share-button');
  
  console.log('test')
  for(var i = 0; i < buttons.length ; i++) {
    (function(j) {
      if (isFirefox()) {
        var target = buttons[j].dataset.target;
        var name = buttons[j].dataset.name;
        var buttonStyle = buttons[j].dataset.buttonstyle;
        var button = document.createElement('button');
  
        if (buttonStyle)
          button.setAttribute('class', buttonStyle)
  
        var buttonText = document.createTextNode('Toot');
        button.appendChild(buttonText);
        buttons[j].appendChild(button);
    
        button.addEventListener('click', function () {
            window.open('web+mastodon://share?text=' + name + '%20' + 'target', '__blank');
        }, false)
      }
    })(i)
  }
})()