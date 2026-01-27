/**
 * TillerPro™ Configuration System
 * White-label, multi-tenant support for licensing
 * 
 * This file contains ALL customizable settings for TillerPro.
 * When licensing to other contractors, create a new config file
 * or use environment variables to override these defaults.
 * 
 * @version 2.0.0
 * @author Tillerstead LLC
 */

const TillerProConfig = {
  
  /**
   * Application Metadata
   */
  app: {
    name: 'TillerPro™',
    version: '2.0.0',
    environment: 'production', // development, staging, production
    
    // Multi-tenant support
    tenant: {
      id: 'tillerstead',
      name: 'Tillerstead LLC',
      type: 'master', // master, partner, enterprise, solo
      licenseKey: null, // Set when licensing to others
      expiresAt: null // License expiration (null = perpetual)
    }
  },
  
  /**
   * Company/Contractor Branding
   * WHITE-LABEL: Customize these for each licensee
   */
  company: {
    name: 'Tillerstead LLC',
    legalName: 'Tillerstead Limited Liability Company',
    tagline: 'TCNA-Certified Professional Tile Installation',
    description: 'New Jersey\'s premier tile installation specialists',
    
    license: {
      number: 'NJ HIC #13VH11902300',
      state: 'NJ',
      type: 'Home Improvement Contractor',
      issueDate: '2019-03-15',
      expiresAt: '2027-03-15'
    },
    
    contact: {
      phone: '(856) 555-0100',
      email: 'quotes@tillerstead.com',
      website: 'tillerstead.com',
      supportEmail: 'support@tillerstead.com'
    },
    
    address: {
      street: '123 Main Street',
      city: 'Cherry Hill',
      state: 'NJ',
      zip: '08002',
      country: 'USA'
    },
    
    social: {
      facebook: 'https://facebook.com/tillersteadllc',
      instagram: 'https://instagram.com/tillerstead',
      linkedin: 'https://linkedin.com/company/tillerstead',
      twitter: null,
      youtube: null
    },
    
    certification: {
      tcna: true,
      ansi: true,
      insurance: {
        liability: true,
        workersComp: true,
        bondAmount: 500000,
        carrier: 'State Farm Business Insurance'
      }
    },
    
    experience: {
      yearsInBusiness: 15,
      projectsCompleted: 1200,
      averageRating: 4.8,
      totalReviews: 847
    }
  },
  
  /**
   * Branding Assets
   * WHITE-LABEL: Replace with licensee's branding
   */
  branding: {
    logo: {
      main: '/assets/img/logo/logo-main.webp',
      compact: '/assets/img/logo/logo-compact.webp',
      white: '/assets/img/logo/logo-white.webp',
      favicon: '/assets/icons/favicon-32x32.png'
    },
    
    colors: {
      primary: '#10b981',      // Emerald green
      primaryDark: '#059669',
      primaryLight: '#34d399',
      secondary: '#0f1110',    // Almost black
      accent: '#fbbf24',       // Amber
      
      // Semantic colors
      success: '#10b981',
      warning: '#fbbf24',
      error: '#ef4444',
      info: '#3b82f6',
      
      // Neutrals
      neutral50: '#f9fafb',
      neutral100: '#f3f4f6',
      neutral200: '#e5e7eb',
      neutral300: '#d1d5db',
      neutral400: '#9ca3af',
      neutral500: '#6b7280',
      neutral600: '#4b5563',
      neutral700: '#374151',
      neutral800: '#1f2937',
      neutral900: '#111827'
    },
    
    typography: {
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      headingFamily: 'Inter, system-ui, -apple-system, sans-serif'
    }
  },
  
  /**
   * Pricing Configuration
   * WHITE-LABEL: Adjust for regional pricing, contractor margins
   */
  pricing: {
    
    // Labor rates
    labor: {
      hourlyRate: 65,           // $ per hour
      overtimeMultiplier: 1.5,   // 1.5x for overtime
      minimumHours: 4,           // Minimum billable hours
      
      // Regional adjustments (multipliers)
      regions: {
        'north-nj': 1.0,
        'central-nj': 0.95,
        'south-nj': 0.90,
        'philadelphia': 1.05,
        'nyc': 1.25
      }
    },
    
    // Material costs ($ per unit)
    // These are base costs - actual costs should come from supplier APIs
    materials: {
      tile: {
        perSqFt: 8.50,
        unit: 'sq ft',
        wasteFactor: 1.10      // 10% waste
      },
      grout: {
        perBag: 18,
        coverage: 50,          // sq ft per bag
        unit: 'bag'
      },
      mortar: {
        perBag: 22,
        coverage: 95,          // sq ft per 50lb bag
        unit: 'bag'
      },
      waterproofing: {
        liquid: { perGallon: 45, coverage: 50 },
        sheet: { perRoll: 180, coverage: 54 },
        board: { perBoard: 65, coverage: 32 }
      },
      leveling: {
        perBag: 38,
        coverage: 50,
        unit: 'bag'
      },
      slope: {
        preslope: { perBag: 28, coverage: 12 },
        pan: { perKit: 450, coverage: 32 }
      },
      backerboard: {
        perSheet: 24,
        coverage: 32           // sq ft per 3x5 sheet
      },
      membrane: {
        perSqFt: 2.80
      },
      sealer: {
        perQuart: 32,
        coverage: 125
      }
    },
    
    // Markup & margins
    markup: {
      materials: 1.35,           // 35% markup on materials
      subcontractors: 1.20,      // 20% markup on subs
      equipment: 1.25            // 25% markup on equipment rental
    },
    
    // Fees
    fees: {
      warranty: {
        enabled: true,
        amount: 250,
        description: '10-Year Waterproof Installation Warranty',
        coverage: 'workmanship and waterproofing integrity'
      },
      permit: {
        enabled: false,         // Only charge if required
        amount: 150,
        description: 'Building permit fee (if required)',
        note: 'Not all projects require permits'
      },
      disposal: {
        enabled: false,
        perTon: 85,
        description: 'Debris removal and disposal'
      },
      travel: {
        enabled: false,
        perMile: 0.67,          // IRS standard mileage rate
        minimumDistance: 30,    // Miles - free within this radius
        description: 'Travel fee for projects outside service area'
      }
    },
    
    // Discounts
    discounts: {
      multiRoom: {
        enabled: true,
        threshold: 2,           // Number of rooms
        percent: 0.10           // 10% off
      },
      seasonal: {
        enabled: false,
        months: [1, 2, 11, 12], // Jan, Feb, Nov, Dec
        percent: 0.05           // 5% off
      },
      referral: {
        enabled: true,
        percent: 0.05           // 5% off for referrals
      },
      veteran: {
        enabled: true,
        percent: 0.10           // 10% off for veterans
      }
    },
    
    // Tax
    tax: {
      rate: 0.06625,            // NJ sales tax 6.625%
      applicableTo: ['materials', 'labor'], // What gets taxed
      exempt: []                // Tax-exempt customer types
    },
    
    // Payment terms
    payment: {
      schedule: {
        deposit: 0.30,          // 30% upfront
        midpoint: 0.40,         // 40% mid-project
        final: 0.30             // 30% on completion
      },
      
      methods: ['check', 'cash', 'card', 'ach', 'financing'],
      
      cardFee: {
        enabled: true,
        percent: 0.03,          // 3% card processing fee
        note: 'Credit card payments subject to 3% processing fee'
      },
      
      terms: {
        net: 30,                // Net 30 days (for commercial)
        lateFeePercent: 0.015,  // 1.5% per month late fee
        minimumLateFee: 25
      }
    }
  },
  
  /**
   * Quote Configuration
   */
  quote: {
    numbering: {
      prefix: 'TPRO',
      format: 'TPRO-YYYYMMDD-###', // TPRO-20260127-001
      startNumber: 1
    },
    
    validity: {
      days: 30,                 // Quote valid for 30 days
      extendable: true          // Can be extended
    },
    
    templates: {
      default: 'professional',
      available: ['professional', 'luxury', 'budget']
    },
    
    includes: {
      warranty: true,
      paymentSchedule: true,
      termsAndConditions: true,
      signatureBlock: true,
      materialBreakdown: true,
      laborBreakdown: true
    },
    
    terms: `
      1. This quote is valid for 30 days from the date of issue.
      2. All work will be performed in accordance with TCNA Handbook standards and NJ building codes.
      3. Installation includes professional-grade waterproofing and surface preparation.
      4. Customer is responsible for providing clear access to work area and protecting furnishings.
      5. Final payment due upon project completion and customer approval.
      6. 10-Year Waterproof Installation Warranty covers workmanship and waterproofing integrity.
      7. Material warranties are provided by manufacturers (varies by product).
      8. Changes to scope of work may result in additional charges.
      9. Permits and inspections are the responsibility of the property owner unless otherwise agreed.
      10. Weather delays or unforeseen conditions may extend timeline.
    `.trim()
  },
  
  /**
   * Email Configuration
   */
  email: {
    provider: 'netlify',       // netlify, sendgrid, mailgun, ses
    
    from: {
      name: 'Tillerstead LLC',
      email: 'quotes@tillerstead.com'
    },
    
    replyTo: {
      name: 'Tillerstead Support',
      email: 'support@tillerstead.com'
    },
    
    templates: {
      quote: {
        subject: 'Your Professional Tile Installation Quote - {{quoteNumber}}',
        preheader: 'Thank you for your interest in Tillerstead',
        includeAttachment: true
      },
      
      quoteSigned: {
        subject: 'Quote {{quoteNumber}} Signed - Next Steps',
        preheader: 'Thank you for choosing Tillerstead!'
      },
      
      projectStart: {
        subject: 'Your Project Starts {{startDate}}',
        preheader: 'What to expect on installation day'
      },
      
      projectComplete: {
        subject: 'Your Project is Complete!',
        preheader: 'Thank you for choosing Tillerstead'
      }
    },
    
    tracking: {
      enabled: true,
      trackOpens: true,
      trackClicks: true
    }
  },
  
  /**
   * E-Signature Configuration
   */
  esignature: {
    provider: 'docusign',      // docusign, hellosign, pandadoc, adobesign
    
    // Mock mode for testing without API keys
    mockMode: true,
    
    // API credentials (set via environment variables in production)
    apiKey: process.env.DOCUSIGN_API_KEY || null,
    integrationKey: process.env.DOCUSIGN_INTEGRATION_KEY || null,
    accountId: process.env.DOCUSIGN_ACCOUNT_ID || null,
    
    settings: {
      signatureRequired: true,
      initialRequired: false,
      witnessRequired: false,
      notarizeRequired: false,
      
      reminderDays: 3,          // Send reminder after 3 days
      expireDays: 30,           // Signature request expires after 30 days
      
      allowDecline: true,
      allowComments: true,
      allowDownloadAfterSign: true
    }
  },
  
  /**
   * Financing Configuration
   */
  financing: {
    enabled: true,
    
    providers: [
      {
        id: 'greensky',
        name: 'GreenSky',
        enabled: true,
        apiKey: process.env.GREENSKY_API_KEY || null,
        merchantId: process.env.GREENSKY_MERCHANT_ID || null,
        
        terms: [
          { months: 24, apr: 0, promoCode: '24MONTHS', description: '24 Months Same-As-Cash' },
          { months: 60, apr: 7.99, description: '60 Months @ 7.99% APR' },
          { months: 120, apr: 9.99, description: '120 Months @ 9.99% APR' }
        ],
        
        minAmount: 1000,
        maxAmount: 55000
      },
      
      {
        id: 'hearth',
        name: 'Hearth',
        enabled: true,
        apiKey: process.env.HEARTH_API_KEY || null,
        
        terms: [
          { months: 36, apr: 5.99, description: '36 Months @ 5.99% APR' },
          { months: 60, apr: 8.99, description: '60 Months @ 8.99% APR' }
        ],
        
        minAmount: 500,
        maxAmount: 100000
      }
    ],
    
    // Display settings
    display: {
      showInQuote: true,
      showAsLowAs: true,         // "Pay as low as $XXX/month"
      defaultTerm: 60,            // Default to 60 months
      emphasizePromo: true        // Highlight 0% APR offers
    }
  },
  
  /**
   * Multi-Location Configuration
   */
  locations: {
    enabled: false,             // Enable for multi-location contractors
    
    headquarters: {
      id: 'main',
      name: 'Cherry Hill Headquarters',
      address: {
        street: '123 Main Street',
        city: 'Cherry Hill',
        state: 'NJ',
        zip: '08002'
      },
      phone: '(856) 555-0100',
      email: 'quotes@tillerstead.com',
      serviceRadius: 50,        // Miles
      active: true
    },
    
    // Additional locations (for enterprise licensees)
    branches: []
  },
  
  /**
   * Analytics & Tracking
   */
  analytics: {
    enabled: true,
    
    providers: {
      googleAnalytics: {
        enabled: false,
        measurementId: null
      },
      
      plausible: {
        enabled: true,
        domain: 'tillerstead.com'
      },
      
      hotjar: {
        enabled: false,
        siteId: null
      }
    },
    
    events: {
      trackQuoteGenerated: true,
      trackQuoteSigned: true,
      trackCalculatorUsage: true,
      trackFormSubmissions: true,
      trackEmailOpens: true
    },
    
    privacy: {
      anonymizeIp: true,
      respectDoNotTrack: true,
      cookieConsent: true
    }
  },
  
  /**
   * Feature Flags
   * Enable/disable features for different licensees
   */
  features: {
    calculators: true,
    instantQuote: true,
    emailDelivery: true,
    esignature: true,
    financing: true,
    multiLocation: false,
    dashboard: true,
    api: false,
    mobileApp: false,
    
    // Advanced features (Enterprise tier only)
    customTemplates: false,
    apiAccess: false,
    whiteLabel: false,
    subAccounts: false
  },
  
  /**
   * Supplier Integration
   */
  suppliers: {
    enabled: false,             // Enable when supplier APIs are integrated
    
    partners: [
      {
        id: 'msi',
        name: 'MSI (Surfaces)',
        apiKey: null,
        accountNumber: null,
        locations: ['Cherry Hill, NJ', 'Philadelphia, PA'],
        priority: 1
      },
      {
        id: 'florida-tile',
        name: 'Florida Tile',
        apiKey: null,
        accountNumber: null,
        locations: ['Cherry Hill, NJ'],
        priority: 2
      },
      {
        id: 'dal-tile',
        name: 'Dal-Tile',
        apiKey: null,
        accountNumber: null,
        locations: ['Multiple'],
        priority: 3
      }
    ],
    
    autoOrder: false,           // Automatically place orders
    priceCheck: true,           // Check real-time pricing
    stockCheck: true            // Check inventory
  },
  
  /**
   * Development & Debugging
   */
  debug: {
    enabled: false,             // Set to true in development
    verboseLogging: false,
    showPerformanceMetrics: false,
    mockAPIs: true              // Use mock data when APIs not configured
  }
};

// Freeze config to prevent accidental modifications
Object.freeze(TillerProConfig);

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TillerProConfig;
}

// Expose globally for browser
if (typeof window !== 'undefined') {
  window.TillerProConfig = TillerProConfig;
}

console.log('[TillerPro Config] Loaded v' + TillerProConfig.app.version);
