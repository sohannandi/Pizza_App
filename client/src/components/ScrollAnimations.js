import { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    // Add visible class to all animated elements immediately to ensure they're visible
    const animatedElements = document.querySelectorAll(
      '.fade-in, .scale-in, .slide-in-left, .slide-in-right'
    );
    
    // Make all elements visible immediately
    animatedElements.forEach(el => {
      el.classList.add('visible');
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements for future animations
    animatedElements.forEach(el => observer.observe(el));

    // Parallax effect for geometric shapes
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      // Floating geometric shapes
      const shapes = document.querySelectorAll('.geometric-shape');
      shapes.forEach((shape, index) => {
        const speed = 0.2 + (index * 0.05);
        const rotation = scrolled * 0.1;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
      });
    };

    // Smooth scrolling with easing
    const smoothScroll = (target) => {
      const targetPosition = target.offsetTop - 100;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let start = null;

      const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      };

      const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        const ease = easeInOutCubic(progress);
        
        window.scrollTo(0, startPosition + distance * ease);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);
    };

    // Add smooth scroll to navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          smoothScroll(targetElement);
        }
      });
    });

    // Mouse movement parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const moveX = (clientX - centerX) * 0.01;
      const moveY = (clientY - centerY) * 0.01;

      const parallaxElements = document.querySelectorAll('.pizza-card, .auth-form');
      parallaxElements.forEach((element, index) => {
        const multiplier = (index % 2 === 0) ? 1 : -1;
        element.style.transform = `translate(${moveX * multiplier}px, ${moveY * multiplier}px)`;
      });
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      navLinks.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return null;
};

export default ScrollAnimations;