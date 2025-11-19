import { Variants } from 'framer-motion'

// Staggered reveal animation for grids
export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Fade in animation for children
export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

// Scale in animation for modals
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  }
}

// Hero text entrance animation
export const heroText: Variants = {
  initial: {
    opacity: 0,
    y: 30
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut'
    }
  }
}

// Card hover effect
export const cardHover: Variants = {
  initial: {
    y: 0
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
  }
}