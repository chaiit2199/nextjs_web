'use client';

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import menuData from '@/private/menu.json';

interface SubMenuItem {
  id: number;
  label: string;
  href: string;
}

interface MenuItem {
  id: number;
  label: string;
  href: string;
  submenu?: SubMenuItem[];
}

export default function Header() {
  const menuItems: MenuItem[] = menuData.menuItems;
  const pathname = usePathname();
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black relative z-50">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link  href="/" className="text-xl font-bold text-black dark:text-white">
            <Image
              src="/icons/logo.svg"
              alt="Next.js logo"  
              width={150}
              height={80} 
              
            />
          </Link>
          
          <ul className="flex gap-6 items-center">
            {menuItems.map((item) => {
              const active = isActive(item.href);
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              return (
                <li 
                  key={item.id}
                  className="relative py-4"
                  onMouseEnter={() => hasSubmenu && setHoveredMenu(item.id)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`transition-colors inline-flex items-center gap-1 ${
                      active
                        ? 'text-black dark:text-white font-medium border-b-2 border-black dark:border-white pb-1'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                    {hasSubmenu && (
                      <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                  
                  {hasSubmenu && (
                    <ul 
                      className={`absolute top-full left-0 w-48 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden py-2 transition-all duration-200 ${
                        hoveredMenu === item.id 
                          ? 'opacity-100 visible translate-y-0' 
                          : 'opacity-0 invisible -translate-y-2 pointer-events-none'
                      }`}
                    >
                      {item.submenu?.map((subItem) => {
                        const subActive = isActive(subItem.href);
                        return (
                          <li key={subItem.id}>
                            <Link
                              href={subItem.href}
                              className={`block px-4 py-2 text-sm transition-colors ${
                                subActive
                                  ? 'bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white font-medium'
                                  : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-black dark:hover:text-white'
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}

