// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the page load
chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(null, {file: "external.js"});
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: 'redmine.mobistep'
    }],
});