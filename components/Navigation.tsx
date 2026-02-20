'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-blue-600 hover:text-blue-700"
            onClick={closeMenu}
          >
            <Image 
              src="/logo.svg" 
              alt="엄마가 보고 있다 로고" 
              width={40} 
              height={40} 
              className="w-8 h-8 md:w-10 md:h-10" 
            />
            <span className="hidden md:inline whitespace-nowrap">엄마가 보고 있다</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/news" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              뉴스
            </Link>
            <Link href="/rankings" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              종합순위
            </Link>
            <Link href="/foreign-language-high" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              외고순위
            </Link>
            <Link href="/autonomous-high" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              자사고순위
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              Contact
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors whitespace-nowrap">
              About
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded"
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link 
                href="/news" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                뉴스
              </Link>
              <Link 
                href="/rankings" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                종합순위
              </Link>
              <Link 
                href="/foreign-language-high" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                외고순위
              </Link>
              <Link 
                href="/autonomous-high" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                자사고순위
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                Contact
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 hover:text-blue-600 font-semibold transition-colors py-2 px-3 hover:bg-blue-50 rounded"
                onClick={closeMenu}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
