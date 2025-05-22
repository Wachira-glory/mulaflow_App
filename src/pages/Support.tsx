
import React, { useState } from 'react';
import { toast } from 'sonner';
import Sidebar from '@/components/sidebar';
import Header from '@/components/header';
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HelpCircle, FileText, MessageSquare, PhoneCall } from 'lucide-react';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted successfully! We will get back to you soon.');
    setSubject('');
    setMessage('');
  };

  const faqItems = [
    {
      question: 'How do I connect a payment method?',
      answer: 'To connect a payment method, go to Settings > Withdraw/Settlement > Payment Methods and click on "Add Bank Account". Follow the guided process to add your preferred payment method.'
    },
    {
      question: 'How long do payouts take to process?',
      answer: 'Payouts are typically processed within 1-3 business days, depending on your bank. Bank transfers may take additional time to appear in your account.'
    },
    {
      question: 'What payment methods do you support?',
      answer: 'We currently support M-PESA, credit/debit cards, bank transfers, and digital wallets like PayPal and Stripe. More payment options are being added regularly.'
    },
    {
      question: 'How do I generate a payment link?',
      answer: 'To generate a payment link, go to the Pay In section and select your preferred payment method. Fill in the required details and click on "Generate Payment Link".'
    },
    {
      question: 'Is there a transaction fee?',
      answer: 'Yes, transaction fees vary based on your plan and payment method. You can view your current transaction fees in the Billings section under your current plan.'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">Support</h1>
            
            <Tabs defaultValue="get-help" className="mb-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="get-help">Get Help</TabsTrigger>
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
              
              <TabsContent value="get-help">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>
                      Need help? Submit a ticket and our support team will assist you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitTicket} className="space-y-6">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="What do you need help with?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Please provide details about your issue"
                          className="min-h-[150px]"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        />
                      </div>
                      <div className="pt-2">
                        <Button type="submit" className="bg-blue-700 hover:bg-blue-800">
                          Submit Ticket
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex items-center">
                      <PhoneCall className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium">Call us</p>
                        <p className="text-sm text-gray-500">+254 700 000 000</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium">Live Chat</p>
                        <p className="text-sm text-gray-500">Available 9am - 5pm EAT</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-blue-600 mr-2" />
                      <div>
                        <p className="font-medium">Email Support</p>
                        <p className="text-sm text-gray-500">support@mulaflow.com</p>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="faq">
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                    <CardDescription>
                      Find quick answers to common questions about using Mulaflow.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {faqItems.map((item, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                          <div className="flex items-start">
                            <HelpCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <div>
                              <h3 className="font-medium">{item.question}</h3>
                              <p className="text-gray-600 mt-1">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline">View All FAQs</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="documentation">
                <Card>
                  <CardHeader>
                    <CardTitle>Documentation</CardTitle>
                    <CardDescription>
                      Browse our documentation to learn more about Mulaflow features and integrations.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Getting Started Guide</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          Learn the basics of setting up your account and processing your first payment.
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Read Guide</Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">API Documentation</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          Detailed information about our APIs for developers and technical integration.
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Explore API Docs</Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Payment Methods Guide</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          Learn about all supported payment methods and how to use them effectively.
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Guide</Button>
                        </CardFooter>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">Security Best Practices</CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm">
                          Recommended practices for keeping your account and transactions secure.
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Learn More</Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Support;
