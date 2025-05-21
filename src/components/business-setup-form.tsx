
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BusinessSetupFormProps {
  onSubmit: (formData: any) => void;
  isLoading?: boolean;
}

const BusinessSetupForm: React.FC<BusinessSetupFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState({
    businessName: '',
    industry: '',
    domain: '',
    billingPlan: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const billingPlans = [
    { value: 'starter', label: 'Starter - $29/mo' },
    { value: 'professional', label: 'Professional - $79/mo' },
    { value: 'enterprise', label: 'Enterprise - $199/mo' }
  ];

  const industries = [
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'saas', label: 'SaaS' },
    { value: 'marketplace', label: 'Marketplace' },
    { value: 'finance', label: 'Finance' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Business Setup</CardTitle>
          <CardDescription>Add your business details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="businessName" className="block text-gray-700">Business Name</label>
            <Input
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              className="bg-white"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="industry" className="block text-gray-700">Industry</label>
            <Input
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="bg-white"
              placeholder="Equity Bank"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="domain" className="block text-gray-700">Domain</label>
            <Input
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              className="bg-white"
              placeholder="yourdomain.com"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="billingPlan" className="block text-gray-700">Billing Plan</label>
            <Select onValueChange={handleSelectChange('billingPlan')} value={formData.billingPlan}>
              <SelectTrigger id="billingPlan" className="w-full bg-white">
                <SelectValue placeholder="Select billing plan" />
              </SelectTrigger>
              <SelectContent>
                {billingPlans.map(plan => (
                  <SelectItem key={plan.value} value={plan.value}>{plan.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BusinessSetupForm;
