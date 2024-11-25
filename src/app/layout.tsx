
"use client";
// import { Provider } from "react-redux";
// import store from "./store"; // Path to your store

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Infographics AI</title>
      </head>
      <body>
        {/* <Provider store={store}> */}
          {/* Wrap the entire app */}
          <div>
          
            {children}
          </div>
        {/* </Provider> */}
      </body>
    </html>
  );
}
