'use client';

import { styled, css } from 'styled-components';
import { motion } from 'framer-motion';

import { Progressbar } from '@/components';
import { sidebar } from '@/data';
import { Tooltip } from '@/styles';
import { sidebarMotion, rem } from '@/utils';

export const HardSkills = () => {
  const data = sidebar.skills.hard;

  return (
    <SkillsContainer className='art-hard-skills p-15-15' {...sidebarMotion.hardSkills.container}>
      {data.map((skill, index) => (
        <HardSkillsItem key={`sidebar-hardskill-item-${index}`} {...skill} index={index} />
      ))}
    </SkillsContainer>
  );
};

const SkillsContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${rem(5)};
`;

export const HardSkillsItem = (props) => (
  <SkillItem className='art-hard-skills-item' $description={props.description} {...sidebarMotion.hardSkills.item}>
    <motion.span className='art-skill-heading' {...sidebarMotion.hardSkills.items}>
      {props.title}
    </motion.span>
    <Progressbar {...props} type='line' hide={true} {...sidebarMotion.hardSkills.items} />
  </SkillItem>
);

const SkillItem = styled(Tooltip)`
  position: relative;
  color: var(--c-font-2);

  ${({ $description }) =>
    $description
      ? css`
          &::after {
            content: $description;
            top: -100%;
            right: 1%;
            max-width: 90%;
            color: var(--c-font-2);
            font-size: 0.8rem;
            background: var(--c-bg);
            transform: scale(0.75);
            transition-delay: 1.75s;
          }
        `
      : css`
          &::after {
            content: none;
          }
        `}
`;
