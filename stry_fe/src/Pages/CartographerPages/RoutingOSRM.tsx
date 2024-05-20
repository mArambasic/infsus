import { useEffect } from "react";
import L, { Draggable, Routing } from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";



//L.Marker.prototype.options.interactive = false;
//L.Marker.prototype.options.draggable = false;
L.Marker.prototype.options.icon = L.divIcon({
  iconSize: undefined, // [0, 0] ce dat tocku
})

let coords = window.sessionStorage.getItem("PathCord");

if(coords!=null){

  let latlngField = coords.split(" ");

  const markerLat  = Number(latlngField[0]);
  const markerLon  = Number(latlngField[1]);

}


export default function RoutingOSRM() {
  const map = useMap();
  


  useEffect(() => {
    if (!map) return;

    let coords = window.sessionStorage.getItem("PathCord");
    if(coords == null) return ;

    let latlngField = coords.split(" ");

    const markerLat  = Number(latlngField[0]);
    const markerLon  = Number(latlngField[1]);

    console.log(markerLat, markerLon);

    L.marker([markerLat, markerLon], {
      draggable: false,
      icon :  L.icon({  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",})
    }).addTo(map);

    L.marker([45.81, 15.98], {
      draggable: false,
      icon :  L.icon({ iconUrl: "marker-user-icon.png",})
    }).addTo(map);

    //dodati svoj ROUTER
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(45.81, 15.98), L.latLng(markerLat, markerLon)],
      //router: L.Routing.osrmv1({  serviceUrl: 'http://my-osrm/route/v1'}), DODATI SERVER
      routeWhileDragging: false,
      addWaypoints : false,
      showAlternatives: false,
      lineOptions: {
        extendToWaypoints : false,
        missingRouteTolerance:0,
        styles: [
          {
            color: "green",
            opacity: 1,
            weight: 5
          }
        ] 
      },
    

    }).addTo(map);
    let wps = routingControl.getWaypoints();
    console.log(wps);
    if(map)
      return () => {map.removeControl(routingControl)}

  
  }, [map]);

  return null;
}
