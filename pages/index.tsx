import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import PatientList from './test'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <PatientList />
    </div>
  )
}

export default Home
