/* eslint-disable no-undef */

const openURLAsTab = (url) => {
    chrome.tabs.create(
        {
            active: true,
            url: url
        }
    )
}

export { openURLAsTab };