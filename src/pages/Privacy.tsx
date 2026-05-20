import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Privacy() {
  return (
    <main className="pt-[100px] pb-20 bg-bg-primary min-h-screen">
      <div className="content-max-width">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto bg-white p-8 md:p-12 rounded-2xl border border-border-light">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-txt-dark mb-6">
              Privacy Policy
            </h1>
            <div className="space-y-6 text-txt-dark-secondary text-base leading-relaxed">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, request a quote, or contact our support team. This may include your name, email address, phone number, and any other information you choose to provide.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, communicate with you, process your requests, and send you technical notices and support messages.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">3. Information Sharing</h2>
              <p>
                We do not share your personal information with third parties except as described in this privacy policy, such as with our service providers or when required by law.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at Info@transbiz.com.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
