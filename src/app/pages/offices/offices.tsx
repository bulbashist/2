import { Box, Stack } from "@mui/material";
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
    axios.get<Office[]>(officesURI).then((res) => setOffices(res.data));
  }, []);

  return (
    <PageWrapperComponent>
      <Typography>{info}</Typography>
      <Map
        style={{ height: "80vh" }}
        mapboxAccessToken="pk.eyJ1IjoiYnVsYmFzaGlzdCIsImEiOiJjbHcwZnI3MmMwMGdsMmtvY3c2b3N6cGM0In0.hvpXPIAfxQYXN0VV0-I1oQ"
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
