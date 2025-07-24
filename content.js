document.body.style.border = "5px solid red";

var transferedInteraction = []

stateValue = 0
var AssignedToField


const observer = new MutationObserver(() => {
  console.log(window.location.href, stateValue, transferedInteraction)
  if (window.location.href.includes("interaction/-1")){
    setTimeout(() => {
      const allInputs = findAllItemsIncludingShadowRoots(document, "INPUT", "", "");
      var allButtons = findAllItemsIncludingShadowRoots(document, "BUTTON", "", "now-button -tertiary -sm is-bare only-icon")
      var selected = false

      allButtons.forEach(icon => {
        if (icon.getAttribute('aria-description').includes("Assigned") && icon.getAttribute("aria-label").includes("Open")) {
          selected = true
          AssignedToField.blur()
        }
      })
      if (!selected) {
          allInputs.forEach(item => {
            if (item.name.includes("assigned_to_input")) {
              item.value = "32953114"
                item.click()
                var div = findAllItemsIncludingShadowRoots(document, "LI", "", "now-dropdown-list-item is-multi-line -md")
                div.forEach(li => {
                  if (li.outerText.includes("32953114")) {
                    AssignedToField = item
                    li.click()
                  }
                })

          }
          if (item.name.includes("u_callback_number") && item.value == "") {
            item.value = "UNKNOWN"
          }

        })
      }


      }, 500)
    stateValue = 1
  } else if (window.location.href.includes("interaction")  && stateValue == 1 ) {
    setTimeout(() => {
          var allButtons = findAllItemsIncludingShadowRoots(document, "SPAN", "", "now-select-trigger-label")
          var interactionType = allButtons[2]
          var allInputs = findAllItemsIncludingShadowRoots(document, "INPUT", "", "now-input-native")
          var ticketNumber = ""

          allInputs.forEach(item => {
            if (item.value.includes("Closed")) {
              console.log(item)
              console.log("Interaction is Already Closed")
              stateValue = 0
              return
            }
          })



          allInputs.forEach(item => {
            if (item.name == "number"){
              ticketNumber = item.value
            }
          })


          if (interactionType.outerText.includes("Incident - New")) {
            console.log(transferedInteraction)
            if (!transferedInteraction.includes(ticketNumber)){
              transferedInteraction.push(ticketNumber)
              allButtons = findAllItemsIncludingShadowRoots(document, "BUTTON", "" , "now-split-button-action -secondary -md")

              allButtons.forEach(item => {
                if (item.id.includes("action") && item.outerText.includes("Create incident")){
                  createIncidentButton = item
                }
              })
              console.log(createIncidentButton)
              createIncidentButton.click()
            }
          }
          else if (interactionType.outerText.includes("Service Request - New")) {
              if (!transferedInteraction.includes(ticketNumber)){
                transferedInteraction.push(ticketNumber)
                allButtons = findAllItemsIncludingShadowRoots(document, "BUTTON", "" , "now-split-button-trigger only-icon -secondary -md")

              allButtons.forEach(item => {
                if (item.id.includes("trigger") && item.getAttribute('aria-label').includes("Create incident - More Actions")){
                  item.click()
                  setTimeout(() => {
                    const div = findAllItemsIncludingShadowRoots(document, "DIV", "Create request", "now-dropdown-list-item is-focused is-select-none -md")
                    console.log("Found", div)
                      div[0].click()
                  }, 500)

                }
              })
            }
          }
          stateValue = 0
          

    }, 1000)
  }

});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});


function findAllItemsIncludingShadowRoots(root = document, item = "INPUT", innerHTML, className) {
  const items = [];

function traverse(node) {
  // Prevent traversing elements with display: none (computed style)
  if (node instanceof Element) {
    const computedStyle = getComputedStyle(node);
    if (computedStyle.display === "none") {
      return; // Skip this node and its children
    }
  }

  // Matching logic
  if (innerHTML !== "") {
    if (className !== "") {
      if (
        node.tagName === item &&
        node.innerHTML.includes(innerHTML) &&
        node.className === className
      ) {
        items.push(node);
      }
    } else {
      if (node.tagName === item && node.innerHTML.includes(innerHTML)) {
        items.push(node);
      }
    }
  } else if (className !== "") {
    if (node.tagName === item && node.className.includes(className)) {
      items.push(node);
    }
  } else {
    if (node.tagName === item) {
      items.push(node);
    }
  }

  // Traverse shadow root if it exists
  if (node.shadowRoot) {
    traverse(node.shadowRoot);
  }

  // Traverse children
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.ELEMENT_NODE || child instanceof ShadowRoot) {
      traverse(child);
    }
  });
}
  traverse(root);
  return items;
}


function goThroughRequest() {


  setInterval(()=>{

    var button = findAllItemsIncludingShadowRoots(document, "SPAN", "Related", "now-tab-label");
    button[0].click()
        console.log("RTM Related: ",button)
    var test = findAllItemsIncludingShadowRoots(document, "A", "RITM", "")
    test[0].click()
    var button1 = findAllItemsIncludingShadowRoots(document, "SPAN", "Related", "now-tab-label");
    console.log("SCTASK Related: ",button1)
    button1[0].click()
    test = findAllItemsIncludingShadowRoots(document, "A", "SCTASK", "" )
    test[0].click()

  }, 2000)
}

async function searchUsers() {
  const inputValue = input.value
  console.log(inputValue)
  result.innerHTML = ""

  await fetch(`http://localhost:8080/search/users/URMC-sh/${inputValue}`)
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      split = item.name.split(", ")
      item.name = split[1] + " " + split[0]
      result.innerHTML += item.name + '<br/>'
    })
      
     console.log(data)
  }).catch(error =>{
    console.log(error)
  })
}



