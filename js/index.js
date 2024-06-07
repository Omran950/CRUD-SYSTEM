var allData;
var tbody = document.getElementById("tbody");
var inputName = document.getElementById("inputName");
var inputPosition = document.getElementById("inputPosition");
var inputOffice = document.getElementById("inputOffice");
var inputAge = document.getElementById("inputAge");
var inputDate = document.getElementById("inputDate");
var addBtn = document.getElementById("addBtn");
var clearBtn = document.getElementById("clearBtn");
var searchBar = document.getElementById("searchBar");
var selectMenu = document.getElementById("selectMenu");
var searchValue = "name";
var sortCheck = false;
var updateIndexAllData;
var updateIndexSearch;
var searchData = [];
if (localStorage.getItem("allData")) {
  allData = JSON.parse(localStorage.getItem("allData"));
} else {
  allData = [];
}
displayAllData();

// =============================Display Functions============================================
// ===========================================================================================
function displayAllData() {
  var trs = `<thead>
    <tr>
    <th>NO.</th>
    <th id="name" onclick="sortTable('name')"><div class="inner-head"><p>Name</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="position" onclick="sortTable('position')"><div class="inner-head"><p>Position</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="office" onclick="sortTable('office')"><div class="inner-head"><p>Office</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="age" onclick="sortTable('age')"><div class="inner-head"><p>Age</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="date" onclick="sortTable('date')"><div class="inner-head"><p>Start Date</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="update">Update</th>
    <th id="delete">Delete</th>
  </tr>
</thead>`;
  for (var i = 0; i < allData.length; i++) {
    trs += `<tr>
    <td>${i}</td>
    <td>${allData[i].name}</td>
    <td>${allData[i].position}</td>
    <td>${allData[i].office}</td>
    <td>${allData[i].age}</td>
    <td>${allData[i].startDate}</td>
    <td><button class="update" onclick="updateEmployeeData(${i})">Update</button></td>
    <td><button class="delete" onclick="deleteRowAll(${i})">Delete</button></td>
  </tr>`;
  }
  tbody.innerHTML = trs;
}

function displaySearchData() {
  var trs = `<thead>
  <tr>
    <th>NO.</th>
    <th id="name" onclick="sortTableAfterSearch('name')"><div class="inner-head"><p>Name</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="position" onclick="sortTableAfterSearch('position')"><div class="inner-head"><p>Position</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="office" onclick="sortTableAfterSearch('office')"><div class="inner-head"><p>Office</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="age" onclick="sortTableAfterSearch('age')"><div class="inner-head"><p>Age</p><i class="fa-solid fa-sort"></i></div></th>  
    <th id="date" onclick="sortTableAfterSearch('date')"><div class="inner-head"><p>Start Date</p><i class="fa-solid fa-sort"></i></div></th>
    <th id="update">Update</th>
    <th id="delete">Delete</th>
  </tr>
</thead>`;
  for (var i = 0; i < searchData.length; i++) {
    trs += `
  <tr>
  <td>${i}</td>
  <td>${searchData[i].name}</td>
  <td>${searchData[i].position}</td>
  <td>${searchData[i].office}</td>
  <td>${searchData[i].age}</td>
  <td>${searchData[i].startDate}</td>
  <td><button class="update" onclick="updateEmployeeDataFromSearch(${i})">Update</button></td>
  <td><button class="delete" onclick="deleteRowSearch(${i})">Delete</button></td>
  </tr>`;
  }
  tbody.innerHTML = trs;
}

// =============================Delete Row Functions============================================
// =============================================================================================

function deleteRowAll(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "update",
      cancelButton: "delete",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        allData.splice(index, 1);
        localStorage.setItem("allData", JSON.stringify(allData));
        displayAllData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
        });
      }
    });
}

function deleteRowSearch(index) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "update",
      cancelButton: "delete",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        allData.filter(function (value, indx) {
          if (value.name == searchData[index].name) {
            allData.splice(indx, 1);
            localStorage.setItem("allData", JSON.stringify(allData));
            return;
          }
        });
        searchData.splice(index, 1);
        displaySearchData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          icon: "error",
        });
      }
    });
}

// =============================Search Functions==============================================
// ===========================================================================================

function searchAllData(searchValue) {
  searchBar.classList.remove("warning");
  var searchBarValue = searchBar.value;
  if (searchBarValue.trim().length == 0) {
    displayAllData();
  } else {
    searchData = allData.filter((value) => {
      if (
        value[searchValue]
          .trim()
          .toLocaleLowerCase()
          .includes(searchBarValue.trim().toLowerCase())
      ) {
        return value;
      }
    });
    displaySearchData();
  }
}

