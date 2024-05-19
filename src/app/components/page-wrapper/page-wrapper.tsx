import { Card, Container } from "@mui/material";
import HeaderComponent from "../header";

export const PageWrapperComponent = ({ children }: any) => {
  return (
    <>
      <HeaderComponent />
      <Container maxWidth="xl">
        <Card>{children}</Card>
      </Container>
    </>
  );
};
