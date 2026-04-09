export const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

export const itemVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const isMobile =
        typeof window !== "undefined" &&
        /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
            navigator.userAgent
        );
export const PAN_REGEX = /^[A-Z]{0,5}[0-9]{0,4}[A-Z]{0,1}$/;

// export const isValid = PAN_REGEX.test(panNumber) && panNumber.length === 10;