import Link from "next/link";

const LAST_UPDATED = "March 27, 2026";

const sections = [
  { id: "acceptance",       title: "1. Acceptance of Terms"          },
  { id: "eligibility",      title: "2. Eligibility"                  },
  { id: "accounts",         title: "3. Account Registration"         },
  { id: "dare-rules",       title: "4. Dare Content Rules"           },
  { id: "submissions",      title: "5. Submission Guidelines"        },
  { id: "rewards",          title: "6. Rewards & Payments"           },
  { id: "ip",               title: "7. Intellectual Property"        },
  { id: "prohibited",       title: "8. Prohibited Activities"        },
  { id: "termination",      title: "9. Account Termination"          },
  { id: "disclaimers",      title: "10. Disclaimers"                 },
  { id: "liability",        title: "11. Limitation of Liability"     },
  { id: "governing-law",    title: "12. Governing Law"               },
  { id: "contact",          title: "13. Contact Us"                  },
];

export default function TermsPage() {
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
          📋 Legal
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Last updated: <span className="font-medium text-gray-700 dark:text-gray-300">{LAST_UPDATED}</span>
        </p>
        <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          Welcome to DareMe. These Terms & Conditions govern your access to and use of the DareMe
          platform, including our website, services, and all associated content. By using DareMe,
          you agree to be bound by these terms. If you do not agree, please do not use the platform.
        </p>
      </div>

      {/* Table of contents */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 mb-10">
        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-3">
          Contents
        </p>
        <ul className="space-y-1.5 columns-2 gap-4">
          {sections.map((s) => (
            <li key={s.id} className="break-inside-avoid">
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
      <div className="space-y-12">

        <Section id="acceptance" title="1. Acceptance of Terms">
          <p>
            By accessing or using DareMe, you confirm that you have read, understood, and agree to
            be bound by these Terms & Conditions and our{" "}
            <Link href="/privacy" className="text-violet-600 dark:text-violet-400 hover:underline">
              Privacy Policy
            </Link>
            . These terms apply to all visitors, registered users, and any other person who accesses
            or uses our service.
          </p>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the platform
            after changes are published constitutes your acceptance of the revised terms.
          </p>
        </Section>

        <Section id="eligibility" title="2. Eligibility">
          <p>To use DareMe, you must:</p>
          <ul>
            <li>Be at least <strong>16 years of age</strong> (or the minimum age of digital consent in your country, whichever is higher).</li>
            <li>Have the legal capacity to enter into a binding agreement.</li>
            <li>Not be prohibited from using the service under applicable laws.</li>
            <li>Not have a previously suspended or banned DareMe account.</li>
          </ul>
          <p>
            Users under 18 must have parental or guardian consent before registering. By creating
            an account, you represent that you meet all eligibility requirements.
          </p>
        </Section>

        <Section id="accounts" title="3. Account Registration">
          <p>
            To access certain features of DareMe, you must create an account. When registering, you agree to:
          </p>
          <ul>
            <li>Provide accurate, current, and complete information.</li>
            <li>Keep your login credentials confidential and not share them with others.</li>
            <li>Notify us immediately of any unauthorised use of your account.</li>
            <li>Be responsible for all activity that occurs under your account.</li>
          </ul>
          <p>
            We reserve the right to refuse registration, cancel accounts, or remove content at our
            sole discretion, particularly in cases of policy violations.
          </p>
        </Section>

        <Section id="dare-rules" title="4. Dare Content Rules">
          <p>
            When creating a dare, you are solely responsible for its content. All dares must comply
            with the following rules:
          </p>
          <ul>
            <li><strong>Safe:</strong> Dares must not require activities that could cause physical harm, injury, or endanger the participant or bystanders.</li>
            <li><strong>Legal:</strong> Dares must not involve illegal activities, trespassing, theft, harassment, or any criminal act.</li>
            <li><strong>Respectful:</strong> Dares must not target individuals based on protected characteristics or be designed to humiliate or degrade.</li>
            <li><strong>Age-appropriate:</strong> Dares must be suitable for a general audience unless explicitly marked otherwise in designated adult categories.</li>
            <li><strong>Privacy-respecting:</strong> Dares must not require participants to violate another person's privacy or record individuals without consent.</li>
          </ul>
          <p>
            DareMe reserves the right to remove any dare that violates these rules without prior notice
            and to take further action against the posting user.
          </p>
        </Section>

        <Section id="submissions" title="5. Submission Guidelines">
          <p>
            When submitting proof of dare completion, you confirm that:
          </p>
          <ul>
            <li>The submission is your own original content and you have the right to share it.</li>
            <li>The content accurately documents your completion of the dare.</li>
            <li>Any individuals visible in videos or images have consented to being recorded and shared.</li>
            <li>The content does not contain nudity, explicit material, hate speech, graphic violence, or other prohibited material.</li>
          </ul>
          <p>
            By submitting content, you grant DareMe a non-exclusive, royalty-free, worldwide licence
            to use, display, and distribute your submission for platform operations and promotional purposes,
            subject to your privacy settings.
          </p>
        </Section>

        <Section id="rewards" title="6. Rewards & Payments">
          <ul>
            <li><strong>Reward amounts</strong> are set by the dare creator at the time of posting and are binding.</li>
            <li><strong>Payment</strong> is released to the participant only after the dare creator approves the submitted proof.</li>
            <li><strong>Disputes</strong> between dare creators and participants may be escalated to DareMe moderation for review. DareMe's decision in disputes is final.</li>
            <li><strong>Payout processing</strong> is handled by third-party payment providers. Processing times may vary.</li>
            <li><strong>Taxes:</strong> Users are responsible for reporting and paying any taxes applicable to rewards received through the platform.</li>
            <li>DareMe reserves the right to withhold or reverse payments in cases of fraud, policy violations, or chargebacks.</li>
          </ul>
        </Section>

        <Section id="ip" title="7. Intellectual Property">
          <p>
            The DareMe name, logo, design, and all platform software are the intellectual property
            of DareMe and are protected by applicable copyright, trademark, and other intellectual
            property laws.
          </p>
          <p>
            You retain ownership of content you post (dares, submissions, comments). By posting
            content on DareMe, you grant us the licence described in Section 5. You must not reproduce,
            distribute, or create derivative works from DareMe's proprietary materials without
            written permission.
          </p>
        </Section>

        <Section id="prohibited" title="8. Prohibited Activities">
          <p>You agree not to engage in any of the following activities:</p>
          <ul>
            <li>Posting dares or submissions that violate any applicable law.</li>
            <li>Impersonating another user, person, or organisation.</li>
            <li>Attempting to gain unauthorised access to other accounts or our systems.</li>
            <li>Using automated scripts, bots, or scrapers to access the platform.</li>
            <li>Interfering with or disrupting the integrity or performance of the platform.</li>
            <li>Creating multiple accounts to circumvent bans or restrictions.</li>
            <li>Engaging in any fraudulent activity, including fake submissions or manipulation of reward systems.</li>
            <li>Harassing, threatening, or abusing other users.</li>
          </ul>
          <p>
            Violation of any prohibited activity may result in immediate account suspension or
            termination, and may be referred to law enforcement where appropriate.
          </p>
        </Section>

        <Section id="termination" title="9. Account Termination">
          <p>
            DareMe may suspend or terminate your account at any time, with or without notice, for
            reasons including but not limited to:
          </p>
          <ul>
            <li>Violation of these Terms & Conditions.</li>
            <li>Fraudulent, deceptive, or harmful activity.</li>
            <li>Extended periods of account inactivity.</li>
            <li>Requests from law enforcement or legal obligations.</li>
          </ul>
          <p>
            You may also delete your account at any time through your account settings. Upon
            termination, your right to access the platform ceases immediately. Pending rewards
            may be forfeited upon termination for cause.
          </p>
        </Section>

        <Section id="disclaimers" title="10. Disclaimers">
          <p>
            DareMe is provided on an <strong>"as is" and "as available"</strong> basis without
            warranties of any kind, express or implied. We do not warrant that:
          </p>
          <ul>
            <li>The platform will be uninterrupted, error-free, or secure.</li>
            <li>Any defects or errors will be corrected.</li>
            <li>The platform or its servers are free from viruses or harmful components.</li>
          </ul>
          <p>
            DareMe is not responsible for the content, accuracy, or safety of user-generated
            dares. We encourage all participants to exercise good judgement before accepting
            any dare.
          </p>
        </Section>

        <Section id="liability" title="11. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, DareMe and its affiliates, directors, employees,
            and agents shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of the platform, including but not limited to:
          </p>
          <ul>
            <li>Personal injury resulting from participation in a dare.</li>
            <li>Loss of earnings, data, or business.</li>
            <li>Unauthorised access to your account or data.</li>
          </ul>
          <p>
            Our total liability to you for any claim arising out of or relating to these terms or
            your use of the platform shall not exceed the amount you paid to DareMe (if any) in
            the twelve months preceding the claim.
          </p>
        </Section>

        <Section id="governing-law" title="12. Governing Law">
          <p>
            These Terms & Conditions shall be governed by and construed in accordance with the laws
            of the jurisdiction in which DareMe is registered, without regard to its conflict-of-law
            provisions. Any disputes arising under or in connection with these terms shall be
            subject to the exclusive jurisdiction of the courts of that jurisdiction.
          </p>
          <p>
            If any provision of these terms is found to be unenforceable, the remaining provisions
            will remain in full force and effect.
          </p>
        </Section>

        <Section id="contact" title="13. Contact Us">
          <p>If you have questions about these Terms & Conditions, please reach out:</p>
          <div className="mt-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-5 space-y-1 text-sm">
            <p className="font-semibold text-gray-900 dark:text-white">DareMe Legal Team</p>
            <p className="text-gray-600 dark:text-gray-400">
              Email:{" "}
              <a href="mailto:legal@dareme.app" className="text-violet-600 dark:text-violet-400 hover:underline">
                legal@dareme.app
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">Website: dareme.app</p>
          </div>
        </Section>

      </div>

      {/* Bottom nav */}
      <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link href="/privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          ← Privacy Policy
        </Link>
        <Link href="/" className="text-sm text-violet-600 dark:text-violet-400 hover:underline font-medium">
          Back to DareMe →
        </Link>
      </div>
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
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
