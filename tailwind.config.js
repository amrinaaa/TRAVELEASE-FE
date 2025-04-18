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
        'ungu4' :'#8C52FF', // Primary 1
        'ungu5' :'#9F21E3', // Primary 2
        'ungu6' :'#B333E9' ,
        'ungu7' :'#CB5DF1', // Primary 3
        'ungu8' :'#DC93F6',
        'ungu9' :'#EABFFA', // Secondary 1
        'ungu10' :'#F7EBFD', // Secondary 2
        'yellow1' : '#FFDB33',
        'blue1' : '#0A4C70'
      }
    },
  },
  darkMode: "class",
  plugins: [heroui()],
  variants:{
    extend : {
      display : ["focus-group"]
    }
  }
}
