console.log("This runs in every page!");
document.body.style.border = "5px solid blue";


const mainContainer = document.createElement("div")
mainContainer.classList = "container"


const input = document.createElement("input")
input.id = "ignore"


const result = document.createElement("div")
result.style.overflowY = "scroll"

const searchUserButton = document.createElement("button")
searchUserButton.innerHTML = "Search Users"
searchUserButton.classList.toggle("user-button")
searchUserButton.onclick = () => searchUsers()

const fillButton = document.createElement("button")
fillButton.innerHTML = "Test"
fillButton.onclick = () => goThroughRequest()

mainContainer.appendChild(input)
mainContainer.appendChild(searchUserButton)
mainContainer.appendChild(fillButton)
mainContainer.appendChild(result)
//document.body.prepend(mainContainer)



const style = document.createElement("style");
style.textContent = `
  * {
    background: rgba(0,0,0,0.3) !important
  }
`;
document.head.appendChild(style);

// 1. Find the sn-caller-lookup custom element
function findAllItemsIncludingShadowRoots(root = document, item = "INPUT", innerHTML, className) {
  const items = [];

  function traverse(node) {

    if (innerHTML != "") {
      if (className != ""){
        if (node.tagName === item && node.innerHTML.includes(innerHTML) && node.className == className) {
          items.push(node);
        }
      }else{
        if (node.tagName === item && node.innerHTML.includes(innerHTML)) {
          items.push(node);
        }
      }

    }
    else if (className != ""){
        if (node.tagName === item && node.className.includes(className)) {
          items.push(node);
        }
    }
    else {
      if (node.tagName === item) {
        items.push(node);
      }
    }



    if (node.shadowRoot) {
      traverse(node.shadowRoot);
    }

    node.childNodes.forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE || child instanceof ShadowRoot) {
        traverse(child);
      }
    });
  }

  traverse(root);
  return items;
}


setTimeout(() => {
  console.log('All resources including images, stylesheets, and scripts are loaded');
  const allInputs = findAllItemsIncludingShadowRoots(document, "INPUT", "", "");
  var allDivs = findAllItemsIncludingShadowRoots(document, "DIV", "", "now-input-field");

  allDivs.forEach(item => {
    item.style.height = "50px"
    item.style.border = "none"
            item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"
  })

  allDivs = findAllItemsIncludingShadowRoots(document, "DIV", "", "now-typeahead-field");
  allDivs.forEach(item => {
     item.style.height = "50px"
    item.style.border = "none"
        item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"
  })

  allDivs = findAllItemsIncludingShadowRoots(document, "BUTTON", "", "now-select-trigger");
  allDivs.forEach(item => {
     item.style.height = "50px"
    item.style.border = "none"
    item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"
  })


  const allButtons = findAllItemsIncludingShadowRoots(document, "BUTTON", "");
  const allbyclass = test(document, "SPAN", "now-select-trigger-label")

  console.log(allButtons)

  setTimeout(() => {
    const div = findAllItemsIncludingShadowRoots(document, "DIV", innerHTML="Create request")
    console.log(div)
      div[0].click()
  }, 500)


},2500)


function test(root = document, item = "INPUT", className = "") {
  const items = [];

  function traverse(node) {


    if (node.outerText === "Save") {
      items.push(node);
    }

    if (node.shadowRoot) {
      traverse(node.shadowRoot);
    }

    node.childNodes.forEach(child => {
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


function changeView() {
    var allDivs = findAllItemsIncludingShadowRoots(document, "DIV", "", "now-input-field");

  allDivs.forEach(item => {
    if (item.children[1].required == true) {
          item.style.background = "rgba(255,0,0,0.3)"
    }
    else {
      item.style.background = "rgba(255,255,250,0.3)"
    }

    item.style.height = "50px"
    item.style.border = "none"
    item.style.borderRadius = "10px"
    item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"

  })

  allDivs = findAllItemsIncludingShadowRoots(document, "DIV", "", "now-typeahead-field");
  allDivs.forEach(item => {
    if (item.children[1].required == true) {
      item.style.background = "rgba(255,0,0,0.3)"
    }
    else {
      item.style.background = "rgba(255,255,250,0.3)"
    }
    item.style.height = "50px"
    item.style.border = "none"
    item.style.borderRadius = "10px"
    item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"

  })

  allDivs = findAllItemsIncludingShadowRoots(document, "BUTTON", "", "now-select-trigger");
  allDivs.forEach(item => {
    if (item.children[1].required == true) {
      item.style.background = "rgba(255,0,0,0.3)"
    }
    else {
      item.style.background = "rgba(255,255,250,0.3)"
    }
    item.style.height = "50px"
    item.style.border = "none"
    item.style.borderRadius = "10px"
    item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"
  })


    

    allDivs = findAllItemsIncludingShadowRoots(document, "DIV", "", "now-textarea-container");
  allDivs.forEach(item => {
     item.style.height = "200px"
    item.style.border = "none"
    item.style.borderRadius = "20px"
    item.style.overflow = "hidden"
    item.style.boxShadow = "0px 5px 5px rgba(0,0,0,0.3)"
  })
  
  
  



  console.log(allDivs)
}




const observer = new MutationObserver(() => {
  changeView(); // re-apply styles when content changes
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

