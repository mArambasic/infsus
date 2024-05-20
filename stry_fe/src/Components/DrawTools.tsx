
import L from "leaflet";
import {
	FeatureGroup,
} from "react-leaflet";

import { EditControl, } from "react-leaflet-draw";

export default function DrawTools(){


	let numEdited :number;
	let numCreated : number = 0;

		const _onEditStart = (e:any) => {
			console.log("_onEditStart", e);
		};


		

	const _onEdited = (e: any ) => {
		numEdited = 0;
		console.log("_onEdited");
		e.layers.eachLayer((layer :any )=> {
			numEdited += 1;
			console.log("New coordinates => ", layer._latlng);
			window.sessionStorage.setItem(`CoordsLat${numCreated}`, layer._latlng.lat);
			window.sessionStorage.setItem(`CoordsLng${numCreated}`, layer._latlng.lng);
		
		});

		console.log(`_onEdited: edited ${numEdited} layers`, e);
		console.log("Number =>", numEdited);
		//console.log("Geojson", layer.toGeoJSON());
		//console.log("CoordsOf edit =>", layer);
		//console.log(layer);


		// this._onChange();
	};

	const _onCreated = (e : any)=> {
		
		/*if(window.sessionStorage.getItem("ListSaved") == 'true')
		{
			window.sessionStorage.setItem("ListSaved", 'false');
		}*/


		let layer = e.layer;
			
		console.log("_onCreated: marker created", e);
		console.log("NUM", numCreated);
		console.log("Geojson", layer.toGeoJSON());
		console.log("Coords", layer._latlng);
		console.log("Number =>", numCreated);
		window.sessionStorage.setItem(`CoordsLat${numCreated}`, layer._latlng.lat);
		window.sessionStorage.setItem(`CoordsLng${numCreated}`, layer._latlng.lng);
		window.sessionStorage.setItem("Number =>", numCreated.toString());

		numCreated++;
	};

	const _onDeleted = (e: any ) => {//Alternativa _onDeleteStop
		let numDeleted = 0;
		e.layers.eachLayer((layer :any )=> {
			numDeleted += 1;
		});
		console.log(`onDeleted: removed ${numDeleted} layers`, e);
		console.log("Number deleted = > ", numDeleted);
	};




    //Sve funkcije EditControl-a osim _onDeleted, _onCreated i _onEdited
/*
	const editDrawingTools=()=>{
		console.log("Edit map");
	}
	const _onMounted = (drawControl: any) => {
		console.log("_onMounted", drawControl);
	};

	const _onEditStart = (e:any) => {
		console.log("_onEditStart", e);
	};

	const _onEditStop = (e:any) => {
		console.log("_onEditStop", e);
	};

	const _onDeleteStart = (e:any) => {
		console.log("_onDeleteStart", e);
	};

	const _onDeleteStop = (e:any) => {
		console.log("_onDeleteStop", e);
	};

	const _onDrawStart = (e:any) => {
		console.log("_onDrawStart", e);
	};*/

	/*onEdited	function	hook to leaflet-draw's draw:edited event
onCreated	function	hook to leaflet-draw's draw:created event
onDeleted	function	hook to leaflet-draw's draw:deleted event
onMounted	function	hook to leaflet-draw's draw:mounted event
onEditStart	function	hook to leaflet-draw's draw:editstart event
onEditStop	function	hook to leaflet-draw's draw:editstop event
onDeleteStart	function	hook to leaflet-draw's draw:deletestart event
onDeleteStop	function	hook to leaflet-draw's draw:deletestop event
onDrawStart	function	hook to leaflet-draw's draw:drawstart event
onDrawStop	function	hook to leaflet-draw's draw:drawstop event
onDrawVertex	function	hook to leaflet-draw's draw:drawvertex event
onEditMove	function	hook to leaflet-draw's draw:editmove event
onEditResize	function	hook to leaflet-draw's draw:editresize event
onEditVertex	function	hook to leaflet-draw's draw:editvertex event*/


	return (
		<>
		<FeatureGroup
        >
			
			<EditControl
				position="bottomright"
				onEdited={_onEdited}
				onCreated={ _onCreated}
				onDeleted={_onDeleted}
				onEditStart={_onEditStart}
				draw={{
					marker : {
						icon: L.divIcon({
							iconUrl: 'leaf-green.png',
							iconSize: [20, 20], // [0, 0] ce dat tocku
						  })
					},
					polyline:false,	
					rectangle: false,
					circlemarker: false,
					circle: false,
					polygon: false,
				}}

			/>

		</FeatureGroup>
		</>

	);
};

