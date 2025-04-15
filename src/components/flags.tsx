import React from 'react'

export function getCountryFlag(countryCode: string) {
  // Special handling for EUR/EU
  if (countryCode === "EUR") countryCode = "eu"
  
  const code = countryCode.toLowerCase()
  return (
    <img 
      src={`https://hatscripts.github.io/circle-flags/flags/${code}.svg`}
      width="24"
      height="24"
      alt={`${countryCode} flag`}
    />
  )
} 