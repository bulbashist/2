type Path = {
  title: string;
  url: string;
};

export const paths: Path[] = [];

export const protectedPaths: Path[] = [
  {
    title: "header_nav_admin",
    url: "/admin",
  },
  {
    title: "header_nav_orders",
    url: "/orders",
  },
];
