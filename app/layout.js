
import "react-toastify/dist/ReactToastify.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "leaflet/dist/leaflet.css";
import "./scss/app.scss";

export const metadata = {
  title: 'EMS Next Js',
  description: 'EMS',
}

import ThemeProvider from "./theme-provider"
export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className="font-inter  custom-tippy ems-app">
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
