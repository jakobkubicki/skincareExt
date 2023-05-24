/* eslint-disable no-undef */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request)

  if (request.message === 'start_selection') {
    // Inject a script to the active tab to change the cursor and listen for text selection
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: function () {
          // CSS to change cursor style
          const styleElement = document.createElement('style')
          styleElement.innerHTML = 'body { cursor: crosshair; }'
          document.head.appendChild(styleElement)

          function getHoveredText () {
            const range = document.caretRangeFromPoint(
              window.event.clientX,
              window.event.clientY
            )
            if (range) {
              const node = range.startContainer
              return node.nodeType === Node.TEXT_NODE ? node.data : ''
            }
            return ''
          }

          // Event listener for mouseover
          document.body.addEventListener('mousemove', function (event) {
            let hoveredText = getHoveredText()
            // Send hoveredText to popup script
            chrome.runtime.sendMessage({
              message: 'selected_text',
              text: hoveredText
            })
          })

          // Event listener for keydown
        //   document.body.addEventListener('keydown', function (event) {
        //     if (event.key === 'Enter') {
        //       let hoveredText = getHoveredText()
        //       // Send hoveredText to popup script
        //       chrome.runtime.sendMessage({
        //         message: 'selected_text_done',
        //         text: hoveredText
        //       })
        //     }
        //   })
        // not nessesary, can be handled in front ^ will probably delete later
        
        }
      })
    })
  }

  if (request.message === 'analyze_product') {
    // Exit selection mode
    setIsSelecting(false)
    // Make API call here with request.text
    fetch('http://your-server.com/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product: request.text })
    })
      .then(response => response.json())
      .then(data => {
        // Do something with the response from your server
        // Send a message back to the content script to notify that the analysis is done
        chrome.tabs.sendMessage(sender.tab.id, {
          message: 'selected_text_done'
        })
      })
      .catch(error => console.error(error))
  }
})
