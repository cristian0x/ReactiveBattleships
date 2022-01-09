export const titleVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1
  },
  transition: {
    duration: 2
  }
}

export const leftBoxVariants = {
  hidden: {
    x: -2000
  },
  visible: {
    x: 0
  },
  transition: {
    type: "spring",
    duration: 1.5,
    delay: 2,
  }
}

export const rightBoxVariants = {
  hidden: {
    x: 2000
  },
  visible: {
    x: 0
  },
  transition: {
    type: "spring",
    duration: 1.5,
    delay: 2
  }
}

export const onHover = {
  hover: {
    scale: 1.1,
    textShadow: "0px 0px 8px rgb(255,255,255)",
    boxShadow: "0px 0px 8px rgb(255,255,255)",
    transition: {
      yoyo: Infinity,
      duration: 0.4
    }
  }
}

export const pageSwitch = {
  hidden: {
    y: -2000
  },
  visible: {
    y: 0
  },
  transition: {
    type: "spring",
    delay: 0.2,
    stiffness: 60
  }
}

export const menuExpand = {
  hidden: {
    x: -1000
  },
  visible: {
    x: 0,
    opacity: 1
  },
  transition: {
    type: "spring",
    delay: 0.2,
    stiffness: 35
  }
}