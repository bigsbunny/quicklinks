/* eslint-disable no-undef */
import { initStorage } from '../util/storage';

chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL || details.reason === chrome.runtime.OnInstalledReason.UPDATE) {
        chrome.tabs.create({
            active: true,
            url: "https://quicklinks-install.netlify.app/"
        })
    }
    initStorage();
})