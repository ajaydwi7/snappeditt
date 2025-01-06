import React from 'react';
import Packages from '@/components/GlobalComponents/Packages/Packages';

const PackagesClippingPathExtraction = () => {
  const tabNames = ['Clipping Path', 'Extraction'];

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
      title: 'Clipping Path',
      description: 'Get transparent background or changed background as per your need.',
      price: '$1.50 – $5.00/Image',
      features: [
        { name: 'Background Replacement using Fast Cut-Out', included: true },
        { name: 'Adding Transparent or White Background', included: true },
        { name: 'Color Correction (if-required)', included: true },
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
      title: 'Extraction',
      description: 'You get the path, so that you can replace the background as per your requirement.',
      price: '$0.50 – $4.50/Image',
      features: [
        { name: 'Background Replacement using Creating Path', included: true },
        { name: 'Adding Transparent or White Background', included: true },
        { name: 'Color Correction (if-required)', included: true },
        { name: 'Cropping & Straightening', included: true },
        { name: 'Adding Natural/Drop Shadow/Reflection', included: true }
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

export default PackagesClippingPathExtraction;
