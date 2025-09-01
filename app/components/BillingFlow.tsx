'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BrandBilling, CreatorPayout } from '../types'
import { Download, Check } from 'lucide-react'

export default function BillingFlow() {
  const [activeTab, setActiveTab] = useState(0)
  const [brandBilling, setBrandBilling] = useState<BrandBilling | null>(null)
  const [creatorPayout, setCreatorPayout] = useState<CreatorPayout | null>(null)
  
  const validateGSTIN = (gstin: string) => {
    const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
    return gstinRegex.test(gstin) || 'Invalid GSTIN format'
  }
  
  const validatePAN = (pan: string) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/
    return panRegex.test(pan) || 'Invalid PAN format'
  }
  
  const validateIFSC = (ifsc: string) => {
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/
    return ifscRegex.test(ifsc) || 'Invalid IFSC format'
  }

  const BrandBillingForm = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<BrandBilling>()
    const budget = watch('budget')
    
    const onSubmit = (data: BrandBilling) => {
      setBrandBilling(data)
      setActiveTab(1)
    }

    const calculateGST = (amount: number) => {
      return amount * 0.18 // 18% GST
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Company Name</label>
            <input
              {...register('company', { required: 'Company name is required' })}
              className="input-field"
              placeholder="Enter company name"
            />
            {errors.company && <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">GSTIN</label>
            <input
              {...register('gstin', { 
                required: 'GSTIN is required',
                validate: validateGSTIN
              })}
              className="input-field"
              placeholder="22AAAAA0000A1Z5"
            />
            {errors.gstin && <p className="text-red-500 text-sm mt-1">{errors.gstin.message}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              className="input-field h-24"
              placeholder="Enter complete address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/,
                  message: 'Invalid email format'
                }
              })}
              type="email"
              className="input-field"
              placeholder="company@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              {...register('phone', { 
                required: 'Phone is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Invalid phone number'
                }
              })}
              className="input-field"
              placeholder="9876543210"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Budget (₹)</label>
            <input
              {...register('budget', { required: 'Budget is required', min: 1000 })}
              type="number"
              className="input-field"
              placeholder="Enter budget"
            />
            {errors.budget && <p className="text-red-500 text-sm mt-1">{errors.budget.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Payment Method</label>
            <select {...register('paymentMethod', { required: 'Payment method is required' })} className="input-field">
              <option value="">Select payment method</option>
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="net_banking">Net Banking</option>
              <option value="upi">UPI</option>
            </select>
            {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
          </div>
        </div>
        
        {budget && (
          <div className="card bg-blue-50 border border-blue-200">
            <h4 className="font-semibold mb-2">Tax Calculation</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{Number(budget).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%):</span>
                <span>₹{calculateGST(Number(budget)).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold border-t pt-1">
                <span>Total:</span>
                <span>₹{(Number(budget) + calculateGST(Number(budget))).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        
        <button type="submit" className="btn-primary w-full">
          Continue to Creator Payout
        </button>
      </form>
    )
  }

  const CreatorPayoutForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CreatorPayout>()
    
    const onSubmit = (data: CreatorPayout) => {
      setCreatorPayout(data)
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Creator Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="input-field"
              placeholder="Enter creator name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">PAN</label>
            <input
              {...register('pan', { 
                required: 'PAN is required',
                validate: validatePAN
              })}
              className="input-field"
              placeholder="ABCDE1234F"
            />
            {errors.pan && <p className="text-red-500 text-sm mt-1">{errors.pan.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">UPI ID</label>
            <input
              {...register('upi', { 
                required: 'UPI ID is required',
                pattern: {
                  value: /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/,
                  message: 'Invalid UPI ID format'
                }
              })}
              className="input-field"
              placeholder="user@paytm"
            />
            {errors.upi && <p className="text-red-500 text-sm mt-1">{errors.upi.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Bank Account</label>
            <input
              {...register('bankAccount', { 
                required: 'Bank account is required',
                pattern: {
                  value: /^[0-9]{9,18}$/,
                  message: 'Invalid account number'
                }
              })}
              className="input-field"
              placeholder="Enter account number"
            />
            {errors.bankAccount && <p className="text-red-500 text-sm mt-1">{errors.bankAccount.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">IFSC Code</label>
            <input
              {...register('ifsc', { 
                required: 'IFSC is required',
                validate: validateIFSC
              })}
              className="input-field"
              placeholder="HDFC0001234"
            />
            {errors.ifsc && <p className="text-red-500 text-sm mt-1">{errors.ifsc.message}</p>}
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">Address</label>
            <textarea
              {...register('address', { required: 'Address is required' })}
              className="input-field h-24"
              placeholder="Enter complete address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
          </div>
        </div>
        
        <button type="submit" className="btn-primary w-full">
          Complete Setup
        </button>
      </form>
    )
  }

  const Summary = () => {
    const downloadSummary = () => {
      const summaryData = {
        brandBilling,
        creatorPayout,
        timestamp: new Date().toISOString()
      }
      
      const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'billing-summary.json'
      a.click()
      URL.revokeObjectURL(url)
    }

    return (
      <div className="card">
        <div className="flex items-center gap-2 mb-6">
          <Check className="text-green-500" size={24} />
          <h3 className="text-xl font-semibold">Setup Complete!</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">Brand Billing Details</h4>
            {brandBilling && (
              <div className="space-y-2 text-sm">
                <p><strong>Company:</strong> {brandBilling.company}</p>
                <p><strong>GSTIN:</strong> {brandBilling.gstin}</p>
                <p><strong>Email:</strong> {brandBilling.email}</p>
                <p><strong>Phone:</strong> {brandBilling.phone}</p>
                <p><strong>Budget:</strong> ₹{brandBilling.budget.toLocaleString()}</p>
                <p><strong>GST:</strong> ₹{(brandBilling.budget * 0.18).toLocaleString()}</p>
                <p><strong>Total:</strong> ₹{(brandBilling.budget * 1.18).toLocaleString()}</p>
              </div>
            )}
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">Creator Payout Details</h4>
            {creatorPayout && (
              <div className="space-y-2 text-sm">
                <p><strong>Name:</strong> {creatorPayout.name}</p>
                <p><strong>PAN:</strong> {creatorPayout.pan}</p>
                <p><strong>UPI:</strong> {creatorPayout.upi}</p>
                <p><strong>Bank:</strong> {creatorPayout.bankAccount}</p>
                <p><strong>IFSC:</strong> {creatorPayout.ifsc}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-6 flex gap-4">
          <button onClick={downloadSummary} className="btn-primary flex items-center gap-2">
            <Download size={16} />
            Download Summary
          </button>
          <button onClick={() => window.print()} className="btn-secondary">
            Print Summary
          </button>
        </div>
      </div>
    )
  }

  const tabs = [
    { name: 'Brand Billing', completed: !!brandBilling },
    { name: 'Creator Payout', completed: !!creatorPayout }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab, index) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(index)}
              disabled={index === 1 && !brandBilling}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                index === activeTab
                  ? 'bg-white text-primary-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              } ${index === 1 && !brandBilling ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-center justify-center gap-2">
                {tab.completed && <Check size={16} className="text-green-500" />}
                {tab.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        {activeTab === 0 && <BrandBillingForm />}
        {activeTab === 1 && !creatorPayout && <CreatorPayoutForm />}
        {activeTab === 1 && creatorPayout && <Summary />}
      </div>
    </div>
  )
}