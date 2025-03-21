
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container py-8 px-4 md:py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Introduction</h2>
          <p className="mb-4">
            This Privacy Policy describes how Le Mans Ultimate Tracker ("we", "us", or "our") collects, uses, and shares your information when you use our website and services.
          </p>
          <p>
            By using the Le Mans Ultimate Tracker, you agree to the collection and use of information in accordance with this policy.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Information Collection and Use</h2>
          <p className="mb-4">
            While using our website, we may ask you to provide certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Username</li>
            <li>Racing statistics and performance data</li>
            <li>Usage data</li>
          </ul>
          <p>
            We collect this information for the purpose of providing our services, identifying and communicating with you, and improving our platform.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Log Data</h2>
          <p>
            When you visit our website, our servers may automatically log standard data provided by your web browser. This may include your computer's IP address, browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Cookies</h2>
          <p className="mb-4">
            We use cookies to collect information and improve our services. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our service.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Use of Data</h2>
          <p className="mb-4">
            Le Mans Ultimate Tracker uses the collected data for various purposes:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>To provide and maintain our service</li>
            <li>To notify you about changes to our service</li>
            <li>To provide customer support</li>
            <li>To provide analysis or valuable information so that we can improve the service</li>
            <li>To monitor the usage of the service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Data Security</h2>
          <p className="mb-4">
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Changes to This Privacy Policy</h2>
          <p className="mb-4">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2">
            <li>By email: support@lemanstracker.com</li>
          </ul>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground mt-8">
          Last updated: May 2025
        </p>
      </main>
      
      <footer className="border-t mt-auto">
        <div className="container px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            © 2025 Le Mans Ultimate Tracker by Daniel Buck. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
