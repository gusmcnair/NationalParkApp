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
    if (responseJson.data[i].latLong != "") {
      $(".national-park-list").append(`<p class="steven"></p>`)
      //getParkAddress(responseJson.data[i].latLong);
    };
  }
}

/*
function getParkAddress(latlong){
  let latlongformat = "latlng=" + latlong.replace(/lat:|\slong:/g, "")
  console.log("https://maps.googleapis.com/maps/api/geocode/json?" + latlongformat + "&key=AIzaSyAbOJBsHu8NRJnwsjAK_UONAWnDd2eh6LA")
  fetch("https://maps.googleapis.com/maps/api/geocode/json?" + latlongformat + "&key=AIzaSyAbOJBsHu8NRJnwsjAK_UONAWnDd2eh6LA")
  .then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(responseJson => formatAddress(responseJson))
  .catch(err => {
    alert("Unfortunately, this didn't work.")
  })
};

function formatAddress(responseJson) {
  console.log(responseJson.results[0].formatted_address)
  console.log($(".steven").length);
  //let parkAddress = `Address: ${responseJson.results[0].formatted_address}`
  //for (i = 0; i < $(".steven").length; i ++){
   // $(".steven").append(`<p>${parkAddress}</p>`);
  }

*/

watchForm();
