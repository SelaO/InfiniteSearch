// This event is fired with the user accepts the input in the omnibox.
chrome.omnibox.onInputEntered.addListener(function (text) {
  // Encode user input for special characters , / ? : @ & = + $ #
  var encodedText = encodeURIComponent(text);

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      searchQuery: encodedText,
    });
  });
});
