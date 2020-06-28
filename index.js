// Телефонная книга
var phoneBook = {};

/**
 * @param {String} command
 * @returns {*} - результат зависит от команды
 */
module.exports = function (command) {
  var commandWordsArray = command.split(' ');
  var commandName = commandWordsArray[0];

  if (commandName === 'ADD') {
    return addContact(command);
  }

  if (commandName === 'REMOVE_PHONE') {
    return removePhone(command);
  } 

  if (commandName === 'SHOW') {
    return show();
  }

  function addContact() {
    var newName = commandWordsArray[1];
    var phoneNumbersArrayToAdd = commandWordsArray[2].split(',');

    if (phoneBook.hasOwnProperty(newName)) {
      var initialPhonesArray = phoneBook[newName].split(', ');
      var updatedPhoneList = initialPhonesArray.concat(phoneNumbersArrayToAdd);
      phoneBook[newName] = updatedPhoneList.join(', ');
      return;
    }

    phoneBook[newName] = phoneNumbersArrayToAdd.join(', ');
  }

  function removePhone() {
    var phoneToRemove = commandWordsArray[1];
    var clone = {};

    for (var key in phoneBook) {
      clone[key] = phoneBook[key];
    }

    for (var name in phoneBook) {
      if (phoneBook[name] == phoneToRemove) {
        delete phoneBook[name];
      } else if (phoneBook[name].split(', ').indexOf(phoneToRemove) != -1) {
        var initialPhonesArray = phoneBook[name].split(', ');
        for (var i = 0; i < initialPhonesArray.length; i++) {
          if (initialPhonesArray[i] == phoneToRemove) {
            initialPhonesArray.splice(i, 1);
          }
        }
        phoneBook[name] = initialPhonesArray.join(', ');
      }
    }

    return JSON.stringify(clone) === JSON.stringify(phoneBook) ? false : true;
  }

  function show() {
    var arr = [];
    var i = 0;
    for (var key in phoneBook) {
      arr[i] = key + ': ' + phoneBook[key];
      i++;
    }

    return arr.sort();
  }
};