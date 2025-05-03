import React from 'react'
import TableSearch from '../components/TableSearch'
import TiketPesawat from '../components/TiketPesawat'

const Pesawat = () => {
  return (
    <div>
      <section className='bg-cover bg-center pt-24' style={{ backgroundImage: `url('src/assets/img/bgHome.png')` }}>
        <div className='p-8 text-center'>
          <h1 className='text-white text-6xl font-bold mb-6'>TravelEase</h1>
          <p className='text-white text-xl'>Pesan Tiket & Hotel</p>
          <p className='text-white text-xl'>Mudah, Cepat dan Praktis!</p>
        </div>
        <div className='mt-4 md:ml-80 md:mr-80 ml-8 mr-8 text-left pb-12'>
          <TableSearch />
        </div>
      </section>

      {/* Second Section for List Tikets */}
      <section className='py-8'>
        <div className='text-center mb-12'>
          <p className='text-xl font-semibold'>Tickets</p>
        </div>
        <div className='md:ml-48 md:mr-48 ml-2 mr-2'>
          <TiketPesawat />
        </div>
      </section>
    </div>
  )
}

export default Pesawat