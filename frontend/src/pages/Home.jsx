import React from 'react'
import Head from '../components/Head'
import SpacialityMenu from '../components/spacialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div className=''>
        <Head />
        <SpacialityMenu />
        <TopDoctors />
        <Banner />
    </div>
  )
}

export default Home