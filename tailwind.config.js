/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react";

module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors : {
        'ungu1' :'#461873' ,
        'ungu2' :'#58148E',
        'ungu3' :'#6910A8',
        'ungu4' :'#8C07DD',
        'ungu5' :'#9F21E3',
        'ungu6' :'#B333E9' ,
        'ungu7' :'#CB5DF1',
        'ungu8' :'#DC93F6',
        'ungu9' :'#EABFFA',
        'ungu10' :'#F7EBFD',
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()]
}
