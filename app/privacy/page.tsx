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

### Disclosure
Matty's use and transfer to any other app of information received from Google APIs will adhere to the Google API Services User Data Policy, including the Limited Use requirements. For more details, please visit the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy).

### Information We Collect

We may collect information about you in a variety of ways. The information we may collect on the Site includes:

1. **Personal Data**
   - Personally identifiable information, such as your name, email address, session data and profile picture that you voluntarily give to us when you register on the Site or when you choose to participate in various activities related to the Site.

2. **Usage Data** 
   - The Site stores data related to your usage of the web app, including but not limited to the pages you visit, the features you use, and the time spent on the app. This data is used to improve the functionality of the app and to provide you with a better user experience.

3. **User Interaction Data**
   - The Site may collect information about how you interact with the app, such as the queries you make, the responses you receive, and the actions you take. This data is used to improve the app's performance and to provide you with more relevant information.

### Use of Your Information

Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:

- Create and manage your account.
- Provide, operate, and maintain our Services.
- Improve, personalize, and expand our Services.
- Understand and analyze how you use our Site and Services.
- Develop new products, services, features, and functionality.
- Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Service, and for marketing and promotional purposes.
- Send you information about new features and services.
- Monitor and analyze usage and trends to improve your experience with the Site and Services.
- Request feedback and contact you about your use of the Site and Services.
- Resolve disputes and troubleshoot problems.
- Respond to product and customer service requests.
- Manage our everyday business needs such as website administration, analytics, fraud prevention, and enforcement of our corporate reporting obligations and Terms of Service or to comply with the law.


### Security & Storage of Your Information

We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other types of misuse.

When you chat with the app, your queries may be sent to OpenAI GPT-4 API or other third-party services to provide you with relevant information. These services may store your queries and responses for training purposes.

### Your Consent

By using our Site and Services, you consent to our Privacy Policy.

### Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

This privacy policy was last updated on 22nd July, 2024.`}
      </ReactMarkdown>
        
      <Footer />
    </main>
  )
}