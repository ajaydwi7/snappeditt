import { ContactBanner } from "@/components/ContactUs/ContactBanner/ContactBanner";
import ContactDetailSection from "@/components/ContactUs/ContactDetailSection/ContactDetailSection";
import FaqSection from "@/components/ContactUs/FaqSction/FaqSection";
import ContactForm from "@/components/ContactUs/ContactForm/ContactForm"; // Default import


function ContactUsView() {

  return (
    <div>
      <main>
        <section className="contact-banner">
          {/* Pass the custom content as props to Header83 */}
          <ContactBanner />
        </section>
        <section>
          <ContactDetailSection />
        </section>
        <section>
          <ContactForm />
        </section>
        <section>
          <FaqSection />
        </section>
      </main>
    </div>
  );
}

export default ContactUsView;
