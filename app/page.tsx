'use client';

import { useState } from "react";
import { BrandBrief } from "./types";
import BrandBriefForm from "./components/BrandBriefForm";
import MatchConsole from "./components/MatchConsole";
import BillingFlow from "./components/BillingFlow";
import HomePage from "./components/HomePage";

export default function Home() {
  const [currentStep, setCurrentStep] = useState(-1)
  const [brandBrief, setBrandBrief] = useState<BrandBrief | null>(null)
  const steps = [
    {name:'Brand Brief', component: BrandBriefForm },
    {name:'Match Console', component: MatchConsole },
    {name:'Billing & Payout', component: BillingFlow }
  ]
  if(currentStep===-1){
    return <HomePage onGetStarted={()=> setCurrentStep(0)} />
  }
  const CurrentComponent = steps[currentStep].component
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-3 sm:py-0">
            <h1 className="text=xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-0 text-center sm:text-left sm:font-bold">Taag Media</h1>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {steps.map((step,index)=>(
                <button key={step.name} onClick={()=> setCurrentStep(index)} className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base transition-colors ${
                    index === currentStep
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}>{step.name}</button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6  sm:py-8">
        <CurrentComponent 
        brandBrief={brandBrief}
        setBrandBrief={setBrandBrief}
        onNext={()=> setCurrentStep(prev=>Math.min(prev+1,steps.length-1))}
        />
      </main>
    </div>
  );
}
