import React from 'react';
import Packages from '@/components/GlobalComponents/Packages/Packages';

const PackagesPeopleRetouching = () => {
  const tabNames = ['Portrait Retouch', 'Corporate Headshots', 'Pregnancy Retouch', 'Baby Retouching', 'School Retouching', 'Sports Retouching', 'Fashion Retouching'];

  const tabsContent = [
    {
      images: [
        [
          new URL('@/assets/images/Real-Estate-Single_exposure-Raw-1.jpg', import.meta.url).href,
          new URL('@/assets/images/Real-Estate-Single_exposure-Corrected-1.jpg', import.meta.url).href
        ],
        [
          new URL('@/assets/images/Real-Estate-Single_exposure-Raw-2.jpg', import.meta.url).href,
          new URL('@/assets/images/Real-Estate-Single_exposure-Corrected-2.jpg', import.meta.url).href
        ],
        [
          new URL('@/assets/images/Real-Estate-Single_exposure-Raw-3.jpg', import.meta.url).href,
          new URL('@/assets/images/Real-Estate-Single_exposure-Corrected-3.jpg', import.meta.url).href
        ]
      ],
      title: 'Product Retouching',
      description: 'Make your product image presentable for advertisements and E- commerce sites.',
      price: '$1.50 – $4.00/Image',
      features: [
        { name: 'Color Correction', included: true },
        { name: 'Background Fixing and Replacement', included: true },
        { name: 'Dust Removal', included: true },
        { name: 'Unwanted Object Removal', included: true },
        { name: 'Creasing, Stains or Scratches fixing', included: true },
        { name: 'Removing Dark Spots and Flaws', included: true },
        { name: 'Adding Natural/Drop Shadow/Reflection', included: true }
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'Jewelry Retouching',
      description: 'Jewelry is expensive. Hence we preserve the rich look.',
      price: '$4.00/Image',
      features: [
        { name: 'Digital Polish of Metal, Diamond or Gemstone', included: true },
        { name: 'Correction or Straightening of irregular Chains (if required)', included: true },
        { name: 'Lighting Correction', included: true },
        { name: 'Cropping & Straightening', included: true },
        { name: 'Clipping Path', included: true },
        { name: 'Background Change/Removal', included: true },
        { name: 'Unwanted Reflection Removal', included: true },
        { name: 'Unwanted Dust Removal', included: true },
        { name: 'Spots & Blemishes Removal', included: true },
        { name: 'Adding Natural or Drop Shadow/Reflection', included: true }
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'Ghost Mannequin',
      description: 'Mannequin is removed cleanly, so that the apparel looks attractive.',
      price: '$4.00/Image',
      features: [
        { name: 'Color Correction', included: true },
        { name: 'Background Fixing or Replacement', included: true },
        { name: 'Dust Removal', included: true },
        { name: 'Unwanted Object Removal', included: true },
        { name: 'Creasing, Stains or Scratches fixing', included: true },
        { name: 'Adding Natural/Drop Shadow/Reflection', included: true },
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'Composite Retouching',
      description: 'Manipulate an image as per your marketing/ advertisement need.',
      price: '$0.00/Image',
      features: [
        { name: 'Composite retouching are used in all forms of photography. They can be a cost-effective way to create images for advertising campaigns, portraits, etc.', included: true }
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'School Retouching',
      description: 'Basics of editing gives us the best result for student images.',
      price: '$1.25/Image',
      features: [
        { name: 'Composite retouching are used in all forms of photography. They can be a cost-effective way to create images for advertising campaigns, portraits, etc.', included: true }
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'Sports Retouching',
      description: 'We can help you to complete your banners.',
      price: '$1.25/Image',
      features: [
        { name: 'Color Correction', included: true },
        { name: 'Straightening', included: true },
        { name: 'Crease Removal from Jersey', included: true },
        { name: 'Teeth & Eye Whitening', included: true }
      ]
    },
    {
      images: [
        [new URL('@images/Real-Estate-HDR-Basic-Raw-1.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-1.jpg', import.meta.url).href],
        [new URL('@images/Real-Estate-HDR-Basic-Raw-2.jpg', import.meta.url).href,
        new URL('@images/Real-Estate-HDR-Basic-Corrected-2.jpg', import.meta.url).href]
      ],
      title: 'Fashion – Glamour Retouching',
      description: 'High end work as per your custom instructions.',
      price: '$10.00/Image',
      features: [
        { name: 'Facial Alterations', included: true },
        { name: 'Color Enhancements', included: true },
        { name: 'Shadow & Distraction Removal', included: true },
        { name: 'Body & Skin area Sculpting', included: true },
        { name: 'Wrinkle Removal', included: true },
        { name: 'Scars Removal', included: true },
        { name: 'Blemishes Removal', included: true },
        { name: 'Photo Composition', included: true }
      ]
    }
    // Additional content here...
  ];

  return (
    <Packages
      tabNames={tabNames}
      tabsContent={tabsContent}
      title="Packages We Offer...."
    />
  );
};

export default PackagesPeopleRetouching;
