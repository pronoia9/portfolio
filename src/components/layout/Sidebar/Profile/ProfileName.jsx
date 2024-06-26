'use client';

import Link from 'next/link';
import { styled } from 'styled-components';

import { SplitText } from '@/components';
import { sidebar } from '@/data';

export const ProfileName = () => {
  const data = sidebar.profile;

  return (
    <NameText className='art-name mb-10'>
      <Link href={data.nameLink} shallow>
        <SplitText>{data.name}</SplitText>
      </Link>
    </NameText>
  );
};

const NameText = styled.h3`
  a {
    color: var(--c-font-2);
    transition: 0.4s ease-in-out;

    &:hover {
      color: var(--c-accent-1);
    }
  }
`;
