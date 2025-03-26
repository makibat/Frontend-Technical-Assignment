import localFont from "next/font/local";

export const Avenir = localFont({
  src: [
    {
      path: "./Avenir/AvenirLTProLight.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Avenir/AvenirLTProMedium.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-avenir",
  preload: true,
});
