'use client';
import React, { useState } from 'react'
import { BrandBrief } from '../types';
import { useForm } from 'react-hook-form';

interface Props{
    brandBrief: BrandBrief | null
    setBrandBrief: (brief: BrandBrief)=> void
    onNext: ()=> void
}

const templates={
    fitness:{
        name:'Fitlife Campaign',
        category:'Fitness',
        budget:200000,
        locations:['Mumbai','Delhi'],
        ageRange: [18,30] as [number,number],
        goals:['awareness','motivational'],
        tone:['energetic','motivational'],
        platforms:['Instagram','Youtube']
    },
    tech:{
        name:'TechLaunch Campaign',
        category:'Technology',
        budget:350000,
        locations:['Bengaluru','Hyderabad'],
        ageRange: [22,35] as [number,number],
        goals:['signups','conversions'],
        tone:['informative','professional'],
        platforms:['LinkedIn','Youtube']
    }
}

export default function BrandBriefForm({brandBrief,setBrandBrief,onNext}: Props) {
    const {register,handleSubmit,setValue,watch,formState:{errors}}=useForm<BrandBrief>({
        defaultValues:brandBrief || undefined
    })
    const [selectedTemplate, setSelectedTemplate] = useState<string>('')
    const applyTemplate = (templateKey: string)=>{
        const template = templates[templateKey as keyof typeof templates]
        Object.entries(template).forEach(([key,value])=>{
            setValue(key as keyof BrandBrief,value)
        })
        setSelectedTemplate(templateKey)
    }
    const onSubmit=(data:BrandBrief)=>{
        setBrandBrief(data)
        onNext()
    }
  return (
    <div className="max-w-4xl mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold mb-6">Create Brand Brief</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Quick Templates</h3>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => applyTemplate('fitness')}
              className={`btn-secondary ${selectedTemplate === 'fitness' ? 'bg-primary-100 border-primary-500' : ''}`}
            >
              Fitness Campaign
            </button>
            <button
              type="button"
              onClick={() => applyTemplate('tech')}
              className={`btn-secondary ${selectedTemplate === 'tech' ? 'bg-primary-100 border-primary-500' : ''}`}
            >
              Tech Campaign
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Campaign Name</label>
              <input
                {...register('name', { required: 'Campaign name is required' })}
                className="input-field"
                placeholder="Enter campaign name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select {...register('category', { required: 'Category is required' })} className="input-field">
                <option value="">Select category</option>
                <option value="Fashion">Fashion</option>
                <option value="Technology">Technology</option>
                <option value="Food">Food</option>
                <option value="Fitness">Fitness</option>
                <option value="Fintech">Fintech</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
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
              <label className="block text-sm font-medium mb-2">Target Locations</label>
              <div className="grid grid-cols-2 gap-2">
                {['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata'].map(location => (
                  <label key={location} className="flex items-center">
                    <input
                      {...register('locations')}
                      type="checkbox"
                      value={location}
                      className="mr-2"
                    />
                    {location}
                  </label>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Age Range</label>
              <div className="flex items-center gap-4">
                <input
                  {...register('ageRange.0', { required: true, min: 13, max: 65 })}
                  type="number"
                  placeholder="Min age"
                  className="input-field w-24"
                />
                <span>to</span>
                <input
                  {...register('ageRange.1', { required: true, min: 13, max: 65 })}
                  type="number"
                  placeholder="Max age"
                  className="input-field w-24"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Goals</label>
              <div className="space-y-2">
                {['awareness', 'engagement', 'installs', 'signups', 'sales', 'conversions'].map(goal => (
                  <label key={goal} className="flex items-center">
                    <input
                      {...register('goals')}
                      type="checkbox"
                      value={goal}
                      className="mr-2"
                    />
                    {goal.charAt(0).toUpperCase() + goal.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Tone</label>
              <div className="space-y-2">
                {['energetic', 'fun', 'informative', 'professional', 'casual', 'trustworthy'].map(tone => (
                  <label key={tone} className="flex items-center">
                    <input
                      {...register('tone')}
                      type="checkbox"
                      value={tone}
                      className="mr-2"
                    />
                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            
            <div >
              <label className="block text-sm font-medium mb-2">Platforms</label>
              <div className="space-y-2">
                {['Instagram', 'YouTube', 'LinkedIn', 'Twitter', 'TikTok'].map(platform => (
                  <label key={platform} className="flex items-center">
                    <input
                      {...register('platforms')}
                      type="checkbox"
                      value={platform}
                      className="mr-2"
                    />
                    {platform}
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn-primary">
              Continue to Matching
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
