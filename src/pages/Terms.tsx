import ScrollReveal from "@/components/shared/ScrollReveal";

export default function Terms() {
  return (
    <main className="pt-[100px] pb-20 bg-bg-primary min-h-screen">
      <div className="content-max-width">
        <ScrollReveal>
          <div className="max-w-[800px] mx-auto bg-white p-8 md:p-12 rounded-2xl border border-border-light">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-txt-dark mb-6">
              Terms of Service
            </h1>
            <div className="space-y-6 text-txt-dark-secondary text-base leading-relaxed">
              <p>Last Updated: {new Date().toLocaleDateString()}</p>
              
              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Transbiz website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">2. Services Provided</h2>
              <p>
                Transbiz provides electric vehicle leasing, financing, and related services. All services are subject to availability and may be modified or discontinued at our discretion without prior notice.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">3. User Responsibilities</h2>
              <p>
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">4. Limitation of Liability</h2>
              <p>
                Transbiz shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
              </p>

              <h2 className="text-xl font-heading font-semibold text-txt-dark mt-8 mb-4">5. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at Info@transbiz.com.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
