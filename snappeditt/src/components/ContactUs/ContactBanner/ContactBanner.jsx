import { FaFacebookF, FaInstagram, FaLinkedinIn, FaSkype, FaWhatsapp } from "react-icons/fa";
import ContactBannerImage from "@/assets/images/pexels-caio-56759-scaled.jpg";

const Header36Defaults = {
  heading: "We Are Here To Assist You With Your Photo Post-Production Activities.",
  description: "Contact Us",
  image: {
    src: ContactBannerImage,
    alt: "Snappeditt Contact Banner",
  },
  socialMedia: [
    {
      icon: <FaWhatsapp />, link: "https://api.whatsapp.com/send/?phone=12394945666&text=I%27m+interested+in+your+Image+Services&app_absent=0"
    },
    { icon: <FaSkype />, link: "https://join.skype.com/invite/xyphtEF260if" },
    { icon: <FaLinkedinIn />, link: "https://www.linkedin.com/in/snapp-editt-b45295219/" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/snappeditt/" },
    { icon: <FaFacebookF />, link: "https://www.facebook.com/snappeditt/" },
  ],
};

export const ContactBanner = (props) => {
  const { heading, description, image, socialMedia } = {
    ...Header36Defaults,
    ...props,
  };

  return (
    <div
      id="relume"
      className="relative grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
    >
      {/* Social Media Icons */}
      <div className="absolute top-1/3 left-0 flex flex-col items-center space-y-4 pl-4">
        {socialMedia.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-red-500 text-xl transition duration-300"
          >
            {item.icon}
          </a>
        ))}
      </div>

      {/* Content */}
      <div className="mx-[5%] sm:max-w-md md:justify-self-start lg:ml-[5vw] lg:mr-20 lg:justify-self-end">
        <h5 className="md:text-md font-bold" style={{ color: '#f44336' }}>
          {description}
        </h5>
        <h1
          className="mb-5 text-6xl font-normal md:mb-6 md:text-7xl lg:text-10xl"
          style={{ fontFamily: "Courgette, cursive" }}
        >
          {heading}
        </h1>


      </div>

      {/* Image */}
      <div className="h-full">
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ContactBanner;
