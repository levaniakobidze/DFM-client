import Link from "next/link";

const LAST_UPDATED = "March 27, 2026";

const sections = [
  { id: "information-we-collect",   title: "1. Information We Collect"        },
  { id: "how-we-use",               title: "2. How We Use Your Information"    },
  { id: "information-sharing",      title: "3. Information Sharing"            },
  { id: "data-security",            title: "4. Data Security"                  },
  { id: "your-rights",              title: "5. Your Rights"                    },
  { id: "cookies",                  title: "6. Cookies & Tracking"             },
  { id: "third-party",              title: "7. Third-Party Services"           },
  { id: "children",                 title: "8. Children's Privacy"             },
  { id: "changes",                  title: "9. Changes to This Policy"         },
  { id: "contact",                  title: "10. Contact Us"                    },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-8"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </Link>

      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 text-xs font-semibold mb-4">
          🔒 Legal
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Last updated: <span className="font-medium text-gray-700 dark:text-gray-300">{LAST_UPDATED}</span>
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          At DareMe, we take your privacy seriously. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our platform. Please read
          this policy carefully. If you disagree with its terms, please discontinue use of the site.
        </p>
      </div>

      {/* Table of contents */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
          Contents
        </p>
        <ul className="space-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="text-sm text-violet-600 dark:text-violet-400 hover:underline"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Content */}
      <div className="prose-custom space-y-12">

        <Section id="information-we-collect" title="1. Information We Collect">
          <Subsection title="Information You Provide Directly">
            <p>When you register for an account, create or accept a dare, or submit proof of completion, we may collect:</p>
            <ul>
              <li><strong>Account information:</strong> name, email address, and password.</li>
              <li><strong>Profile information:</strong> username, avatar, and bio.</li>
              <li><strong>Payment information:</strong> payout details such as bank account or digital wallet address (processed via our payment partners — we never store raw card data).</li>
              <li><strong>User content:</strong> dare titles, descriptions, proof submissions (video/image files), and comments.</li>
            </ul>
          </Subsection>
          <Subsection title="Information Collected Automatically">
            <p>When you access DareMe, we automatically collect certain technical information, including:</p>
            <ul>
              <li>IP address and approximate geographic location.</li>
              <li>Browser type, operating system, and device identifiers.</li>
              <li>Pages viewed, features used, and time spent on the platform.</li>
              <li>Referring URLs and search terms that led you to DareMe.</li>
            </ul>
          </Subsection>
        </Section>

        <Section id="how-we-use" title="2. How We Use Your Information">
          <p>We use the information we collect for the following purposes:</p>
          <ul>
            <li><strong>To provide and improve the service:</strong> operating the platform, processing dare submissions, facilitating payments, and enhancing features.</li>
            <li><strong>Account management:</strong> creating and maintaining your account, authenticating logins, and sending account-related notifications.</li>
            <li><strong>Safety and moderation:</strong> reviewing reported content, investigating violations, and enforcing our community guidelines.</li>
            <li><strong>Communications:</strong> sending transactional emails (submission updates, reward confirmations) and, with your consent, product newsletters.</li>
            <li><strong>Analytics:</strong> understanding how users interact with the platform in order to improve performance and user experience.</li>
            <li><strong>Legal compliance:</strong> meeting our legal obligations and resolving disputes.</li>
          </ul>
        </Section>

        <Section id="information-sharing" title="3. Information Sharing">
          <p>We do not sell your personal data. We may share your information only in the following limited circumstances:</p>
          <ul>
            <li><strong>Service providers:</strong> trusted third-party vendors who help us operate the platform (e.g., cloud hosting, payment processors, email delivery) under strict confidentiality agreements.</li>
            <li><strong>Public content:</strong> dare titles, categories, and creator usernames are visible to other users and may be indexed by search engines. Submission videos/images are visible to the dare creator and moderators.</li>
            <li><strong>Legal requirements:</strong> when required by law, court order, or to protect the rights and safety of our users or the public.</li>
            <li><strong>Business transfers:</strong> in connection with a merger, acquisition, or sale of assets, where the acquiring entity agrees to honour this policy.</li>
          </ul>
        </Section>

        <Section id="data-security" title="4. Data Security">
          <p>
            We implement industry-standard security measures including TLS encryption for data in
            transit, hashed passwords, and access controls to protect your personal information.
            However, no method of transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>
          <p className="mt-3">
            If you suspect unauthorised access to your account, please contact us immediately at{" "}
            <a href="mailto:security@dareme.app" className="text-violet-600 dark:text-violet-400 hover:underline">
              security@dareme.app
            </a>.
          </p>
        </Section>

        <Section id="your-rights" title="5. Your Rights">
          <p>Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul>
            <li><strong>Access:</strong> request a copy of the personal data we hold about you.</li>
            <li><strong>Correction:</strong> request correction of inaccurate or incomplete data.</li>
            <li><strong>Deletion:</strong> request deletion of your account and associated personal data, subject to legal retention requirements.</li>
            <li><strong>Portability:</strong> receive your data in a structured, machine-readable format.</li>
            <li><strong>Opt-out of marketing:</strong> unsubscribe from promotional emails at any time via the link in each email.</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:privacy@dareme.app" className="text-violet-600 dark:text-violet-400 hover:underline">
              privacy@dareme.app
            </a>.
          </p>
        </Section>

        <Section id="cookies" title="6. Cookies & Tracking">
          <p>
            We use cookies and similar tracking technologies to maintain your session, remember
            your preferences (such as theme and language), and analyse platform usage.
          </p>
          <ul>
            <li><strong>Essential cookies:</strong> required for the platform to function (authentication, session management).</li>
            <li><strong>Preference cookies:</strong> remember your theme (light/dark) and language settings.</li>
            <li><strong>Analytics cookies:</strong> help us understand how the platform is used so we can improve it.</li>
          </ul>
          <p className="mt-3">
            You can control cookies through your browser settings. Disabling essential cookies may
            affect platform functionality.
          </p>
        </Section>

        <Section id="third-party" title="7. Third-Party Services">
          <p>
            DareMe may contain links to third-party websites or integrate third-party services.
            This Privacy Policy does not apply to those services. We encourage you to review
            the privacy policies of any third-party services you interact with through our platform.
          </p>
        </Section>

        <Section id="children" title="8. Children's Privacy">
          <p>
            DareMe is not directed to individuals under the age of 16. We do not knowingly
            collect personal information from children. If we learn that we have inadvertently
            collected information from a child under 16, we will delete it promptly. If you
            believe a child has provided us with personal information, contact us at{" "}
            <a href="mailto:privacy@dareme.app" className="text-violet-600 dark:text-violet-400 hover:underline">
              privacy@dareme.app
            </a>.
          </p>
        </Section>

        <Section id="changes" title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we will revise the
            "Last updated" date at the top of this page and, where the changes are significant,
            notify you by email or a prominent notice within the platform. Your continued use of
            DareMe after changes are posted constitutes acceptance of the updated policy.
          </p>
        </Section>

        <Section id="contact" title="10. Contact Us">
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:</p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-1 text-sm">
            <p className="font-semibold text-gray-900 dark:text-white">DareMe Privacy Team</p>
            <p className="text-gray-600 dark:text-gray-400">
              Email:{" "}
              <a href="mailto:privacy@dareme.app" className="text-violet-600 dark:text-violet-400 hover:underline">
                privacy@dareme.app
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">Website: dareme.app</p>
          </div>
        </Section>

      </div>

      {/* Bottom nav */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline font-medium">
          ← Back to DareMe
        </Link>
        <Link href="/terms" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          Terms & Conditions →
        </Link>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────

function Section({
  id, title, children,
}: {
  id: string; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-100 dark:border-gray-800">
        {title}
      </h2>
      <div className="space-y-3 text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
        {children}
      </div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
