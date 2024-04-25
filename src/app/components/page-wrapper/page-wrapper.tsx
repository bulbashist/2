import { Card, Container } from "@mui/material";
import HeaderComponent from "../header";

export const PageWrapperComponent = ({ children }: any) => {
  return (
    <>
      <HeaderComponent />
      <Container>
        <Card>{children}</Card>
      </Container>
    </>
  );
};
