import RootMenu from "./componentes/RootMenu";
import "./globals.css";

export const metadata = {
  title: "Cooperadora ISP 20 | San Justo",
  description: "Sistema de gestión de cooperadora",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="favicon.ico" />
      </head>
      <body>
        <RootMenu />
        <div className="layout-wrapper">{children}</div>
      </body>
    </html>
  );
}