function searchByAge() {
  var searchAge = Number(searchBar.value);
  if (isNaN(searchAge) || !searchAge) {
    searchBar.classList.add("warning");
    displayAllData();
  } else {
    searchBar.classList.remove("warning");
    searchData = allData.filter((value) => {
      if (value.age == searchAge) {
        return value;
      }
    });
    displaySearchData();
  }
}

// =============================Search Events Functions============================================
// ================================================================================================

selectMenu.addEventListener("change", function (e) {
  searchValue = e.target.value;
});

searchBar.addEventListener("keyup", function (e) {
  if (searchBar.value.trim() == 0) {
    searchData = [];
    searchBar.classList.remove("warning");
  }
  switch (searchValue) {
    case "age":
      searchByAge();
      break;

    default:
      searchAllData(searchValue);
      break;
  }
});

// =============================Sort Functions===============================================
// ===========================================================================================

// Sort by name - age - office - position
function sortArrayAccend(arrayData, val) {
  arrayData.sort((a, b) => {
    if (a[val] < b[val]) {
      return -1;
    }
    if (a[val] > b[val]) {
      return 1;
    }
    return 0;
  });
}

function sortArrayDecend(arrayData, val) {
  arrayData.sort((a, b) => {
    if (a[val] < b[val]) {
      return 1;
    }
    if (a[val] > b[val]) {
      return -1;
    }
    return 0;
  });
}

// sort by date
function sortByDateAccend(arrayData) {
  arrayData.sort((a, b) => {
    const [dayA, monthA, yearA] = a.startDate.split("/").map(Number);
    const [dayB, monthB, yearB] = b.startDate.split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });
}

function sortByDateDecend(arrayData) {
  arrayData.sort((a, b) => {
    const [dayA, monthA, yearA] = a.startDate.split("/").map(Number);
    const [dayB, monthB, yearB] = b.startDate.split("/").map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateB - dateA;
  });
}

// sort while all data in table
function sortTable(val) {
  if (!sortCheck) {
    if (val == "date") {
      sortByDateAccend(allData);
    } else {
      sortArrayAccend(allData, val);
    }
    sortCheck = true;
  } else {
    if (val == "date") {
      sortByDateDecend(allData);
    } else {
      sortArrayDecend(allData, val);
    }
    sortCheck = false;
  }
  displayAllData();
}

// sort while only search data in table
function sortTableAfterSearch(val) {
  if (!sortCheck) {
    if (val == "date") {
      sortByDateAccend(searchData);
    } else {
      sortArrayAccend(searchData, val);
    }
    sortCheck = true;
  } else {
    if (val == "date") {
      sortByDateDecend(searchData);
    } else {
      sortArrayDecend(searchData, val);
    }
    sortCheck = false;
  }
  displaySearchData();
}

// =============================Clear Function===============================================
// ===========================================================================================

function clearInputsBtn() {
  if (
    inputName.value.trim().length == 0 &&
    inputPosition.value.trim().length == 0 &&
    inputAge.value.trim().length == 0 &&
    inputOffice.value.trim().length == 0 &&
    inputDate.value.trim().length == 0
  ) {
    swal("", "All fields are already empty", "");
  } else {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "update",
        cancelButton: "delete",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "All input data will be erased",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Clear it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Cleared!",
            text: "All fields cleared",
            icon: "success",
          });
          clearInputs();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            icon: "error",
          });
        }
      });
  }
}

function clearInputs() {
  inputName.value = "";
  inputPosition.value = "";
  inputAge.value = "";
  inputOffice.value = "";
  inputDate.value = "";
}

// =============================Validation=================================================
// ===========================================================================================

function dateValidation() {
  var dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
  return dateRegex.test(inputDate.value.trim());
}

function textValidation(inputValue) {
  var textRegex = /^[a-zA-Z\s]{4,}$/;
  return textRegex.test(inputValue);
}

function ageValidation() {
  var ageRegex = /^(1[5-9]|[2-8][0-9]|90)$/;
  return ageRegex.test(inputAge.value);
}

inputName.addEventListener("keyup", function () {
  if (!textValidation(inputName.value)) {
    inputName.classList.add("is-invalid");
  } else {
    inputName.classList.remove("is-invalid");
  }
});

inputPosition.addEventListener("keyup", function () {
  if (!textValidation(inputPosition.value)) {
    inputPosition.classList.add("is-invalid");
  } else {
    inputPosition.classList.remove("is-invalid");
  }
});

