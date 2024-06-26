'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { styled } from 'styled-components';
import { motion } from 'framer-motion';

import { SVGs } from '@/components';
import { dataStore } from '@/data';
import { navbarMotion, rem } from '@/utils';

export const NavbarListItem = ({ title, path, index, submenu }) => {
  const pathname = usePathname();
  const { navbarOpen, closeNavbar } = dataStore((state) => ({ navbarOpen: state.navbarOpen, closeNavbar: state.closeNavbar }));
  const [submenuOpen, setSubMenuOpen] = useState(false);

  const handleClick = (e) => {
    if (submenu) setSubMenuOpen((prev) => !prev);
    else {
      if (pathname === path) e.preventDefault();
      closeNavbar();
    }
  };

  return (
    <ListItem
      className={`menu-item ${submenu ? ' menu-item-has-children' : ''}`}
      $currentPage={pathname === path}
      $submenuopen={submenu && submenuOpen}
      {...navbarMotion.item}
    >
      {submenu ? (
        <>
          <p onClick={handleClick}>{title}</p>
          <ul className='sub-menu'>
            {submenu.map((li, index) => (
              <NavbarListItem key={`navbarlist-${title}-${index}`} {...li} />
            ))}
          </ul>
          <SVGs type='right' height={9} />
        </>
      ) : (
        <Link href={path} onClick={handleClick}>
          {title}
        </Link>
      )}
    </ListItem>
  );
};

const ListItem = styled(motion.li)`
  position: relative;
  width: 100%;
  list-style-type: none;

  * {
    color: ${({ $currentPage }) => ($currentPage ? 'var(--c-font-2)' : 'var(--c-font-1)')};
    &:hover {
      color: var(--c-font-2);
      text-shadow: 0 0 ${rem(3)} var(--c-font-shadow);
    }
  }

  a, p, span {
    transition: 0.2s ease-in-out;
  }

  a, p {
    display: inline-block;
    width: 100%;
    margin-bottom: 0;
    padding: ${rem(7)} ${rem(30)};
    font-size: ${rem(13)};
    font-weight: 500;
    letter-spacing: ${rem(1)};
    text-transform: uppercase;
    cursor: pointer;
  }

  &:first-child {
    margin-top: ${rem(15)};
  }
  &:last-child {
    margin-bottom: ${rem(15)};
  }

  /* Submenu */
  i, svg {
    position: absolute;
    top: ${rem(12.5)};
    right: ${rem(30)};
    display: inline-block;
    /* font-size: ${rem(9)}; */
    /* font-weight: 900; */
    /* font-style: normal; */
    /* font-variant: normal; */
    /* text-rendering: auto; */
    transform: translateX(${rem(5)});
    transition: 0.4s ease-in-out;
  }

  &.menu-item-has-children {
    position: relative;
    padding-left: 0;
    padding-right: 0;

    &:hover {
      i, svg {
        transform: rotate(90deg);
      }
    }

    .sub-menu {
      position: relative;
      width: 100%;
      max-height: ${({ $submenuopen }) => ($submenuopen ? rem(500) : 0)};
      padding-left: 0;
      display: block;
      box-shadow: inset 0 ${rem(3)} ${rem(8)} 0 var(--c-box-shadow);
      background: var(--c-bg);
      filter: brightness(95%);
      pointer-events: ${({ $submenuopen }) => ($submenuopen ? 'all' : 'none')};
      overflow: hidden;
      transition: max-height 0.6s ease-in-out;

      .menu-item {
        opacity: ${({ $submenuopen }) => ($submenuopen ? 1 : 0)};

        a {
          font-size: ${rem(11)};
        }
      }
    }
  }
`;
