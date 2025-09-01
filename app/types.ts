export interface BrandBrief {
    name: string
    category:string
    budget:number
    locations: string[]
    ageRange:[number,number]
    goals:string[]
    tone:string[]
    platforms:string[]
}
export interface Creator {
    _id: string
    handle:string
    verticals:string[]
    platforms: string[]
    audienceGeo: Record<string,number>
    audienceAge: Record<string,number>
    avgViews:number
    engagementRate:number
    pastBrandCategories:string[]
    contentTone: string[]
    safetyFlags:{
        adult:boolean
        controversial:boolean
    }
    basePriceINR:number
}
export interface MatchResult {
    creator: Creator
    score:number
    reasons:string[]
}
export interface BrandBilling {
    company: string
    gstin:string
    address:string
    email: string
    phone:string
    budget:number
    paymentMethod: string
}

export interface CreatorPayout {
    name: string
    pan:string
    upi:string
    bankAccount: string
    ifsc: string
    address: string
}