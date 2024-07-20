import Footer from "@/components/landing/Footer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Page() {
  return (
    <main className="p-4 py-10 flex flex-col items-center justify-center">
      <ReactMarkdown className="prose dark:prose-invert prose-sm md:prose-base flex flex-col max-w-screen-md" remarkPlugins={[remarkGfm]}>
        {`## Terms and Conditions for Using Matty

### 1. Acceptance of Terms
By accessing and using Matty ("the Service"), provided by Pranshu Jha ("the Provider"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, you should not use the Service.

### 2. Description of Service
Matty is a personal assistant designed to manage calendars, schedule events, provide daily planning, track goals, and more.

### 3. Eligibility
You must be a certain age or older to use the Services (at the age of 13 in the U.S., at the age of 16 in Europe, and at the age of 11 in Thailand). If you are under 18 you must have your parent or legal guardian’s permission to use the Services. If you use the Services on behalf of another person or entity, you must have the authority to accept the Terms on their behalf. You must provide accurate and complete information to register for an account. You may not make your access credentials or account available to others outside your organization, and you are responsible for all activities that occur using your credentials.

### 4. User Accounts
You may be required to create an account to use certain features of the Service. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify Pranshu Jha immediately of any unauthorized use of your account.

### 5. Privacy
Your privacy is important to us. Please review our [Privacy Policy](/privacy) to understand how we collect, use, and safeguard your information when you use the Service.

### 6. Use of the Service
You agree to use the Service only for lawful purposes. You are prohibited from:
- Using the Service to engage in any illegal or harmful activity.
- Attempting to gain unauthorized access to any part of the Service.
- Using the Service in a way that disrupts or interferes with its functionality.

### 7. Subscription and Fees
Certain features of Matty may require a subscription or payment of fees. All payments must be made through the payment methods provided by the Service. Subscriptions are subject to the terms and pricing specified at the time of purchase.

### 8. Modifications to the Service
Pranshu Jha reserves the right to modify or discontinue the Service, or any part thereof, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuation of the Service.

### 9. Termination
We may terminate or suspend your account and access to the Service at our sole discretion, without prior notice, for conduct that we believe violates these Terms or is harmful to other users of the Service, us, or third parties, or for any other reason.

### 10. Limitation of Liability
To the fullest extent permitted by applicable law, Pranshu Jha shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from:
- Your use of or inability to use the Service.
- Any unauthorized access to or use of our servers and/or any personal information stored therein.
- Any bugs, viruses, Trojan horses, or the like that may be transmitted to or through our Service by any third party.

### 11. Disclaimer of Warranties
The Service is provided on an "as is" and "as available" basis. Pranshu Jha makes no representations or warranties of any kind, express or implied, as to the operation of the Service or the information, content, materials, or products included on the Service.

### 12. Governing Law
These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Pranshu Jha operates, without regard to its conflict of law provisions.

### 13. Changes to Terms
We reserve the right to modify these Terms at any time. We will provide notice of changes by posting the new Terms on our website. Your continued use of the Service following the posting of changes constitutes your acceptance of such changes.

### 14. Contact Information
For any questions about these Terms, please contact us at hello@pranshujha.com.

By using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.`}
      </ReactMarkdown>
      
      <Footer />
    </main>
  )
}