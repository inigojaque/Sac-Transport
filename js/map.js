var runningLookup = false;
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function queryGoogle() {



  if (runningLookup) {
    return;
  }

  runningLookup=true;
    document.getElementById("returnStatus").innerHTML = "Loading";
    document.getElementById("returnStatus").style.color = "orange";
    //wait 3 seconds
    await sleep(2500);
    //press go btn
    document.getElementById("Mode").click();

    runningLookup=false;
    document.getElementById("returnStatus").innerHTML = "";
  }

    function initMap() {
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 15,
            center: {
                lat: 38.563938,
                lng: -121.425720
            },
        });
        directionsRenderer.setMap(map);
        directionsRenderer.setPanel(document.getElementById("right-panel"));

        const onChangeHandler = function() {
            calculateAndDisplayRoute(directionsService, directionsRenderer);
        };
        document.getElementById("Mode").addEventListener("click", onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService.route({
                origin: {
                    query: document.getElementById("user_address").value
                },
                destination: {
                    query: "6000 J St, Sacramento, CA 95819",
                },
                travelMode: google.maps.TravelMode[document.getElementById('Mode').value],
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                  var found = status.includes("NOT_FOUND")
                  if (found==true) {
                      status="Address not found";
                      document.getElementById("returnStatus").innerHTML = status;
                      document.getElementById("returnStatus").style.color = "red";
                  } else {
                    document.getElementById("returnStatus").innerHTML = "";
                  }


                }
            }
        );
    }
