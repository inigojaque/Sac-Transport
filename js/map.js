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
        document.getElementById("nearest_lightrail").addEventListener("click", onChangeHandler);
    }

    function calculateAndDisplayRoute(directionsService, directionsRenderer) {
        directionsService.route({
                origin: {
                    query: document.getElementById("user_address").value
                },
                destination: {
                    query: "6000 J St, Sacramento, CA 95819",
                },
                travelMode: google.maps.TravelMode[document.getElementById('mode').value],
            },
            (response, status) => {
                if (status === "OK") {
                    directionsRenderer.setDirections(response);
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }