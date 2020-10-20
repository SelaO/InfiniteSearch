let intervalId;
let lastValue;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { searchQuery, isRegex, isCaseSensitive } = request;

  if (!!searchQuery && searchQuery.length > 0) {
    clearInterval(intervalId);
    $("body").unhighlight({ className: "highlight-continuously" });
    lastValue = searchQuery;
    intervalId = setInterval(
      () =>
        $("body").highlight(lastValue, {
          isRegex: isRegex,
          className: "highlight-continuously",
          caseSensitive: isCaseSensitive,
        }),
      1000
    );
  } else {
    clearInterval(intervalId);
    $("body").unhighlight({ className: "highlight-continuously" });
  }
});

// TODO: maybe flash newly scrolled to elements
