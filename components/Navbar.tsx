'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
// import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
// import Notification from './Notification';  // Import the Notification component

interface NavbarProps {
  LogoImg?: string;
  title?: string;
  LogoImgDark?: string;
  navigation: { name: string; href: string }[];
}

export default function Navbar({
  LogoImg,
  title,
  LogoImgDark,
  navigation,
}: NavbarProps) {
  const { user } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (let item of navigation) {
        const section = document.querySelector(`#${item.href.substring(1)}`);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            setActiveSection(item.href.substring(1));
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigation]);

  const handleClick = (href: string) => {
    setActiveSection(href.substring(1));
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${scrolling ? 'bg-black-100' : 'bg-transparent'}`}>
      <nav aria-label="Global" className="flex items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <Image
              alt="Chatter"
              src={LogoImg || "/img/logo-black.png"}
              className="h-16 w-auto"
              width={100}
              height={100}
              style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
              priority={true}
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-100"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={`#${item.href.substring(1)}`}
              className={`text-sm font-semibold leading-6 tracking-wider ${activeSection === item.href.substring(1) ? 'text-blue-300' : 'text-blue-100'} hover:text-blue-200`}
              onClick={() => handleClick(item.href)}
            >
              {item.name}
            </a>

          ))}
         
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end gap-5 items-center">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <div className="flex items-center gap-4">
              <Notification /> {/* Add Notification Component */}
              {user && <span className="hidden lg:block text-sm font-semibold text-purple">{user.firstName}</span>}
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} className="lg:hidden">
        <div className="fixed inset-0 z-40" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-100 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <Image
                alt="Chatter"
                src={LogoImgDark || "/img/logo-white.png"}
                className="h-16 w-auto"
                width={100}
                height={100}
                style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
                priority={true}
              />
            </a>
            
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-black-100"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={`#${item.href.substring(1)}`}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black-100 hover:bg-gray-200"
                    onClick={() => handleClick(item.href)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="py-3">
                <SignedOut>
                  <SignInButton />
                </SignedOut>
                <SignedIn>
                  <div className="flex items-center gap-2">
                    <UserButton />
                  </div>
                </SignedIn>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}










