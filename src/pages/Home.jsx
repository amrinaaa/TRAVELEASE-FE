import React from 'react'
import TableSearch from '../components/TableSearch'

const Home = () => {
  return (
    <div>
      <section className='bg-cover bg-center pt-24' style={{ backgroundImage: `url('src/assets/img/bgHome.png')` }}>
        <div className='p-8 text-center'>
          <h1 className='text-white text-6xl font-bold mb-6'>TravelEase</h1>
          <p className='text-white text-xl'>Pesan Tiket & Hotel</p>
          <p className='text-white text-xl'>Mudah, Cepat dan Praktis!</p>
        </div>
        <div className='mt-4 md:pl-96 md:pr-96 text-left md:pb-12'>
          <TableSearch />
        </div>
      </section>

      {/* Second Section for Tikets */}
      <section className='py-8'>
        <div className='text-center'>
          <p className='text-xl font-semibold'>Tiket</p>
        </div>
      </section>

      {/* Third Section for Hotels */}
      <section className='py-8'>
        <div className='text-center'>
          <p className='text-xl font-semibold'>Hotels</p>
        </div>
      </section>
    </div>
  )
}

export default Home