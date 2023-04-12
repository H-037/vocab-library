var table = document.getElementById("table");

let myLibrary = [];

var addbtn = document.getElementById("adding");
addbtn.addEventListener("click", function(e) {
  e.preventDefault();
  add2library();
  insert();
});

var addimg = document.getElementById("addimg");
addimg.addEventListener("click", function(e) {
  e.preventDefault();
  add2library();
  insert();
});

function insert(){
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  for(var j = 0; j<myLibrary.length; j++) {
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = myLibrary[j].item1;
    cell2.innerHTML = myLibrary[j].item2;
  }
}

function object(item1, item2){
  this.item1 = item1
  this.item2 = item2
}

function add2library() {
  let Oitem1 = document.getElementsByClassName("cell1");
  let Oitem2 = document.getElementsByClassName("cell2");

  let pobj = new object(Oitem1[0].value , Oitem2[0].value);
  myLibrary.push(pobj);
}

const deletebtn = document.getElementById("delete");
deletebtn.addEventListener("click", deletelastrow);


//delete last row
function deletelastrow() {
  table.deleteRow(-1);
  myLibrary.pop();
}


//print out table
function downloadPDFWithjsPDF() {
  var doc = new jspdf.jsPDF('p', 'pt', 'a4');

  doc.html(document.querySelector('#table'), {
    callback: function (doc) {
      doc.save('MLB World Series Winners.pdf');
    },
    margin: [60, 60, 60, 60],
    x: 32,
    y: 32,
  });
}

document.querySelector('#browserPrint').addEventListener('click', downloadPDFWithjsPDF);



// Storage Button
const storageBtn = document.getElementById("clearTable");
storageBtn.addEventListener("click", function() {
  // Prompt user for key
  const key = prompt("Enter a key for the stored table:");
  
  // Store table in local storage using key
  localStorage.setItem(key, JSON.stringify(myLibrary));
  myLibrary = [];
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }
  
  // Add key to table list in sidebar
  const tableList = document.getElementById("tableList");
  const group =  document.createElement("div");
  const reference = document.createElement("div");
  const trash = document.createElement("img");
  group.classList.add("group");
  reference.classList.add("reference");
  trash.setAttribute("id","trash");
  reference.textContent = key;
  trash.src = "/img/trash-can-outline.svg"
  reference.addEventListener("click", function() {
    // Retrieve table from local storage using key and update table in container
    const storedTable = JSON.parse(localStorage.getItem(key));
    myLibrary = storedTable;
    insert();
  });
  group.appendChild(reference);
  group.appendChild(trash);
  tableList.appendChild(group);
  
  // Add event listener to trash element
  trash.addEventListener("click", function() {
    localStorage.removeItem(key);
    group.remove();
  });
});

// Get reference to the table list in the sidebar
const tableList = document.getElementById("tableList");

// Add event listener for the "load" event
window.addEventListener("load", function() {
  // Get the list of saved keys from local storage
  const keys = Object.keys(localStorage);

  // Loop through the keys and create a new list item for each key
  keys.forEach(function(key) {
    const group =  document.createElement("div");
    const reference = document.createElement("div");
    const trash = document.createElement("img");
    group.classList.add("group");
    reference.classList.add("reference");
    trash.setAttribute("id","trash");
    reference.textContent = key;
    trash.src = "/img/trash-can-outline.svg"
    group.addEventListener("click", function() {
      // Retrieve the saved table from local storage using the key
      const storedTable = JSON.parse(localStorage.getItem(key));
      myLibrary = storedTable;
      insert();
    });
    group.appendChild(reference);
    group.appendChild(trash);
    tableList.appendChild(group);

    // Add event listener to trash element
    trash.addEventListener("click", function() {
      localStorage.removeItem(key);
      group.remove();
    });
  });
});



// creating testing evironment
const tcont = document.getElementsByClassName("tcontainer")[0];
const opentesting = document.getElementById("testing");
const testdiv = document.createElement("div");
const display = document.createElement("div");
opentesting.addEventListener("click", opentestdiv);

function opentestdiv() {
  testdiv.classList.add("testing");
  tcont.appendChild(testdiv);

  display.classList.add("display");
  testdiv.appendChild(display);
  
  const closetestdiv = document.createElement("img");
  closetestdiv.setAttribute("id", "closetestdiv");
  closetestdiv.src = "/img/close.svg"
  testdiv.appendChild(closetestdiv);
  closetestdiv.addEventListener("click", function() {
    clearInterval(startinterval);
    tcont.removeChild(testdiv);
    display.textContent = "";
  })
  test();
  const startinterval = setInterval(function(){test()},10000);
  startinterval;
}

function test() {
  const random = Math.floor(Math.random() * myLibrary.length);

  if(random % 2 === 0) {
    display.textContent = myLibrary[random].item1;
    setTimeout(function(){display.textContent += " = " + myLibrary[random].item2},3000);
  } else {
    display.textContent = myLibrary[random].item2;
    setTimeout(function(){display.textContent += " = " + myLibrary[random].item1},3000);
  }
}


// new Table 
const newtable = document.getElementById("newt");
newtable.addEventListener("click", function() {
  myLibrary = [];
  insert();
});