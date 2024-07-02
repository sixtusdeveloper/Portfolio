import React from 'react'
import MagicButton from './ui/MagicButton'
import { FaEnvelope, FaLocationArrow } from 'react-icons/fa'
import { div } from 'three/examples/jsm/nodes/Nodes.js'
import { socialMedia } from '@/data'

const Footer = () => {
  return (
    <footer className='w-full pt-10 py-8' id="contact">
        <div className='flex flex-col items-center'>
            <h1 className='heading lg:max-w-[45vw]'>Ready to take 
            <span className='text-purple'> your digital presence </span> to the next level?
            </h1>
            <p className='text-white-200 md:mt-10 my-5 text-center text-lg'>Reach out to me today and let&apos;s discuss how I can help you achieve your goals.</p>
            <a href="mailto:sixtusushrey@gail.com">
                <MagicButton 
                title="Let&apos;s get in touch"
                // icon={<FaEnvelope/>}
                icon={<FaLocationArrow/>}
                position="right"
                />
            </a>
        </div>
        <div className='flex lg:mt-40 mt-40 md:flex-row flex-col justify-between items-center'>
            <p className="md:text-base py-6 text-sm md:font-normal font-light">Copyright&copy; 2024 <span className="text-purple">Developed by Sixtusdev</span> | All rights reserved | terms & conditions.</p>
            <div className='flex items-center md:gap-3 gap-6'>
             {socialMedia.map((profile) => (
                <div key={profile.id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300'>
                    <img 
                    src={profile.img} alt={profile.id} 
                    width={20} height={20}
                    />
                </div>
             ))}
            </div>
        </div>
    </footer>

  )
}

export default Footer