import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div
    

     
    >
      {/* Header */}
      <div className='-mt-[45px] w-[1305px] -ml-[45px]'>
        
    
      <header className="flex bg-black items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden md:flex items-center space-x-8 text-white">
          <a href="#overview" className="hover:text-blue-300 transition-colors">Overview</a>
          <a href="#features" className="hover:text-blue-300 transition-colors">Features</a>
          <a href="#solutions" className="hover:text-blue-300 transition-colors">Solutions</a>
          <a href="#resources" className="hover:text-blue-300 transition-colors">Resources</a>
          <a href="#pricing" className="hover:text-blue-300 transition-colors">Pricing</a>
        </nav>

        <Button 
          onClick={() => navigate('/auth')}
          className="text-white bg-opacity-50 rounded-2xl hover:bg-white hover:text-slate-900 transition"
        >
          Get Started Now
        </Button>
      </header>
  
      {/* Hero Section */}
      <main id="overview" className="container mx-auto px-6 py-20 text-white bg-center bg-no-repeat hero-section">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Easily Monitor and Manage All
            <br />
            Your Transactions
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Fast, effective, and quality dashboard for tracking payments, disbursing transfers and managing business across multiple channels in one view.
          </p>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start for free
          </Button>
        </div>
      </main>
     </div> 


      {/* Features Section - Multiple Aggregation Sources */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-blue-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Aggregation Sources</h3>
              <p className="text-gray-600">Integrate with multiple payment providers and manage all transactions from one dashboard.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Built with TailwindCSS</h3>
              <p className="text-gray-600">Modern, responsive design built with the latest web technologies for optimal performance.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fully Responsive</h3>
              <p className="text-gray-600">Access your dashboard from any device with our fully responsive design.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Built to Power Smart Financial Decisions */}
      <section id="solutions" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Built to Power Smart Financial Decisions</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-pink-500 rounded"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Plug & Pay APIs</h3>
                  <p className="text-gray-600">Easy integration with our powerful APIs to start accepting payments in minutes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-green-500 rounded"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Custom Filters</h3>
                  <p className="text-gray-600">Advanced filtering options to analyze your transaction data effectively.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <div className="w-6 h-6 bg-blue-500 rounded"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Export & Reports</h3>
                  <p className="text-gray-600">Generate comprehensive reports and export data in multiple formats.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-lg shadow-xl p-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Dashboard</span>
                      <span className="text-xs text-gray-500">Live view</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white p-3 rounded">
                        <div className="text-xs text-gray-500">Revenue</div>
                        <div className="font-bold">KSh 45K</div>
                      </div>
                      <div className="bg-white p-3 rounded">
                        <div className="text-xs text-gray-500">Transactions</div>
                        <div className="font-bold">1,234</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section - Simplify Reconciliation, Improve Insights */}
      <section id="resources" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Simplify Reconciliation, Improve Insights</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Streamline your financial processes with automated reconciliation and powerful insights 
              that help you make informed business decisions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-gray-900 rounded-lg shadow-xl p-6 text-white">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Stay Informed with Alerts, Roles & Reports</h3>
                  <p className="text-gray-300 mb-6">
                    Get real-time notifications and detailed reports to keep your business running smoothly.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">12K+</div>
                    <div className="text-sm text-gray-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">500+</div>
                    <div className="text-sm text-gray-400">Daily Reports</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full mr-3"></div>
                        <span className="text-sm">Transaction Alert</span>
                      </div>
                      <span className="text-xs text-gray-400">2 min ago</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></div>
                        <span className="text-sm">Reconciliation Report</span>
                      </div>
                      <span className="text-xs text-gray-400">5 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Top Customers</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        A
                      </div>
                      <div>
                        <div className="font-medium">Anthony Joshua</div>
                        <div className="text-sm text-gray-500">Premium Customer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">KSh 45,000</div>
                      <div className="text-sm text-gray-500">This month</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        M
                      </div>
                      <div>
                        <div className="font-medium">Mary Johnson</div>
                        <div className="text-sm text-gray-500">Regular Customer</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">KSh 32,000</div>
                      <div className="text-sm text-gray-500">This month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Pricing & Plans</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get a free trial of all our features for business and enterprise users. 
              You don't have to pay until you go live.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">BASIC</h3>
              <div className="text-3xl font-bold mb-2">Ksh 5,000</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Basic Transaction
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Reports & Insights
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Support
                </li>
              </ul>
              <Button variant="outline" className="w-full">Start 14 Day Free Trial</Button>
            </div>
            
            <div className="bg-blue-600 text-white rounded-lg p-8 text-center relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-medium">
                POPULAR
              </div>
              <h3 className="text-xl font-semibold mb-4">STANDARD</h3>
              <div className="text-3xl font-bold mb-2">Ksh 15,000</div>
              <div className="text-blue-200 mb-6">per month</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  All Basic Features
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Real-time Analytics
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  Priority Support
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-3"></div>
                  API Access
                </li>
              </ul>
              <Button className="w-full bg-black text-blue-600 hover:bg-gray-100">
                Start 14 Day Free Trial
              </Button>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">PREMIUM</h3>
              <div className="text-3xl font-bold mb-2">Ksh 30,000</div>
              <div className="text-gray-500 mb-6">per month</div>
              <ul className="space-y-3 text-left mb-8">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  All Standard Features
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Unlimited Transactions
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Premium Support & Consultation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Custom Integrations
                </li>
              </ul>
              <Button variant="outline" className="w-full">Start 3 Day Free Trial</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" 
                  alt="Jonathan Taylor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="text-xl text-gray-700 mb-4">
                "This dashboard transformed how we manage payments. Everything we do, reconciled, and just works."
              </blockquote>
              <cite className="text-gray-600 font-medium">Jonathan Taylor</cite>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Start Tracking Smarter And Faster
          </h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Mulaflow for their payment processing and transaction management needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => navigate('/auth')}
              className=" text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              Watch Free tutorials
            </Button>
            <Button 
              onClick={() => navigate('/auth')}
              variant="outline" 
              className="text-black border-white hover:bg-white hover:text-blue-600 px-8 py-3"
            >
              Get Started Now   
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo variant="white" />
              <p className="text-gray-400 mt-2">© Mulaflow 2024. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white">Support</a>
              <a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a>
              <a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
