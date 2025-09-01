'use client'

import { ArrowRight, Users, Target, CreditCard, Star, TrendingUp, Shield } from 'lucide-react'

interface Props {
  onGetStarted: () => void
}

export default function HomePage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-primary-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-primary-700/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                India's #1 Creator-Brand Matching Platform
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Connect Brands with 
                <span className="text-primary-600 block">Perfect Creators</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Discover, match, and collaborate with top content creators. Our AI-powered platform 
                finds the perfect influencers for your brand campaigns with precision scoring.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={onGetStarted}
                className="group bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                Start Matching Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-primary-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-50 transition-colors">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">10K+</div>
              <div className="text-gray-600 font-medium">Active Creators</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
              <div className="text-gray-600 font-medium">Brand Partners</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">95%</div>
              <div className="text-gray-600 font-medium">Match Accuracy</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2 group-hover:scale-110 transition-transform">₹50M+</div>
              <div className="text-gray-600 font-medium">Campaign Value</div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              How Taag Media Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines the entire process from creator discovery to campaign execution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Target className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Define Your Campaign</h3>
              <p className="text-gray-600 leading-relaxed">
                Tell us about your brand, campaign goals, target audience, and budget. Our smart form captures all the essential details.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI-Powered Matching</h3>
              <p className="text-gray-600 leading-relaxed">
                Our algorithm analyzes 40+ parameters including audience demographics, engagement rates, and content style to find perfect matches.
              </p>
            </div>

            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-200 transition-colors">
                <CreditCard className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Seamless Billing</h3>
              <p className="text-gray-600 leading-relaxed">
                Handle all financial aspects with our secure billing system. From brand invoicing to creator payouts, we've got it covered.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Choose Taag Media?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <TrendingUp className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Smart Matching Algorithm</h4>
                    <p className="text-gray-600">Advanced AI considers audience overlap, engagement quality, and brand safety for optimal matches.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <Shield className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Verified Creators</h4>
                    <p className="text-gray-600">All creators are vetted for authenticity, engagement quality, and brand safety standards.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mr-4 mt-1">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Transparent Pricing</h4>
                    <p className="text-gray-600">Clear pricing with no hidden fees. Automated billing and secure payouts for all parties.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
                <div className="bg-gradient-to-tr from-orange-400 via-orange-500  to-orange-700 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-44 h-44 bg-orange-300/40 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-yellow-400/30 rounded-full blur-2xl"></div>

                    <h3 className="text-3xl font-extrabold mb-6 drop-shadow-lg">
                    Ready to get started?
                    </h3>

                    <div className="space-y-5 mb-10">
                    {[
                        "✨ Create your campaign brief in 5 minutes",
                        "⚡ Get matched with top creators instantly",
                        "🚀 Launch your campaign within 24 hours",
                    ].map((text, i) => (
                        <div
                        key={i}
                        className="flex items-center bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md hover:bg-white/20 transition"
                        >
                        <span className="text-white text-lg">{text}</span>
                        </div>
                    ))}
                    </div>

                    <button
                    onClick={onGetStarted}
                    className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 w-full flex items-center justify-center gap-2"
                    >
                    Start Your Campaign
                    <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
                </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Join 500+ brands already using Taag Media
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Start your creator matching journey today
          </p>
          <button 
            onClick={onGetStarted}
            className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}