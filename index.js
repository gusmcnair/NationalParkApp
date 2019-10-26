const apiKey = "PxESF7BrEfIDz8o7HIuQljo1EzfYozNGFOYSXk9g";
let maxResults= 10;
//let counter = -1;

function watchForm() {
  $("form").submit(event => {
    event.preventDefault();
    const stateNames = $("#state-names").val().split(" ");
    console.log($("#max-results").val())
    let maxResults = $("#max-results").val()
    if (maxResults === ""){maxResults = 10}
    getParks(stateNames, maxResults);
    $("#state-names").val("");
    $("#max-results").val("");
  });
}


function getParks(stateNames, maxResults) {
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey
    })
  };
  let stateString = "";
  for (i = 0; i < stateNames.length; i++) {
    if (i === (stateNames.length - 1)) {
      stateString += stateNames[i];
    } else {
      stateString += stateNames[i];
      stateString += ",";
    }
  };
  let params = encodeURIComponent(stateString);
  console.log("https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?stateCode=" + params + "&limit=" + maxResults, options)
  fetch("https://cors-anywhere.herokuapp.com/https://developer.nps.gov/api/v1/parks?stateCode=" + params + "&limit=" + maxResults, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      alert("Unfortunately, this didn't work.")
    });
}

function displayResults(responseJson) {
  console.log(responseJson);
  $(".national-park-list").empty();
  for (i = 0; i < responseJson.data.length; i++) {
    $(".national-park-list").append(`<p class="nat-park-name">${responseJson.data[i].name}</p><p>${responseJson.data[i].description}</p><p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].url}</a></p><hr>`);
    };
  }



watchForm();
