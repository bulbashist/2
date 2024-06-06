import Typography from "@mui/material/Typography";
import PageWrapperComponent from "app/components/page-wrapper";
import { officesURI } from "app/constants/urls";
import { Office } from "app/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export const OfficesPage = () => {
  const [offices, setOffices] = useState<Office[]>([]);
  const [info, setInfo] = useState<string>("");

  useEffect(() => {
    axios
      .get<Office[]>(officesURI)
      .then((res) => setOffices(res.data))
      .catch(console.log);
  }, []);

  return (
    <PageWrapperComponent>
      <Typography>{info}</Typography>
      <Map
        style={{ height: "80vh" }}
        mapboxAccessToken={process.env.REACT_APP_MAP_TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        initialViewState={{
          longitude: 27.55,
          latitude: 53.9,
          zoom: 11,
        }}
      >
        {offices.map((office) => (
          <Marker
            key={office.id}
            longitude={office.lng}
            latitude={office.lat}
            onClick={() => setInfo(office.location)}
          />
        ))}
      </Map>
    </PageWrapperComponent>
  );
};
