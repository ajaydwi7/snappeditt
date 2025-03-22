import { Button } from "@relume_io/relume-ui";
// import { ButtonProps } from "@relume_io/relume-ui";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import LottiePlayer from './LottiePlayer';
import { FaArrowDown } from 'react-icons/fa';

// Remove type aliases and annotations
const Header83Defaults = {
  heading: "Medium length hero heading goes here",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  buttons: [{ title: "Button", url: "#" }, { title: "Button", variant: "secondary-alt", url: "#" }],
  images: [
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 1",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 2",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 3",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 4",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 5",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 6",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 7",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 8",
    },
    {
      src: "https://d22po4pjz3o32e.cloudfront.net/placeholder-image.svg",
      alt: "Relume placeholder image 9",
    },
  ],
};

export const Header83 = (props) => {
  const { heading, description, buttons, images } = {
    ...Header83Defaults,
    ...props,
  };

  const { scrollYProgress } = useScroll();
  const opacityContent = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [3.2, 1]);

  return (
    <section id="relume" className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full items-center justify-center"
          style={{ opacity: opacityContent }}
        >
          <div className="px-[5%] py-16 md:py-24 lg:py-28">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="mb-5 text-6xl font-bold text-text-alternative md:mb-6 md:text-9xl lg:text-10xl">
                {heading}
              </h1>
              <p className="text-text-alternative md:text-md">{description}</p>
              <div className="mt-6 flex items-center justify-center gap-x-4 md:mt-8">
                {buttons.map((button, index) => (
                  <Button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.querySelector(button.url);
                      target?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      borderRadius: '25px',
                      cursor: 'pointer'
                    }}
                  >
                    <FaArrowDown className="ml-2" />
                    {button.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute inset-0 z-10 bg-black/50"
            style={{ opacity: opacityOverlay }}
          />
          <motion.div
            style={{ scale }}
            className="grid size-full auto-cols-fr grid-cols-1 gap-x-4 gap-y-4 md:grid-cols-3"
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={clsx(
                  "relative",
                  [0, 2, 3, 5, 6, 8].indexOf(index) !== -1 && "hidden md:block",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            ))}
          </motion.div>
        </div>
        <LottiePlayer height="80px" width="80px" position="left-bottom" />
      </div>
    </section>
  );
};
