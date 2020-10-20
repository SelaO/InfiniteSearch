
const searchField = document.getElementById("search-field");
const isRegExCheckBox = document.getElementById("is-regex");
const isCaseSensitiveCheckBox = document.getElementById("is-case-sensitive");

chrome.storage.sync.get(['isRegEx','isCaseSensitive'], function(obj) {
  isRegExCheckBox.checked = obj.isRegEx;
  isCaseSensitiveCheckBox.checked = obj.isCaseSensitive;
});

const inputHandler = function (e) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const payload = {
      searchQuery: e.target.value,
      isRegex: isRegExCheckBox.checked,
      isCaseSensitive: isCaseSensitiveCheckBox.checked,
    };
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
};

searchField.addEventListener("input", inputHandler);

searchField.addEventListener("keyup", function(event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    inputHandler(event);
  }
});

isRegExCheckBox.addEventListener('change', e => {
  chrome.storage.sync.set({isRegEx: e.target.checked});
});
