import { JobListing } from './types';

export function findMatchingJob(query: string, listings: JobListing[]): JobListing | null {
    const normalizedQuery = query.toLowerCase().replace(/[^a-z0-9\s]/g, '')
    const queryTokens = normalizedQuery.split(/\s+/)

  // next: score each listing against queryTokens
    let bestMatch: JobListing | null = null
    let bestScore = 0; 

    listings.forEach((listing) => { 
          // 1. normalize the listing's title + jurisdiction
        const listingText = (listing.title + ' ' + listing.jurisdiction)
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        const listingTokens = listingText.split(/\s+/)

          // 2. count how many queryTokens appear in listingTokens
        let score = 0;
        queryTokens.forEach((token) => {
            if(listingTokens.includes(token)) score++
        })
          // 3. if this score beats the current best, update bestMatch
        if(score > bestScore) {
            bestScore = score
            bestMatch = listing
        }
    }) 
    return bestMatch
}