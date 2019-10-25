const apiKey = "PxESF7BrEfIDz8o7HIuQljo1EzfYozNGFOYSXk9g";

function watchForm(){
  $("form").submit(event => {
    event.preventDefault();
    const stateNames = $("#state-names").val().split(" ");
    console.log(typeof(stateNames[1]));
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
    console.log(webAddress);
  fetch(options + "https://developer.nps.gov/api/v1/parks?stateCode=" + params)
    .then(response => {
      if (response.ok){
        return response.json();
      } throw new Error(response.statusText);
      })
    .then(responseJson => displayResults(responseJson, username))
    .catch(err => {
      alert("Fuck, this sucks, dude.")
    })
    }


watchForm();