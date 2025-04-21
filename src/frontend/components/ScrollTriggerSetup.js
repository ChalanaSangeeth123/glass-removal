// ScrollTriggerSetup.js
import { useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Rename the component to avoid conflict with the ScrollTrigger plugin
const ScrollTriggerSetup = () => {
  const { scroll } = useLocomotiveScroll(); // Note: useLocomotiveScroll must be used inside LocomotiveScrollProvider

  useEffect(() => {
    if (scroll) {
      gsap.registerPlugin(ScrollTrigger);

      const element = scroll?.el; // Note: 'e1' was a typo in your code, should be 'el'

      scroll.on('scroll', ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(element, {
        scrollTop(value) {
          return arguments.length
            ? scroll.scrollTo(value, { duration: 0, disableLerp: true })
            : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: element.style.transform ? 'transform' : 'fixed',
      });

      // Refresh ScrollTrigger when the component mounts
      ScrollTrigger.addEventListener('refresh', () => scroll?.update());
      ScrollTrigger.refresh();
    }

    // Cleanup on unmount
    return () => {
      ScrollTrigger.removeEventListener('refresh', () => scroll?.update());
      ScrollTrigger.killAll(); // Clean up ScrollTrigger instances
    };
  }, [scroll]); // Depend on scroll to ensure it’s available

  return null; // This component doesn’t render anything
};

export default ScrollTriggerSetup;