'use client';

import React, { useEffect, useState } from 'react'
import { BrandBrief, Creator, MatchResult } from '../types';
import { Filter, TrendingUp, Users } from 'lucide-react';

interface Props{
  brandBrief: BrandBrief | null;
  onNext: ()=>void;
}

const sampleCreators: Creator[]= [
    {
      "_id": "c1",
      "handle": "@fitwithria",
      "verticals": ["Fitness","Lifestyle"],
      "platforms": ["Instagram","YouTube"],
      "audienceGeo": {"Mumbai": 0.42, "Delhi": 0.2},
      "audienceAge": {"18-24": 0.55, "25-34": 0.35},
      "avgViews": 120000,
      "engagementRate": 0.047,
      "pastBrandCategories": ["Fashion","Wellness"],
      "contentTone": ["energetic","fun"],
      "safetyFlags": {"adult": false, "controversial": false},
      "basePriceINR": 80000
    },
    {
      "_id": "c2",
      "handle": "@techbyraj",
      "verticals": ["Technology","Education"],
      "platforms": ["YouTube","LinkedIn"],
      "audienceGeo": {"Bengaluru": 0.5, "Hyderabad": 0.2},
      "audienceAge": {"18-24": 0.25, "25-34": 0.5},
      "avgViews": 95000,
      "engagementRate": 0.032,
      "pastBrandCategories": ["EdTech","Fintech"],
      "contentTone": ["informative","serious"],
      "safetyFlags": {"adult": false, "controversial": false},
      "basePriceINR": 60000
    },
    {
      "_id": "c3",
      "handle": "@foodiesneha",
      "verticals": ["Food","Lifestyle"],
      "platforms": ["Instagram","Reels"],
      "audienceGeo": {"Delhi": 0.6, "Mumbai": 0.25},
      "audienceAge": {"18-24": 0.6, "25-34": 0.3},
      "avgViews": 150000,
      "engagementRate": 0.056,
      "pastBrandCategories": ["Food","Hospitality"],
      "contentTone": ["fun","casual"],
      "safetyFlags": {"adult": false, "controversial": false},
      "basePriceINR": 70000
    }
]

export default function MatchConsole({brandBrief, onNext}:Props) {
  const [matches, setMatches] = useState<MatchResult[]>([])
  const [filters, setFilters] = useState({
    minScore: 0,
    maxPrice: 100000,
    platforms: [] as string[],
    verticals: [] as string[]
  })
  const [showFilters, setShowFilters] = useState(false)
  useEffect(()=>{
    if(brandBrief) {
      const matchedCreators = calculateMatches(brandBrief, sampleCreators)
      setMatches(matchedCreators)
    }
  },[brandBrief])

  const calculateMatches = (brief: BrandBrief, creators: Creator[]): MatchResult[] =>{
    return creators.map(creator=>{
      let score = 0
      const reasons:string [] = []
      const categoryMatch = creator.verticals.some(v=> v.toLowerCase().includes(brief.category.toLowerCase()) || 
      creator.pastBrandCategories.some(c=> c.toLowerCase().includes(brief.category.toLowerCase()))
    )
    if(categoryMatch){
      score+=40
      reasons.push('Category match')
    }
    const locationOverlap = Object.keys(creator.audienceGeo).some(geo=> brief.locations.includes(geo)
    )
    if(locationOverlap){
      score+=15
      reasons.push('Location overlap')
    }
    const ageOverlap = Object.keys(creator.audienceAge).some(ageRange=> {
      const [min,max] =ageRange.split('-').map(Number)
        return (min>=brief.ageRange[0]&& min <= brief.ageRange[1]) ||
        (max>=brief.ageRange[0]&& max <= brief.ageRange[1])
    }
    )
    if(ageOverlap){
      score+=15
      reasons.push('Age demographic match')
    }
    if(creator.engagementRate>0.04){
      score+=10
      reasons.push('High engagement')
    }
    if(creator.basePriceINR<=brief.budget*0.3){
      score+=10
      reasons.push('Budget Friendly')
    }
    const platformMatch = creator.platforms.some(p=> brief.platforms.includes(p))
    if(platformMatch){
      score+=10
      reasons.push('Platform match')
    }
    return {
      creator, score:Math.min(100,score),reasons
    }
    }).sort((a,b)=>b.score-a.score)
  }
  const filteredMatches = matches.filter(match=>{
    if(match.score<filters.minScore) return false
    if(match.creator.basePriceINR>filters.maxPrice)
    if(filters.platforms.length> 0 && !filters.platforms.some(p=>match.creator.platforms.includes(p))) return false
    if(filters.verticals.length> 0 && !filters.verticals.some(v=>match.creator.verticals.includes(v))) return false
    return true
  })
  if (!brandBrief) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please complete the brand brief first</p>
      </div>
    )
  }
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Creator Matches</h2>
        <div className="flex gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary flex items-center gap-2"
          >
            <Filter size={16} />
            Filters
          </button>
          <button onClick={onNext} className="btn-primary">
            Proceed to Billing
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="card bg-gray-50">
          <h3 className="font-semibold mb-4">Filters</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Min Score</label>
              <input
                type="range"
                min="0"
                max="100"
                value={filters.minScore}
                onChange={(e) => setFilters(prev => ({ ...prev, minScore: Number(e.target.value) }))}
                className="w-full"
              />
              <span className="text-sm text-gray-600">{filters.minScore}</span>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Max Price (₹)</label>
              <input
                type="number"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6">
        {filteredMatches.map((match) => (
          <div key={match.creator._id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{match.creator.handle}</h3>
                <p className="text-gray-600">{match.creator.verticals.join(', ')}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{match.score}</div>
                  <div className="text-sm text-gray-600">Match Score</div>
                </div>
                <div className="w-32 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-primary-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${match.score}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-gray-500" />
                <span className="text-sm">{match.creator.avgViews.toLocaleString()} avg views</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={16} className="text-gray-500" />
                <span className="text-sm">{(match.creator.engagementRate * 100).toFixed(1)}% ER</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">₹{match.creator.basePriceINR.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {match.creator.platforms.map(platform => (
                <span key={platform} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
            
            <div>
              <p className="text-sm font-medium mb-2">Match Reasons:</p>
              <div className="flex flex-wrap gap-2">
                {match.reasons.map((reason, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {reason}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
