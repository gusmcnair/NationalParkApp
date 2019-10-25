const apiKey = "PxESF7BrEfIDz8o7HIuQljo1EzfYozNGFOYSXk9g";

function watchForm(){
  $("form").submit(event => {
    event.preventDefault();
    const stateNames = $("#state-names").val().split(" ");
    getParks(stateNames);
    $("#state-names").val("");
  });
}


function getParks(stateNames){
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };
    let params = "";
    for(i = 0; i < stateNames.length; i ++){
      if (i === (stateNames.length - 1)){
        params += stateNames[i];
      } else {
      params += stateNames[i];
      params += ",";
    }};
    let params2 = encodeURIComponent(params);
  console.log("https://developer.nps.gov/api/v1/parks?stateCode=" + params, options);
  fetch("https://developer.nps.gov/api/v1/parks?stateCode=" + params2, options)
     .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => console.log(responseJson))
        .catch(err => {
      alert("Unfortunately, this didn't work.")
    });
}

function displayResults(responseJson){
  console.log(responseJson);
}


watchForm();
