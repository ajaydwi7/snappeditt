import React from 'react';
import { BiEnvelope, BiMap, BiPhone } from "react-icons/bi";

const ContactDetailSection = (props) => {
  const {
    contacts = [
      {
        icon: <BiEnvelope className="size-12" />,
        title: "Email",
        description: "For any inquiries or support, feel free to reach out to us via email. Our team is here to assist you with any questions you may have.",
        link: {
          label: "support@snappeditt.com",
          url: "mailto:support@snappeditt.com",
        },
      },
      {
        icon: <BiPhone className="size-12" />,
        title: "Phone",
        description: "Need immediate assistance? Call us directly! Our customer service representatives are available to help you.",
        link: {
          label: "+1-239-494-5666", // Visible phone number
          url: "tel:+1-239-494-5666",
        },
        additionalNumber: {
          label: "+1-800-123-4567", // Additional phone number
          url: "tel:+1-800-123-4567",
        },
      },
      {
        icon: <BiMap className="size-12" />,
        title: "Office",
        description: "Visit us at our office location for in-person consultations. We look forward to meeting you and discussing your needs.",
        link: {
          label: "Mumbai, India",
          url: "#",
        },
      },
    ],
  } = props;

  return (
    <section id="contact" style={{ padding: '4rem 5%', backgroundColor: '#f9f9f9' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {contacts.map((contact, index) => (
            <div key={index} style={{
              textAlign: 'center',
              border: '1px solid #f44336', // Border color
              borderRadius: '8px',
              padding: '2rem',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              backgroundColor: index === 1 ? '#fff' : '#f44336', // Conditional background color
              cursor: 'pointer',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 0 20px #f44336'; // Glowing shadow effect
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Reset shadow
              }}
            >
              <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                {/* Change icon color based on the index */}
                {React.cloneElement(contact.icon, { style: { color: index === 1 ? '#f44336' : '#fff' } })}
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: index === 1 ? '#f44336' : '#fff' }}>
                {contact.title}
              </h3>
              <p style={{ marginBottom: '1rem', color: index === 1 ? '#333' : '#fff' }}>{contact.description}</p>
              <a
                style={{ textDecoration: 'underline', color: index === 1 ? '#f44336' : '#fff' }}
                href={contact.link.url}
                onMouseEnter={(e) => e.currentTarget.style.color = '#000'} // Change color on hover
                onMouseLeave={(e) => e.currentTarget.style.color = index === 1 ? '#f44336' : '#fff'} // Reset color
              >
                {contact.link.label}
              </a>
              {contact.title === "Phone" && (
                <>
                  <br />
                  <a
                    style={{ textDecoration: 'underline', color: index === 1 ? '#f44336' : '#fff' }}
                    href={contact.additionalNumber.url}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#000'} // Change color on hover
                    onMouseLeave={(e) => e.currentTarget.style.color = index === 1 ? '#f44336' : '#fff'} // Reset color
                  >
                    {contact.additionalNumber.label}
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactDetailSection;
