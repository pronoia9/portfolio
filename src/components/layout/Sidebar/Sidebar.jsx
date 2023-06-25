import { styled } from 'styled-components';
import { Scrollbar } from 'smooth-scrollbar-react';

import { Profile, About, Languages, HardSkills, SoftSkills, Strengths, Resume, Socials } from '.';
import { dataStore } from '../../../store/dataStore';
import { rem } from '../../../utils';

const Sidebar = () => {
  const { sidebarOpen, toggleSidebar } = dataStore((state) => ({ sidebarOpen: state.sidebarOpen, toggleSidebar: state.toggleSidebar }));

  return (
    <Container className='art-info-bar' $active={sidebarOpen}>
      <Wrapper className='art-info-bar-frame'>
        <MobileHeader className='art-info-bar-header' $active={sidebarOpen}>
          <div className='art-info-bar-btn' onClick={() => toggleSidebar()}>
            <i className='fas fa-ellipsis-v' />
          </div>
        </MobileHeader>

        <Profile />

        <Scrollbar id='sidebar-scrollbar' className='art-scroll-frame' damping={0.5} plugins={{ overscroll: { effect: 'bounce' } }}>
          <ScrollContent className='scroll-content'>
            <About /> <div className='art-ls-divider' />
            <Languages /> <div className='art-ls-divider' />
            <HardSkills /> <div className='art-ls-divider' />
            <SoftSkills /> <div className='art-ls-divider' />
            <Strengths /> <div className='art-ls-divider' />
            <Resume />
          </ScrollContent>
        </Scrollbar>

        <Socials />
      </Wrapper>
    </Container>
  );
};
export default Sidebar;

const Container = styled.div`
  position: relative;
  width: ${rem(290)};
  min-width: ${rem(290)};
  height: calc(100vh - ${rem(30)});
  padding: 0 ${rem(15)};
  background: var(--c-bg-menu-1);
  box-shadow: 0 ${rem(3)} ${rem(8)} 0 var(--c-box-shadow);
  z-index: 999;
  isolation: isolate;
  transition: 0.55s ease-in-out;

  @media (max-width: ${rem(920)}) {
    position: absolute;
    left: ${rem(-290)};
    width: ${rem(290)};
    height: 100vh;
    transform: ${({ $active }) => $active && `translateX(${rem(290)})`};
  }

  @media (max-width: ${rem(290)}) {
    width: 100vw;
  }
`;

const Wrapper = styled.div`
  padding: 0 ${rem(15)};
`;

const MobileHeader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: ${rem(70)};
  display: none;
  justify-content: flex-start;
  align-items: center;
  z-index: 999999999999;

  .art-info-bar-btn {
    margin-left: auto;
    pointer-events: all;
    font-size: ${rem(14)};
    padding: ${rem(30)};

    &.art-disabled {
      opacity: 0;
      pointer-events: none;
    }
  }

  @media (max-width: ${rem(920)}) {
    display: flex;

    .art-info-bar-btn {
      transform: ${({ $active }) => ($active ? 'translateX(0)' : `translateX(${rem(70)})`)};
      transition: 0.4s ease-in-out;
    }
  }
`;

const ScrollContent = styled.div`
  padding: ${rem(240)} 0 ${rem(50)};
`;
