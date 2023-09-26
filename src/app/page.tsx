"use client"
import Image from 'next/image'
import DrawingCanvas from '../app/components/DrawingCanva'
import Config from './components/Config'


export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-5">Welcome to the Number Line Test Tool!</h1>
      <p className="mx-5 mb-2"> This tool is meant to make the process of running the test easier and faster. After the test is done the response from the test will be sent to an email. Type the email below you would like to recieve the result of the test then click on "Start test" to get started.</p>
      <Config />
    </div>
  )
}