inputOffice.addEventListener("keyup", function () {
  if (!textValidation(inputOffice.value)) {
    inputOffice.classList.add("is-invalid");
  } else {
    inputOffice.classList.remove("is-invalid");
  }
});

inputAge.addEventListener("keyup", function () {
  if (!ageValidation()) {
    inputAge.classList.add("is-invalid");
  } else {
    inputAge.classList.remove("is-invalid");
  }
});

inputDate.addEventListener("keyup", function () {
  if (!dateValidation()) {
    inputDate.classList.add("is-invalid");
  } else {
    inputDate.classList.remove("is-invalid");
  }
});

// =============================Add Function=================================================
// ===========================================================================================
function findName(findNameValue) {
  var namecheck = false;
  for (var i = 0; i < allData.length; i++) {
    if (
      allData[i].name.trim().toLocaleLowerCase() ==
      findNameValue.trim().toLocaleLowerCase()
    ) {
      namecheck = true;
      break;
    }
  }
  return namecheck;
}

function ifAddBtn(rowData) {
  if (findName(rowData.name)) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Employee already exists",
    });
  } else {
    allData.push(rowData);
    localStorage.setItem("allData", JSON.stringify(allData));
    swal("", "Employee data has been added successfully", "success");
    clearInputs();
  }
}

function ifUpdateBtn(rowData) {
  if (searchData.length == 0) {
    allData.splice(updateIndexAllData, 1, rowData);
  } else {
    allData.filter(function (value, indx) {
      if (value.name == searchData[updateIndexSearch].name) {
        allData.splice(indx, 1, rowData);
        return;
      }
    });
    searchData.splice(updateIndexSearch, 1, rowData);
  }
  localStorage.setItem("allData", JSON.stringify(allData));
  swal("", "Employee data has been updated successfully", "success");
  addBtn.innerHTML = "Add";
  clearInputs();
}

function addData() {
  if (
    inputName.value.trim().length == 0 &&
    inputPosition.value.trim().length == 0 &&
    inputAge.value.trim().length == 0 &&
    inputOffice.value.trim().length == 0 &&
    inputDate.value.trim().length == 0
  ) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please fill out all data entries",
    });
    return;
  }
  if (
    dateValidation() &&
    textValidation(inputName.value) &&
    textValidation(inputOffice.value) &&
    textValidation(inputPosition.value) &&
    ageValidation()
  ) {
  }
  if (!textValidation(inputName.value)) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please enter a valid employee name of more than 4 characters",
    });
    return;
  }
  if (!textValidation(inputPosition.value)) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please enter a valid position name of more than 4 characters",
    });
    return;
  }
  if (!textValidation(inputOffice.value)) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please enter a valid office name of more than 4 characters",
    });
    return;
  }
  if (!ageValidation()) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please enter a valid age between 15 to 90",
    });
    return;
  }
  if (!dateValidation()) {
    Swal.fire({
      icon: "error",
      title: "Failed",
      text: "Please enter a valid date on this format xx/xx/xxxx",
    });
    return;
  }
  var rowData = {
    age: inputAge.value.trim().toLocaleLowerCase(),
    name: inputName.value.trim().toLocaleLowerCase(),
    position: inputPosition.value.trim().toLocaleLowerCase(),
    office: inputOffice.value.trim().toLocaleLowerCase(),
    startDate: inputDate.value.trim().toLocaleLowerCase(),
  };
  if (addBtn.innerHTML == "Add") {
    ifAddBtn(rowData);
  } else {
    ifUpdateBtn(rowData);
  }
  if (searchData.length == 0) {
    displayAllData();
  } else {
    displaySearchData();
  }
}

// =============================Update Function=================================================
// =============================================================================================

function updateEmployeeData(indx) {
  addBtn.innerHTML = "Update";
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateIndexAllData = indx;
  inputAge.value = allData[indx].age;
  inputName.value = allData[indx].name;
  inputPosition.value = allData[indx].position;
  inputOffice.value = allData[indx].office;
  inputDate.value = allData[indx].startDate;
}

function updateEmployeeDataFromSearch(indx) {
  addBtn.innerHTML = "Update";
  window.scrollTo({ top: 0, behavior: "smooth" });
  updateIndexSearch = indx;
  inputAge.value = searchData[indx].age;
  inputName.value = searchData[indx].name;
  inputPosition.value = searchData[indx].position;
  inputOffice.value = searchData[indx].office;
  inputDate.value = searchData[indx].startDate;
}
