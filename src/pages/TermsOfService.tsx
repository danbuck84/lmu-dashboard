
import React from 'react';
import Navigation from '@/components/Navigation';
import { Card } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="container py-8 px-4 md:py-12 flex-1">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to Le Mans Ultimate Tracker. These Terms of Service govern your use of our website and services offered by Le Mans Ultimate Tracker.
          </p>
          <p>
            By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">2. Accounts</h2>
          <p className="mb-4">
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.
          </p>
          <p className="mb-4">
            You are responsible for safeguarding the password that you use to access the service and for any activities or actions under your password.
          </p>
          <p>
            You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">3. Content</h2>
          <p className="mb-4">
            Our service allows you to post, link, store, share and otherwise make available certain information, text, graphics, or other material. You are responsible for the content that you post on or through the service, including its legality, reliability, and appropriateness.
          </p>
          <p className="mb-4">
            By posting content on or through our service, you represent and warrant that the content is yours and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms.
          </p>
          <p>
            We reserve the right to remove any content that violates these Terms or that we find objectionable for any reason, without prior notice.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">4. Intellectual Property</h2>
          <p className="mb-4">
            The service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Le Mans Ultimate Tracker and its licensors. The service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
          </p>
          <p>
            Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Le Mans Ultimate Tracker.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">5. Links To Other Web Sites</h2>
          <p className="mb-4">
            Our service may contain links to third-party web sites or services that are not owned or controlled by Le Mans Ultimate Tracker.
          </p>
          <p className="mb-4">
            Le Mans Ultimate Tracker has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Le Mans Ultimate Tracker shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy policies of any third-party web sites or services that you visit.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">6. Termination</h2>
          <p className="mb-4">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
          <p className="mb-4">
            Upon termination, your right to use the service will immediately cease. If you wish to terminate your account, you may simply discontinue using the service.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">7. Limitation Of Liability</h2>
          <p className="mb-4">
            In no event shall Le Mans Ultimate Tracker, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">8. Governing Law</h2>
          <p className="mb-4">
            These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
          </p>
          <p>
            Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">9. Changes</h2>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>
          <p>
            By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
          </p>
        </Card>
        
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us:
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

export default TermsOfService;
