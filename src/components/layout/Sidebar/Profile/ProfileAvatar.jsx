'use client';

import { styled, css } from 'styled-components';
import { motion } from 'framer-motion';

import { sidebar } from '@/data';
import { Tooltip } from '@/styles';
import { rem, sidebarMotion } from '@/utils';

export const ProfileAvatar = () => {
  const data = sidebar.profile;

  return (
    <AvatarContainer className='art-avatar' {...sidebarMotion.profile.avatarContainer}>
      <AvatarCurtain className='art-avatar-curtain'>
        <AvatarImage src={data.avatar} alt='Avatar' {...sidebarMotion.profile.avatarItem} />
        {/* <HoverExpand /> */}
      </AvatarCurtain>

      <AvatarStatus className='art-lamp-light' $available={data.available} {...sidebarMotion.profile.avatarItem}>
        <AvatarStatusLight className='art-available-lamp' $available={data.available} />
      </AvatarStatus>
    </AvatarContainer>
  );
};

const AvatarContainer = styled(motion.div)`
  position: relative;
  width: ${rem(90)};
  height: ${rem(90)};
  border-radius: 50%;
`;

const AvatarCurtain = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  outline: inherit;
  transition: 0.2s ease-in-out;
  z-index: 0;
`;

const AvatarImage = styled(motion.img)`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  z-index: 0;
`;

const AvatarStatus = styled(motion.div)`
  z-index: 2;

  &:before {
    content: '';
    position: absolute;
    bottom: ${rem(-1)};
    right: ${rem(1)};
    background: ${({ $available }) => ($available ? 'greenyellow' : 'red')};
    height: ${rem(23)};
    width: ${rem(23)};
    border-radius: 50%;
    animation: ${({ $available }) => ($available ? 'puls 1s infinite' : 'none')};
    opacity: ${({ $available }) => !$available && 0};
  }
`;

const AvatarStatusLight = styled(Tooltip)`
  position: absolute;
  bottom: ${rem(3)};
  right: ${rem(5)};
  height: ${rem(15)};
  width: ${rem(15)};
  background: ${({ $available }) => ($available ? 'greenyellow' : 'red')};
  border-radius: 50%;
  z-index: 0;
  transition: 0.4s ease-in-out;

  &:after {
    content: "I'm available for hire";
    position: relative;
    top: ${rem(-10)};
    left: ${rem(28)};
    width: ${rem(115)};
    font-size: 10px;
    font-weight: normal;
    color: var(--c-font-1);
  }
  ${({ $available }) =>
    !$available &&
    css`
      &:after {
        content: "Sorry, I'm no longer available, but feel free to contact me.";
      }
    `}

  &:before {
    top: ${rem(5)};
    height: ${rem(5)};
    width: ${rem(5)};
    right: ${rem(-15)};
  }
`;
