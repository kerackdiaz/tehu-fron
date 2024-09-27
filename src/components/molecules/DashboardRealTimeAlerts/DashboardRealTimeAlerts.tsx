import React, { useState, useRef, useEffect, ForwardRefRenderFunction } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Autocomplete,
  DirectionsRenderer,
  Libraries,
  Marker,
} from "@react-google-maps/api";
import SpeedometerChart from "../../atoms/Temperature/SpeedometerChart";

import { WebSocketSubject } from 'rxjs/webSocket';



const center = { lat: 4.72, lng: -74.069 };
interface DashboardRealTimeAlertsProps {
  saveOriginDestination: (data: any) => void;
  origin: string | undefined;
  destination: string | undefined;
  deviceName: string | undefined;
}

const DashboardRealTimeAlerts: ForwardRefRenderFunction<unknown, DashboardRealTimeAlertsProps> = (
  { saveOriginDestination, origin: initialOrigin, destination: initialDestination, deviceName },
) => {
  const [currentPosition, setCurrentPosition] = useState<google.maps.LatLngLiteral | null>(null);
  const [messageHistory, setMessageHistory] = useState<string[]>([]);
  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("0");
  const [duration, setDuration] = useState<string>("0");
  const libraries: Libraries = ["places"];
  const libRef = useRef<Libraries>(libraries);
  const [map, setMap] = useState<google.maps.Map | null>(null);


  useEffect(() => {
    console.log(map);
    const socketSubject = new WebSocketSubject('ws://54.160.239.175:5000');
    const subscription = socketSubject.subscribe(
      (message: any) => {
        setMessageHistory(message);
        setCurrentPosition({ lat: parseFloat(message.lat), lng: parseFloat(message.lon) });
      },
      (error) => {
        console.error('Error en la conexión WebSocket:', error);
      }
    );
    return () => {
      subscription.unsubscribe();
    };
    console.log("messageHistory", messageHistory);

  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUA9WH9ov5xK4kQPz9n-kp8ZnDXTF5QeQ",
    //googleMapsApiKey: "AIzaSyANtfHCVWk7L42c8temR64BOFiKWjA9Nvg",
    libraries: libRef.current,
  });

  useEffect(() => {
    if (!isLoaded) return;
    if (initialOrigin && initialDestination) {
      calculateRoute();
    }
  }, [initialOrigin, initialDestination, isLoaded]);

  async function calculateRoute() {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      return;
    }
    const originLatLng = await getLatLngFromAddress(originRef.current.value);
    const destinationLatLng = await getLatLngFromAddress(destinationRef.current.value);
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originLatLng,
      destination: destinationLatLng,
      travelMode: google.maps.TravelMode.DRIVING,
    });

    if (results && results.routes && results.routes[0].legs) {
      setDirectionsResponse(results);
      setDistance(results.routes[0].legs[0].distance?.text ?? "");
      setDuration(results.routes[0].legs[0].duration?.text ?? "");
      saveOriginDestination({ origin: originRef.current.value, destination: destinationRef.current.value });
    }
  }

  async function getLatLngFromAddress(address: string): Promise<{ lat: number; lng: number }> {
    const geocoder = new google.maps.Geocoder();
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results?.[0]) {
          const latLng = results[0].geometry.location;
          resolve({ lat: latLng.lat(), lng: latLng.lng() });
        } else {
          reject(`Error al obtener coordenadas para la dirección: ${address}`);
        }
      });
    });
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    if (originRef.current) originRef.current.value = "";
    if (destinationRef.current) destinationRef.current.value = "";
  }

  

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="w-full md:max-w-[45%]">
        <SpeedometerChart messageHistory={messageHistory} deviceName={deviceName} />
        
      </div>

      <div className="w-full md:max-w-[50%]">
        <div className="flex gap-10 my-2 text-sm">
          <p>Distancia: {distance}</p>
          <p>Duración: {duration}</p>
        </div>

        {isLoaded && (
          <div className="flex flex-col items-center h-[50vh] w-full ">
            <div className="h-full w-full">
              <GoogleMap
                center={center}
                zoom={10}
                mapContainerStyle={{ width: "100%", height: "100%", borderRadius: "1rem" }}
                options={{
                  streetViewControl: false,
                  mapTypeControl: false,
                }}
                onLoad={(map) => setMap(map)}
              >
                {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                {currentPosition && <Marker position={currentPosition} />}
              </GoogleMap>
            </div>

            <div className="absolute left-0 top-[-14rem] flex flex-col gap-4">
              <div className="flex gap-4">
                <Autocomplete options={{ componentRestrictions: { country: "co" } }}>
                  <input
                    type="text"
                    placeholder="Origen"
                    ref={originRef}
                    defaultValue={initialOrigin}
                    disabled
                    className="border-none bg-transparent p-0 placeholder-transparent"
                  />
                </Autocomplete>
                <Autocomplete options={{ componentRestrictions: { country: "co" } }}>
                  <input
                    type="text"
                    placeholder="Destino"
                    ref={destinationRef}
                    defaultValue={initialDestination}
                    disabled
                    className="border-none bg-transparent p-0 placeholder-transparent"
                  />
                </Autocomplete>
              </div>

              {/* <div className="flex gap-16 text-[1rem] items-center justify-start">
                <p className="m-0">
                  <span className="font-medium">Distancia:</span> {distance}
                </p>
                <p className="m-0">
                  <span className="font-medium">Duración:</span> {duration}
                </p>
              </div> */}
          
              <div className="flex gap-4">
                <button className="text-primary text-2xl" type="button" onClick={calculateRoute}>
                  Calcular Ruta
                </button>
                <IconButton
                  className="btn__blue"
                  aria-label="Clear route"
                  icon={<FaTimes />}
                  onClick={clearRoute}
                />
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(DashboardRealTimeAlerts);
