import React, { useState } from 'react';
import {
  Button,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@relume_io/relume-ui";

const FaqSection = (props) => {
  const {
    heading = "FAQs",
    description = "Most frequent questions and answers",
    serviceRelatedQuestions = [
      {
        title: "What type of services does SNAPPEDITT offer?",
        answer: (
          <div>
            <p style={{ lineHeight: '1.6' }}>
              Snapp Editt offers a wide range of services to photographers and photography companies dealing in different types of verticals. Here are some of the verticals listed:
            </p>
            <ul style={{ lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Real Estate</li>
              <li>3D Services</li>
              <li>Wedding & Events</li>
              <li>People</li>
              <li>Product & Commercial</li>
              <li>Extraction</li>
            </ul>
          </div>
        ),
      },
      {
        title: "What is the process or workflow for a new job?",
        answer: (
          <div>
            <p style={{ lineHeight: '1.6' }}>
              Before proceeding with the actual job, we can start with a free trial service. It will give you a better idea about the price, quality, and turnaround time we offer. If you are happy with our services, then you can place a paid order by registering with us.
            </p>
          </div>
        ),
      },
      {
        title: "What’s turnaround time?",
        answer: (
          <div>
            <p style={{ lineHeight: '1.6' }}>
              Turnaround time directly depends on the volume and complexity of the project. However, our standard turnaround for different verticals are:
            </p>
            <ul style={{ lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>Real Estate – 12 hours for all Real Estate orders</li>
              <li>Wedding & Events – 24-48 hours for all Wedding orders.</li>
              <li>People – 24 to 48 hours</li>
              <li>Product & Commercial – 24-48 hours</li>
              <li>Extraction – 24-48 hours</li>
            </ul>
          </div>
        ),
      },
      {
        title: "Do we have any preferences on input files?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            We can work on any type of files including JPEG too; however, we do prefer RAW files in order to get the best output result.
          </p>
        ),
      },
      {
        title: "What is Smart previews?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            Smart Previews are a low-resolution, fully editable preview version of your original RAW file. Actually, they are DNG files, rendered in Lightroom with a size of 2540px on the long edge that are grouped into a .lrdata file next to your Lightroom catalog.
          </p>
        )
      },
      {
        title: "How to create Lightroom smart previews?",
        answer: (
          <div>
            <p style={{ lineHeight: '1.6' }}>
              There are several ways to generate Smart Preview files:
            </p>
            <h5 style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>Import</h5>
            <p style={{ lineHeight: '1.6' }}>
              When you import new images into your catalog, select Build Smart Previews (Import dialog &gt; File Handling section). Smart Previews are created for all the images imported into the catalog.
            </p>
            <h5 style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>Export</h5>
            <p style={{ lineHeight: '1.6' }}>
              When you export a set of photographs as a catalog, you can choose to build and include Smart Previews in the exported catalog. Click File &gt; Export as Catalog, and then select the Build / Include Smart Previews checkbox.
            </p>
            <h5 style={{ fontWeight: 'bold', margin: '0.5rem 0' }}>On the fly</h5>
            <p style={{ lineHeight: '1.6' }}>
              You can create Smart Preview files on demand. Select the files for which you want Smart Previews, and then click Library &gt; Previews &gt; Build Smart Previews.
            </p>
            <p style={{ lineHeight: '1.6' }}>
              To know more please click on the below website: <a href="https://helpx.adobe.com/in/lightroom-classic/help/lightroom-smart-previews.html#CreateSmartPreviews" target="_blank" rel="noopener noreferrer">Learn more</a>
            </p>
          </div>
        )
      },
      {
        title: "What if I have any custom request or requirements which is not listed on your website?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            Our professional editors are capable of handling all types of custom requests. If you have any custom request which is not listed on our website, then feel free to contact us or send your custom request through our custom process option. Our team will check the details and provide you the quote. The quote will be provided without any commitment or obligation. Please click on the below link to place a custom order: Custom Process (redirect to custom process order form).
          </p>
        ),
      },
      {
        title: "What are the methods of transferring the files?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            You can send the images using Dropbox, Google Drive, WeTransfer, Hightail, FTP server, or whichever method is preferable to you. You can also send the images by placing an order through our website and upload the images to the system. For any doubts feel free to contact us.
          </p>
        ),
      },
      {
        title: "Do you do Rush jobs?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            SnappEditt has a large team of professional editors and can definitely do rush jobs for you. If you have any rush job requirement then please contact our sales team along with your requirements and our production team will work out the schedule and arrange the faster delivery of it.
          </p>
        ),
      },
    ],
    generalQueries = [
      {
        title: "How secure are my files?",
        answer: (
          <div>
            <p style={{ lineHeight: '1.6' }}>
              We follow strict privacy policy regarding the security of the images. We do undertake the following measure to ensure the level of security at our production facility:
            </p>
            <ul style={{ lineHeight: '1.6', listStyleType: 'disc', paddingLeft: '20px' }}>
              <li>24 x 7 CCTV monitoring for all employees</li>
              <li>USB ports are disabled on all editors' systems</li>
              <li>Mobile phones and any other external memory drives are not permitted in the production area</li>
              <li>Internet access has been given only to the senior level staff.</li>
              <li>Files are saved on the central server and not on any editor's system</li>
              <li>Copying and deleting of files is domain controlled and password protected.</li>
              <li>If required, we can sign a Non-Disclosure Agreement (NDA) where all the terms and conditions would be mentioned regarding the safety and security of the images.</li>
            </ul>
          </div>
        ),
      },
      {
        title: "What if the quality is not up to my expectations?",
        answer: "Files not meeting satisfactory standards will be redone without any cost until you are satisfied with the quality."
      },
      {
        title: "What's your working hours?",
        answer: "Our production and sales team works 24 x 7 around the clock to help our customers to meet their deadline."
      },
      {
        title: "How many editors will be working on my images?",
        answer: "Once we start working together, we will set-up a dedicated team of 2-3 editors (depending on the volume), who will be specifically working on all your jobs."
      },
      {
        title: "Do you offer volume discount?",
        answer: (
          <p style={{ lineHeight: '1.6' }}>
            Yes, we provide volume discounts. Feel free to contact us for more details at <a
              href="mailto:sales@snappeditt.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#f44336', textDecoration: 'underline' }}
            >
              sales@snappeditt.com
            </a>
          </p>
        )
      },
      {
        title: "What are the payment options?",
        answer: (<p style={{ lineHeight: '1.6' }}>We do accept payments via PayPal, Credit/Debit Card. To know more about it please contact us at <a
          href="mailto:sales@snappeditt.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#f44336', textDecoration: 'underline' }}
        >
          sales@snappeditt.com
        </a></p>
        )
      },
    ],
  } = props;

  // State to track the currently open accordion item
  const [openAccordion, setOpenAccordion] = useState(null);

  // Function to handle accordion toggle
  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="w-full flex flex-col items-center mb-12"> {/* Full width and center alignment */}
          <h2 className="rb-5 mb-5 text-5xl font-bold md:mb-6 md:text-7xl lg:text-8xl text-center">
            {heading}
          </h2>
          <p className="md:text-md text-center">{description}</p>
        </div>

        {/* Service Related Questions */}
        <div className="mb-12">
          <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">Service Related</h3>
          <Accordion type="multiple">
            {serviceRelatedQuestions.map((question, index) => (
              <AccordionItem key={index} value={`service-item-${index}`}>
                <AccordionTrigger
                  className="md:py-5 md:text-md"
                  onClick={() => handleAccordionToggle(index)}
                >
                  {question.title}
                </AccordionTrigger>
                {openAccordion === index && (
                  <AccordionContent className="md:pb-6">{question.answer}</AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* General Queries */}
        <div>
          <h3 className="mb-3 text-2xl font-bold md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">General Queries</h3>
          <Accordion type="multiple">
            {generalQueries.map((question, index) => (
              <AccordionItem key={index} value={`general-item-${index}`}>
                <AccordionTrigger
                  className="md:py-5 md:text-md"
                  onClick={() => handleAccordionToggle(index + serviceRelatedQuestions.length)} // Adjust index for general queries
                >
                  {question.title}
                </AccordionTrigger>
                {openAccordion === index + serviceRelatedQuestions.length && (
                  <AccordionContent className="md:pb-6">{question.answer}</AccordionContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
