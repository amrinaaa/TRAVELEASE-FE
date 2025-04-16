import React from 'react'
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className='w-full text-white'>
      <section className='grid grid-cols md:grid-cols-3 gap-1 mx-auto px-10 md:px-20 py-10 bg-gradient-to-b from-ungu4 to-ungu5'>
        <div className=''>
          <img 
              src="/src/assets/img/Logo-w.png" 
              alt="logo-footer"
              className='h-12 mb-4'
          />
          <p className="md:text-left text-sm text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare cursus sed nunc eget dictum  Sed ornare cursus sed nunc eget dictumd nunc eget dictum  Sed ornare cursus sed nunc eget dictum.
          </p>
          <p className="md:text-left text-sm mt-4 text-justify">
              Want to join as a partner? <a href="#" className="font-bold text-ungu1">Contact Us.</a>
          </p>
          <p className="flex items-center space-x-2 mt-2">
            <Mail className="w-5 h-5 text-ungu1" />
            <span>travelease@gmail.com</span>
          </p>
          <p className="flex items-center space-x-2 mt-1">
            <Phone className="w-5 h-5 text-ungu1" />
            <span>+1 386-688-3295</span>
          </p>          
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 col-span-2 mt-4'>
          <div className='flex flex-col text-left md:text-center'>
            <h1 className='font-bold text-lg'>
              Header Text
            </h1>
            <ul>
              <li className='p-4'>
                <a href="">Item 1</a>
              </li>
              <li className='p-4'>
                <a href="">Item 2</a>
              </li>
              <li className='p-4'>
                <a href="">Item 3</a>
              </li>
              <li className='p-4'>
                <a href="">Item 4</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col text-left md:text-center'>
            <h1 className='font-bold text-lg'>
              Header Text
            </h1>
            <ul>
              <li className='p-4'>
                <a href="">Item 1</a>
              </li>
              <li className='p-4'>
                <a href="">Item 2</a>
              </li>
              <li className='p-4'>
                <a href="">Item 3</a>
              </li>
              <li className='p-4'>
                <a href="">Item 4</a>
              </li>
            </ul>
          </div>
          <div className='flex flex-col text-left md:text-center'>
            <h1 className='font-bold text-lg'>
              Header Text
            </h1>
            <ul>
              <li className='p-4'>
                <a href="">Item 1</a>
              </li>
              <li className='p-4'>
                <a href="">Item 2</a>
              </li>
              <li className='p-4'>
                <a href="">Item 3</a>
              </li>
              <li className='p-4'>
                <a href="">Item 4</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className='bg-ungu9'>
        <p className='text-center text-sm text-black p-2'>
          Copyright © 2025 - TravelEase
        </p>
      </section>
    </footer>
  )
}

export default Footer