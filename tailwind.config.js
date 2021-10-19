// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      sm: ["14px", "20px"],
      base: ["16px", "24px"],
      lg: ["20px", "28px"],
      xl: ["24px", "32px"],
    },
    width: {
      "4px": "4px",
      "8px": "8px",
      "12px": "12px",
      "16px": "16px",
      "20px": "20px",
      "24px": "24px",
      "28px": "28px",
      "32px": "32px",
      "100px": "100px",
      "200px": "200px",
      "300px": "300px",
      "400px": "400px",
      "500px": "500px",
      "600px": "600px",
      "4rem": "0.04rem",
      "8rem": "0.08rem",
      "12rem": "0.12rem",
      "16rem": "0.16rem",
      "20rem": "0.2rem",
      "24rem": "0.24rem",
      "28rem": "0.28rem",
      "32rem": "0.32rem",
      "36rem": "0.36rem",
      "100rem": "1rem",
      "200rem": "2rem",
      "300rem": "3rem",
      "400rem": "4rem",
      "500rem": "5rem",
      "600rem": "6rem",
      "100vw": "100vw",
    },
    height: {
      "4px": "4px",
      "8px": "8px",
      "12px": "12px",
      "16px": "16px",
      "20px": "20px",
      "24px": "24px",
      "28px": "28px",
      "32px": "32px",
      "100px": "100px",
      "200px": "200px",
      "300px": "300px",
      "400px": "400px",
      "500px": "500px",
      "600px": "600px",
      "4rem": "0.04rem",
      "8rem": "0.08rem",
      "12rem": "0.12rem",
      "16rem": "0.16rem",
      "20rem": "0.2rem",
      "24rem": "0.24rem",
      "28rem": "0.28rem",
      "32rem": "0.32rem",
      "36rem": "0.36rem",
      "100rem": "1rem",
      "200rem": "2rem",
      "300rem": "3rem",
      "400rem": "4rem",
      "500rem": "5rem",
      "600rem": "6rem",
      "100vh": "100vh",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
      blue: "0 10px 15px -3px rgba(147, 197, 253, 0.7), 0 4px 6px -2px rgba(147, 197, 253, 0.3)",
    },
    extend: {
      animation: {
        'blue-twinkling': 'blue-twinkling 1.5s ease-in-out infinite alternate'
      },
      keyframes: {
        "blue-twinkling": {
          "0%": {
            boxShadow:
              "0 3px 12px 1px rgba(147, 197, 253, 0.4), 0 3px 12px 1px rgba(147, 197, 253, 0.2)",
          },
          "100%": {
            boxShadow:
              "0 6px 12px 3px rgba(147, 197, 253, 0.8), 0 6px 12px 3px rgba(147, 197, 253, 0.4)",
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
