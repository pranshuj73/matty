import Footer from "@/components/landing/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
  return (
    <main className="p-4 py-10 flex flex-col items-center justify-center">
      <ReactMarkdown className="prose dark:prose-invert prose-sm md:prose-base flex flex-col max-w-screen-md" remarkPlugins={[remarkGfm]}>
      {`## Privacy Policy for Hey Matty

**Effective Date:** 20th July, 2024

### Introduction

Matty ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website https://heymatty.vercel.app (the "Site") and our services (the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.

### Information We Collect

We may collect information about you in a variety of ways. The information we may collect on the Site includes:

1. **Personal Data**
   - Personally identifiable information, such as your name, email address, and phone number, that you voluntarily give to us when you register on the Site or when you choose to participate in various activities related to the Site and our Services, such as chat, message boards, or newsletters.

2. **Derivative Data**
   - Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.

3. **Financial Data**
   - Financial information, such as data related to your payment method (e.g., valid credit card number, card brand, expiration date) that we may collect when you purchase, order, return, exchange, or request information about our Services from the Site.

### Use of Your Information

Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:

- Create and manage your account.
- Process your transactions and send you related information, including purchase confirmations and invoices.
- Provide, operate, and maintain our Services.
- Improve, personalize, and expand our Services.
- Understand and analyze how you use our Site and Services.
- Develop new products, services, features, and functionality.

- Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.
- Send you information about new features and services.
- Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.
- Process payments and refunds.
- Monitor and analyze usage and trends to improve your experience with the Site and Services.
- Request feedback and contact you about your use of the Site and Services.
- Resolve disputes and troubleshoot problems.
- Respond to product and customer service requests.
- Deliver targeted advertising, coupons, newsletters, and other information regarding promotions and the Site and Services to you.
- Assist law enforcement and respond to subpoenas.
- Manage our everyday business needs such as website administration, analytics, fraud prevention, and enforcement of our corporate reporting obligations and Terms of Service or to comply with the law.

### Disclosure of Your Information

We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

1. **By Law or to Protect Rights**
   - If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

2. **Business Transfers**
   - We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.

3. **Third-Party Service Providers**
   - We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.

4. **Marketing Communications**
   - With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes, as permitted by law.

5. **Third-Party Advertisers**
   - We may use third-party advertising companies to serve ads when you visit the Site and Services. These companies may use information about your visits to the Site and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.

6. **Affiliates**
   - We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.

7. **Business Partners**
   - We may share your information with our business partners to offer you certain products, services, or promotions.

8. **Other Third Parties**
    - We may share your information with advertisers and investors for the purpose of conducting general business analysis. We may also share your information with such third parties for marketing purposes, as permitted by law.

### Security of Your Information

We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other types of misuse.

### Policy for Children

We do not knowingly solicit information from or market to children under the age of 13. If we learn that we have collected personal information from a child under age 13 without verification of parental consent, we will delete that information as quickly as possible. If you believe we might have any information from or about a child under 13, please contact us at hello@pranshujha.com.

### Controls for Do-Not-Track Features

Most web browsers and some mobile operating systems include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.

### Your Consent

By using our Site and Services, you consent to our Privacy Policy.

### Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.`}
      </ReactMarkdown>
        
      <Footer />
    </main>
  )
}