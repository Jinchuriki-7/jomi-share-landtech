export type Language = 'en' | 'bn';

export const toBnDigits = (val: string | number): string => {
  const bnNumerals: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
  };
  return String(val)
    .replace(/\bDAG\s*Numbers?\b/gi, 'দাগ নম্বর')
    .replace(/\bDAGs?\b/gi, 'দাগ')
    .replace(/[0-9]/g, char => bnNumerals[char] || char);
};

export const formatBnNumber = (val: number | string, lang: Language): string => {
  if (lang === 'bn') {
    return toBnDigits(val);
  }
  return String(val);
};

export const formatArea = (dec: number, lang: Language): string => {
  if (lang === 'bn') {
    return `${toBnDigits(dec)} শতাংশ`;
  }
  return `${dec} dec`;
};

export const formatCurrency = (amount: number, lang: Language): string => {
  const formatted = amount.toLocaleString('en-IN');
  if (lang === 'bn') {
    return `৳${toBnDigits(formatted)}`;
  }
  return `৳${formatted}`;
};

export const translateDocType = (type: string, lang: Language): string => {
  if (lang !== 'bn') return type;
  const map: Record<string, string> = {
    'CS Khatian': 'সিএস খতিয়ান',
    'SA Khatian': 'এসএ খতিয়ান',
    'RS Khatian': 'আরএস খতিয়ান',
    'Mutation': 'নামজারি',
    'Deed': 'দলিল',
    'DCR': 'ডিসিআর',
    'Survey Map': 'নকশা',
  };
  return map[type] || type;
};

export const translateDocOwner = (owner: string, lang: Language): string => {
  if (lang !== 'bn') return owner;
  return owner
    .replace(/Rahimuddin Miah\s*\(\s*Grandfather\s*—\s*SYNTHETIC\s*\)/gi, 'রহিমউদ্দিন মিয়া (দাদা — কৃত্রিম ডেমো)')
    .replace(/Fatema Begum\s*\(\s*Grandmother\s*—\s*SYNTHETIC\s*\)/gi, 'ফাতেমা বেগম (দাদি — কৃত্রিম ডেমো)')
    .replace(/Estate of Rahimuddin Miah\s*—\s*SYNTHETIC/gi, 'মরহুম রহিমউদ্দিন মিয়ার ওয়ারিশান — কৃত্রিম ডেমো')
    .replace(/Heirs of Rahimuddin Miah\s*—\s*SYNTHETIC/gi, 'রহিমউদ্দিন মিয়ার ওয়ারিশগণ — কৃত্রিম ডেমো')
    .replace(/Rahimuddin Miah\s*—\s*SYNTHETIC/gi, 'রহিমউদ্দিন মিয়া — কৃত্রিম ডেমো')
    .replace(/Grandfather\s*—\s*SYNTHETIC/gi, 'দাদা — কৃত্রিম ডেমো')
    .replace(/Grandmother\s*—\s*SYNTHETIC/gi, 'দাদি — কৃত্রিম ডেমো')
    .replace(/SYNTHETIC/gi, 'কৃত্রিম ডেমো');
};

export const translateDocNotes = (notes: string, lang: Language): string => {
  if (lang !== 'bn') return notes;
  if (notes.includes('Original cadastral survey record')) return 'মূল ক্যাডাস্ট্রাল জরিপ (সিএস) রেকর্ড — কৃত্রিম ডেমো';
  if (notes.includes('Original cadastral record')) return 'মূল ক্যাডাস্ট্রাল জরিপ (সিএস) রেকর্ড — কৃত্রিম ডেমো';
  if (notes.includes('Area discrepancy')) return 'ক্ষেত্রফলের অসঙ্গতি: ৪২.৫ বনাম ৪০.০ শতাংশ — কৃত্রিম ডেমো';
  if (notes.includes('Post-death mutation')) return 'মৃত্যুপরবর্তী ওয়ারিশান নামজারি — কৃত্রিম ডেমো';
  if (notes.includes('Registered deed')) return 'রেজিস্ট্রিকৃত সাব-কবলা দলিল — কৃত্রিম ডেমো';
  if (notes.includes('Owner name changed in RS')) return 'নথিভুক্ত নামজারি ছাড়াই আরএস খতিয়ানে মালিকের নাম পরিবর্তিত — কৃত্রিম ডেমো';
  if (notes.includes('Mutation application filed')) return 'নামজারি আবেদন দাখিল করা হলেও এখনো অনিষ্পন্ন — কৃত্রিম ডেমো';
  return toBnDigits(notes);
};

export const translateDiscrepancy = (
  disc: { id: string; field: string; docValue: string | number; recordValue: string | number; explanation: string },
  lang: Language
) => {
  if (lang !== 'bn') {
    return {
      field: disc.field,
      docValue: String(disc.docValue),
      recordValue: String(disc.recordValue),
      explanation: disc.explanation,
    };
  }

  const bnFieldMap: Record<string, string> = {
    'Area (Decimals)': 'জমির পরিমাণ (শতাংশ)',
    'Owner Name': 'মালিকের নাম',
    'Mutation Status': 'নামজারির অবস্থা',
    'RS Khatian': 'আরএস খতিয়ান',
  };

  const bnDocValMap: Record<string, string> = {
    'Fatema Begum (Grandmother — SYNTHETIC)': 'ফাতেমা বেগম (দাদি — কৃত্রিম ডেমো)',
    'Pending / Incomplete': 'অনিষ্পন্ন / অসম্পূর্ণ',
    'Not available': 'অনুপলব্ধ / অনুপস্থিত',
  };

  const bnRecordValMap: Record<string, string> = {
    'Rahimuddin Miah (Grandfather — SYNTHETIC)': 'রহিমউদ্দিন মিয়া (দাদা — কৃত্রিম ডেমো)',
    'Required for valid ownership transfer': 'বৈধ মালিকানা হস্তান্তরের জন্য আবশ্যক',
    'Required for modern survey': 'আধুনিক জরিপের জন্য আবশ্যক',
  };

  const bnExplanationMap: Record<string, string> = {
    'disc-001a': 'এসএ খতিয়ানে (১৯৯৫) ৪০.০ শতাংশ এবং সিএস ও নামজারিতে ৪২.৫ শতাংশ দেখাচ্ছে। ২.৫ শতাংশের ব্যবধানটি (≈ ৫.৯%) জরিপের ভুল বা কেরানির ত্রুটি হতে পারে। বণ্টন দলিলের পূর্বে পুনঃজরিপ সুপারিশ করা হলো। [কৃত্রিম ডেমো]',
    'disc-002a': 'আরএস খতিয়ানে (২০১৮) সিএস খতিয়ান ও রেজিস্ট্রিকৃত দলিলের চেয়ে ভিন্ন মালিকের নাম দেখাচ্ছে। নাম পরিবর্তনের স্বপক্ষে কোনো নামজারি নথি পাওয়া যায়নি। এই অসঙ্গতি দূর করতে আনুষ্ঠানিক নামজারি রেকর্ড প্রয়োজন। [কৃত্রিম ডেমো]',
    'disc-003a': 'মূল মালিকের মৃত্যুর পর নামজারি আবেদন (MUT-PENDING/2021) দাখিল করা হলেও তা সম্পন্ন হয়নি। নামজারি ব্যতিরেকে মালিকানা হস্তান্তর নিশ্চিত করা যায় না। এটি এই দাগের জন্য সর্বোচ্চ অগ্রাধিকারের রেকর্ড সমস্যা। [কৃত্রিম ডেমো]',
    'disc-003b': 'ডেমো রেকর্ডে এই দাগের কোনো আরএস খতিয়ান পাওয়া যায়নি। এটি পুনঃজরিপ প্রক্রিয়ার কোনো ত্রুটি হতে পারে। দাগটির জন্য নতুন জরিপ প্রয়োজন হতে পারে। [কৃত্রিম ডেমো]',
  };

  const docValStr = typeof disc.docValue === 'number'
    ? `${toBnDigits(disc.docValue)} শতাংশ`
    : (bnDocValMap[String(disc.docValue)] || translateDocOwner(String(disc.docValue), 'bn'));

  const recordValStr = typeof disc.recordValue === 'number'
    ? `${toBnDigits(disc.recordValue)} শতাংশ`
    : (bnRecordValMap[String(disc.recordValue)] || translateDocOwner(String(disc.recordValue), 'bn'));

  return {
    field: bnFieldMap[disc.field] || disc.field,
    docValue: docValStr,
    recordValue: recordValStr,
    explanation: bnExplanationMap[disc.id] || toBnDigits(disc.explanation),
  };
};

export const translateTimelineEvent = (
  event: { id: string; type: string; title: string; description: string; actor: string },
  lang: Language
) => {
  if (lang !== 'bn') {
    return {
      title: event.title,
      description: event.description,
      actor: event.actor,
    };
  }

  const bnTitleMap: Record<string, string> = {
    'evt-001': 'সিএস জরিপ অন্তর্ভুক্তি',
    'evt-002': 'সিএস জরিপ অন্তর্ভুক্তি',
    'evt-003': 'সিএস জরিপ অন্তর্ভুক্তি',
    'evt-004': 'এসএ খতিয়ানে ক্ষেত্রফলের অমিল শনাক্ত',
    'evt-005': 'রেজিস্ট্রিকৃত সাব-কবলা দলিল সংযোজিত',
    'evt-006': 'মৃত্যুপরবর্তী নামজারি সম্পন্ন',
    'evt-007': 'আরএস খতিয়ানে মালিকের নামের অমিল',
    'evt-008': 'নামজারি আবেদন দাখিল',
    'evt-009': 'আরএস খতিয়ান অনুপস্থিত',
  };

  const bnDescMap: Record<string, string> = {
    'evt-001': 'ক্যাডাস্ট্রাল সার্ভে (সিএস) রেকর্ডভুক্ত। দাগ-১২৪৭ রহিমউদ্দিন মিয়ার নামে নিবন্ধিত। জমির পরিমাণ: ৪২.৫ শতাংশ। [কৃত্রিম ডেমো]',
    'evt-002': 'দাগ-১২৪৮-এর জন্য সিএস রেকর্ড এন্ট্রি। বসতভিটা দাগ নিবন্ধিত। জমির পরিমাণ: ৩৫.০ শতাংশ। [কৃত্রিম ডেমো]',
    'evt-003': 'দাগ-১২৪৯-এর জন্য সিএস রেকর্ড এন্ট্রি। বাগান দাগ নিবন্ধিত। জমির পরিমাণ: ২৮.০ শতাংশ। [কৃত্রিম ডেমো]',
    'evt-004': 'এসএ খতিয়ানে জমির পরিমাণ ৪০.০ শতাংশ রেকর্ড করা হয়েছে, যা সিএস রেকর্ডের ৪২.৫ শতাংশ থেকে ভিন্ন। অসঙ্গতি চিহ্নিত করা হয়েছে। [কৃত্রিম ডেমো]',
    'evt-005': 'দলিল নম্বর DEED-7745/2001 নিবন্ধিত। রহিমউদ্দিন মিয়ার মালিকানা নিশ্চিত করে। জমির পরিমাণ সিএস রেকর্ডের সাথে সামঞ্জস্যপূর্ণ। [কৃত্রিম ডেমো]',
    'evt-006': 'মালিকের মৃত্যুর পর নামজারি (MUT-3391/2010) সম্পন্ন। দাগটি রহিমউদ্দিন মিয়ার ওয়ারিশান এস্টেটে হস্তান্তরিত। [কৃত্রিম ডেমো]',
    'evt-007': 'আরএস খতিয়ানে (২০১৮) রহিমউদ্দিন মিয়ার পরিবর্তে ফাতেমা বেগমকে মালিক হিসেবে দেখানো হয়েছে। নাম পরিবর্তনের কোনো নামজারি নথি নেই। অমিল লিপিবদ্ধ। [কৃত্রিম ডেমো]',
    'evt-008': 'ওয়ারিশদের নামে নামজারি আবেদন (MUT-PENDING/2021) দাখিল করা হয়েছে। অবস্থা: অনিষ্পন্ন। মালিকানা নিশ্চিত করতে এটি নিষ্পত্তি করা আবশ্যক। [কৃত্রিম ডেমো]',
    'evt-009': 'নিরীক্ষায় দাগ-১২৪৯-এর কোনো আরএস খতিয়ান পাওয়া যায়নি। রেকর্ডের সম্পূর্ণতা কম (৫৫%) হিসেবে চিহ্নিত। [কৃত্রিম ডেমো]',
  };

  const bnActorMap: Record<string, string> = {
    'Demo Survey Authority': 'ডেমো ভূমি জরিপ কর্তৃপক্ষ',
    'Demo Record System': 'ডেমো রেকর্ড সংরক্ষণ ব্যবস্থা',
    'Demo Sub-Registry': 'ডেমো সাব-রেজিস্ট্রি অফিস',
    'Demo AC Land Office': 'ডেমো সহকারী কমিশনার (ভূমি) অফিস',
  };

  return {
    title: bnTitleMap[event.id] || toBnDigits(event.title),
    description: bnDescMap[event.id] || toBnDigits(event.description),
    actor: bnActorMap[event.actor] || toBnDigits(event.actor),
  };
};

export const translateRiskWarning = (warning: string, lang: Language): string => {
  if (lang !== 'bn') return warning;
  if (warning.includes('Plot has no road access')) return 'দাগটিতে কোনো রাস্তা নেই — অবরুদ্ধ জমি।';
  if (warning.includes('Plot access is indirect')) return 'দাগের প্রবেশাধিকার পরোক্ষ — সংলগ্ন দাগ দিয়ে চলাচলের পথ বা নিকাশ প্রয়োজন।';
  if (warning.includes('High relative value variation')) {
    return toBnDigits(
      warning
        .replace('High relative value variation (', 'শতক প্রতি মূল্যের উচ্চ বৈষম্য (')
        .replace('BDT/decimal vs average', '৳/শতক বনাম গড়')
        .replace(') may cause partition disputes.', '৳) বণ্টনে বিরোধের সৃষ্টি করতে পারে।')
    );
  }
  if (warning.includes('Critical: incomplete mutation record')) return 'জরুরি: অসম্পূর্ণ নামজারি রেকর্ড। নামজারি নিষ্পত্তি না হওয়া পর্যন্ত বণ্টন কার্যকর করা যাবে না।';
  if (warning.includes('Record mismatch detected')) return 'রেকর্ডে অমিল শনাক্ত হয়েছে — বণ্টনের পূর্বে ভূমি অফিসে যাচাই করুন।';
  if (warning.includes('Low record completeness')) {
    return toBnDigits(
      warning
        .replace('Low record completeness (', 'রেকর্ডের সম্পূর্ণতা কম (')
        .replace('%) — missing documents should be traced.', '%) — অনুপস্থিত নথি অনুসন্ধান করা আবশ্যক।')
    );
  }
  return toBnDigits(warning);
};

export const TRANSLATIONS = {
  en: {
    // TopBar & Brand
    appName: 'JOMI-SHARE',
    appSubtitle: 'Land Intelligence',
    demoCase: 'Sonargaon Demo Case 001',
    demoBadge: 'SYNTHETIC DEMO DATA — Not Real Government Records',
    resetDemo: 'Reset Demo',
    demoUser: 'Demo User',
    language: 'Language',

    // Sidebar Nav
    nav: {
      overview: 'Overview',
      map: 'Land Map Explorer',
      landDna: 'Land DNA',
      verification: 'Record Verification',
      inheritance: 'Inheritance Manager',
      partition: 'Partition Optimizer',
      heatmap: 'Conflict Heatmap',
      simulator: 'Scenario Simulator',
      reports: 'Reports',
      about: 'About & Limitations',
      nirbash: 'NIRBASH Marketplace',
      collapse: 'Collapse',
    },

    // Common Status & Badges
    status: {
      verified: 'Verified',
      mismatch: 'Mismatch',
      incomplete: 'Incomplete',
      consistent: 'Consistent',
      missing: 'Missing',
      direct: 'Direct Access',
      indirect: 'Indirect Access',
      none: 'No Access',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      agricultural: 'Agricultural',
      homestead: 'Homestead',
      orchard: 'Orchard',
      pond: 'Pond',
      road: 'Road',
    },

    // Common actions
    actions: {
      view: 'View',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      details: 'Details',
      download: 'Download',
      print: 'Print / Save PDF',
      back: 'Back',
      next: 'Next',
      explore: 'Explore',
    },

    // Overview Page
    overview: {
      title: 'Overview Dashboard',
      subtitle: 'Sonargaon Land Parcel Case — SYNTHETIC DEMO DATA',
      welcomeTitle: 'Welcome to JOMI-SHARE Demo',
      welcomeDesc: 'This is a fully functional demonstration of the JOMI-SHARE Land Intelligence Platform. All data below is synthetic and fictional — no real land records, government databases, or personal information are used. Use the left navigation to explore all modules.',
      kpiTotalPlots: 'Total DAGs',
      kpiTotalArea: 'Total Area',
      kpiHeirs: 'Heirs',
      kpiPlans: 'Plans Generated',
      kpiDiscrepancies: 'Discrepancies',
      kpiAccessWarnings: 'Access Warnings',
      subSynthetic: 'Synthetic demo',
      subAcres: '= 1.055 acres',
      subFictional: 'Fictional demo',
      subDeterministic: 'Deterministic',
      subRecordMismatches: 'Record mismatches',
      subIndirect: 'Indirect/no access',
      mapPreview: 'Land Map Preview',
      openFullMap: 'Open Full Map',
      quickActionsTitle: 'Quick Actions',
      readinessScore: 'Partition Readiness Score',
      overallReadiness: 'Overall Readiness',
      readinessDesc: 'Based on record completeness, boundary certainty, and access verification.',
      healthBreakdown: 'Record Health Breakdown',
      areaDistribution: 'Plot Area & Value Distribution',
      discrepancyAlerts: 'Discrepancy Alerts',
      viewAllRecords: 'View all records in Record Verification',
      recommendedPlan: 'Recommended Partition Plan',
      viewAllPlans: 'View all plans in Partition Optimizer',
      fairness: 'Fairness',
      access: 'Access',
      overall: 'Overall',
      actionMap: 'Explore Land Map',
      actionDna: 'View Land DNA',
      actionVerify: 'Check Records',
      actionPartition: 'Optimize Partition',
      actionHeatmap: 'View Heatmap',
      actionReport: 'Generate Report',
    },

    // Map Page
    map: {
      title: 'Land Map Explorer',
      subtitle: 'Interactive geospatial visualization — SYNTHETIC DEMO DATA',
      layers: 'Map Layers',
      labels: 'Labels',
      roads: 'Roads',
      shared: '💧 Shared Resources',
      uploadMap: 'Upload Map',
      legend: 'Map Legend',
      legendHighValue: 'High Value / Road Frontage',
      legendMedValue: 'Medium Value / Agricultural',
      legendHomestead: 'Homestead / Garden',
      legendPublicRoad: 'Public Access Road',
      legendSharedPond: 'Shared Water Pond (Fishpond)',
      legendPrivatePath: 'Private Access Path (Demarcated)',
      selectedPlot: 'Selected Plot',
      clickPrompt: 'Click on any plot on the map to inspect details.',
      dagNumber: 'DAG Number',
      mouzaName: 'Mouza',
      area: 'Area',
      estValue: 'Est. Value',
      currentUse: 'Current Use',
      classification: 'Classification',
      roadAccess: 'Road Access',
      discrepancies: 'Discrepancies',
      viewDna: 'View Land DNA',
      fileUploadAlertTitle: 'Map file uploaded (Demo mode)',
      fileUploadAlertDesc: 'has been received. In this demo, automatic OCR and boundary detection are simulated — results are pre-loaded synthetic detections, not actual computer-vision model output. No file content is sent to any external API.',
      uploadErrorType: 'Only JPG, PNG, and PDF files are supported.',
      uploadErrorSize: 'File size must not exceed 20 MB.',
    },

    // Land DNA Page
    landDna: {
      title: 'Land DNA — Digital Land Identity',
      subtitle: 'Digital profile for each synthetic plot — SYNTHETIC DEMO DATA',
      alertInfo: 'Land DNA is the digital identity record for each plot. All entries below are synthetic demo data — including Khatians, mutations, discrepancy flags, and ownership history. No real records are queried.',
      selectPlot: 'Select Plot to View DNA',
      completeness: 'Completeness',
      identityCard: 'Plot Identity Card',
      basicDetails: 'Basic Details',
      mouzaCode: 'Mouza Code',
      soilType: 'Soil Type',
      recordsAndDocs: 'Records & Chain of Documents',
      docType: 'Document Type',
      docNumber: 'Number',
      docYear: 'Year',
      recordedOwner: 'Recorded Owner',
      recordedArea: 'Recorded Area',
      docStatus: 'Status',
      notes: 'Notes',
      discrepancyReport: 'Discrepancy Report',
      severity: 'Severity',
      field: 'Field',
      docVal: 'Document Value',
      recordVal: 'Record Value',
      explanation: 'Explanation',
      timelineTitle: 'Ownership & Transaction Timeline',
      noDiscrepancy: 'No discrepancies detected for this plot.',
    },

    // Verification Page
    verification: {
      title: 'Record Verification',
      subtitle: 'Deterministic rule-based record cross-verification — SYNTHETIC DEMO DATA',
      alertInfo: 'Record verification performs deterministic cross-checks against the synthetic demo dataset. This does NOT access real government land databases or perform legal title verification. All comparison targets are fictional.',
      selectPlotToVerify: 'Select Plot to Cross-Verify',
      checkPlotVsRecord: 'Verify Plot Data vs Record',
      runCrossCheck: 'Run Verification Check',
      allMatched: 'All verified fields match demo records.',
      discrepancyFound: 'discrepancy(ies) flagged in demo records.',
      checksMatrix: 'Automated Consistency Checks',
      chainTitle: 'Chain of Title Continuity',
      chainDesc: 'Verified seamless transfer from CS (1984) through SA (1995) to current estate mutation.',
      areaMath: 'Area Mathematical Consistency',
      areaMathDesc: 'Checking area figures across Khatians and mutation registers.',
      mutationStatus: 'Mutation Registration Status',
      mutationStatusDesc: 'Verifying valid post-death mutation with Assistant Commissioner (Land) office.',
      roadReserve: 'Road Reserve Clearance',
      roadReserveDesc: 'Checking public road alignment and reserve boundary setbacks.',
      detectedDiscrepancies: 'Detected Discrepancies & Flags',
      fieldCol: 'Field',
      userValCol: 'Your Input',
      recordValCol: 'Demo Record',
      statusCol: 'Status',
      resultCol: 'Analysis',
    },

    // Inheritance Page
    inheritance: {
      title: 'Inheritance Manager',
      subtitle: 'Manage heir entitlements for partition planning — SYNTHETIC DEMO DATA',
      legalDisclaimerTitle: 'Legal Disclaimer',
      legalDisclaimer: 'Entitlement percentages entered here are user-defined demo inputs only. They are NOT calculated from any religious, legal, or statutory inheritance law. Consult a qualified lawyer for legally valid inheritance rights determination. This tool provides decision support, not legal advice.',
      saveAndRecalc: 'Save & Recalculate',
      savedSuccess: 'Entitlements saved — partition plans recalculated.',
      caseInfo: 'Case Information',
      caseId: 'Case ID',
      caseName: 'Case Name',
      totalArea: 'Total Area',
      totalValue: 'Total Value',
      noHeirs: 'No. of Heirs',
      noPlots: 'No. of DAGs',
      heirsList: 'Heirs & Entitlement Breakdown',
      heirName: 'Heir Name',
      relation: 'Relationship',
      entitlementPct: 'Entitlement %',
      entitledArea: 'Entitled Area',
      entitledValue: 'Entitled Value',
      adjustShare: 'Adjust Share',
      validationTotal: 'Total entitlement must sum to exactly 100%. Current sum: ',
      validationValid: 'Total equals 100%. Partition plans can be recalculated.',
    },

    // Partition Page
    partition: {
      title: 'Partition Optimizer',
      subtitle: 'Deterministic multi-plan partition generation — SYNTHETIC DEMO DATA',
      regenerate: 'Regenerate Plans',
      generating: 'Generating Plans…',
      disclaimerTitle: 'Decision Support Disclaimer',
      disclaimer: 'The partition plans below are generated deterministically by multi-criteria optimization algorithms. They are proposed alternatives for discussion among co-owners — NOT legally binding or authorized partition determinations. All boundaries are synthetic approximations.',
      tabOverview: 'Plan Overview & Score',
      tabMap: 'Partition Map View',
      tabAllocations: 'Heir Allocations',
      tabComparison: 'Plan Comparison',
      planAreaFocused: 'Area-Focused Priority',
      planValueBalanced: 'Value-Balanced Priority',
      planAccessFocused: 'Access-Focused Priority',
      planAreaFocusedDesc: 'Maximizes equal land area distribution across all heirs, with secondary regard to market value.',
      planValueBalancedDesc: 'Prioritizes equitable total market valuation across heirs, adjusting area to compensate for road-facing parcels.',
      planAccessFocusedDesc: 'Guarantees direct road access to every heir to prevent landlocked sub-parcels.',
      scores: 'Multi-Criteria Evaluation Scores',
      overallScore: 'Overall Optimization Score',
      areaFairness: 'Area Fairness',
      valueFairness: 'Value Fairness',
      accessScore: 'Road Access Score',
      shapeQuality: 'Parcel Shape Quality',
      advantages: 'Key Advantages',
      disadvantages: 'Trade-offs & Considerations',
      allocationsTableTitle: 'Plot Allocations by Heir',
      colHeir: 'Heir',
      colAllocatedArea: 'Allocated Area',
      colTargetArea: 'Target Area',
      colAreaDev: 'Area Dev.',
      colAllocatedVal: 'Allocated Value',
      colTargetVal: 'Target Value',
      colValDev: 'Value Dev.',
      colAccess: 'Access Status',
    },

    // Heatmap Page
    heatmap: {
      title: 'Conflict Heatmap',
      subtitle: 'Explainable risk indicators for partition conflicts — SYNTHETIC DEMO DATA',
      disclaimerTitle: 'Important Disclaimer',
      disclaimer: 'This heatmap displays heuristic risk indicators computed from the synthetic demo dataset. These are decision-support indicators, not scientifically validated predictions of future legal disputes. They are based solely on the demo data and algorithm — not real land records or legal analysis.',
      maxRiskBadge: 'Max Risk Score',
      riskHigh: 'High Conflict Risk',
      riskMedium: 'Moderate Friction',
      riskLow: 'Low Friction',
      riskBreakdown: 'Spatial Friction & Conflict Indicators',
      indicatorAreaMismatch: 'Survey Area Mismatch',
      indicatorRoadAccess: 'Road Access Deficit',
      indicatorMutation: 'Pending Mutation Issue',
      indicatorSharedResource: 'Shared Pond Dependency',
      mitigationRecommendations: 'Conflict Mitigation Recommendations',
      rec1: 'Perform joint physical survey with Amin/surveyor to resolve the 2.5-decimal SA vs CS discrepancy on DAG-1247 before executing partition deed.',
      rec2: 'Expedite pending mutation (MUT-PENDING/2021) on DAG-1250 through Upazila Land Office to secure unencumbered title.',
      rec3: 'Formalize registered easement rights (নিকাশ/চলাচলের পথ) for DAG-1250 to prevent landlocking.',
      rec4: 'Execute a joint management agreement for the family fishpond to avoid post-partition disputes.',
    },

    // Simulator Page
    simulator: {
      title: 'Scenario Simulator',
      subtitle: 'What-if analysis for partition parameters — SYNTHETIC DEMO DATA',
      disclaimerTitle: 'Simulation Disclaimer',
      disclaimer: 'This interactive simulator lets you test alternative heir shares, access road widths, and algorithm weightings. All outcomes are simulated mathematically — NOT legal partition decisions.',
      controlsTitle: 'Simulation Parameters',
      sharesSection: 'Heir Share Distribution (%)',
      weightsSection: 'Optimization Objective Weights (%)',
      areaWeight: 'Area Fairness Weight',
      valueWeight: 'Value Fairness Weight',
      accessWeight: 'Access Priority Weight',
      roadWidth: 'Minimum Access Corridor Width (meters)',
      pondOption: 'Shared Pond Arrangement',
      pondShared: 'Keep Shared (Equal Co-ownership)',
      pondHeirA: 'Allocate to Heir A with valuation offset',
      pondHeirB: 'Allocate to Heir B with valuation offset',
      pondHeirC: 'Allocate to Heir C with valuation offset',
      runSimulation: 'Run Simulation',
      running: 'Simulating…',
      resetDefaults: 'Reset to Defaults',
      simulationResults: 'Simulated Outcomes vs Base Plan',
      impactSummary: 'Simulation Impact Summary',
    },

    // Reports Page
    reports: {
      title: 'Reports & Documents',
      subtitle: 'Generate and print partition planning reports — SYNTHETIC DEMO DATA',
      printBtn: 'Print / Save PDF',
      selectPlan: 'Select Plan for Report',
      docHeader: 'PARTITION PLANNING & ADVISORY REPORT',
      docSubheader: 'Government of the People\'s Republic of Bangladesh (Simulation Template)',
      mouzaCase: 'Case: Sonargaon Mouza Family Land Settlement',
      generatedDate: 'Date Generated',
      docDisclaimer: 'OFFICIAL NOTICE: This report is a computational simulation generated by JOMI-SHARE for decision support only. It does not replace an official court partition decree, deed registration (বণ্টননামা দলিল), or government land survey. All boundaries, records, and values are synthetic.',
      sectionCaseDetails: '1. Case Particulars',
      sectionAllocations: '2. Proposed Partition Schedule (বণ্টন তফসিল)',
      sectionRisks: '3. Identified Legal & Cadastral Discrepancies',
      sectionSignatures: '4. Signatures of Co-Owners / Heirs',
      signatureNotice: 'By signing below, the heirs acknowledge receipt and review of this partition simulation proposal:',
      dagSchedule: 'Plot & Schedule Breakdown',
      witnessSignatures: 'Witnesses & Surveyor / Amin Certification',
    },
  },

  bn: {
    // TopBar & Brand
    appName: 'জমি-শেয়ার',
    appSubtitle: 'ভূমি বুদ্ধিমত্তা ও বণ্টন প্ল্যাটফর্ম',
    demoCase: 'সোনারগাঁও ডেমো কেস ০০১',
    demoBadge: 'কৃত্রিম ডেমো ডেটা — আসল সরকারি রেকর্ড নয়',
    resetDemo: 'ডেমো রিসেট',
    demoUser: 'ডেমো ব্যবহারকারী',
    language: 'ভাষা',

    // Sidebar Nav
    nav: {
      overview: 'সার্বিক চিত্র',
      map: 'জমির মানচিত্র',
      landDna: 'জমির ডিএনএ',
      verification: 'রেকর্ড যাচাই',
      inheritance: 'উত্তরাধিকার বণ্টন',
      partition: 'বণ্টন অপটিমাইজার',
      heatmap: 'বিরোধ হিটম্যাপ',
      simulator: 'পরিস্থিতি সিমুলেটর',
      reports: 'প্রতিবেদন ও দলিল',
      about: 'পরিচিতি ও সীমাবদ্ধতা',
      nirbash: 'নির্বাশ মার্কেটপ্লেস',
      collapse: 'সংক্ষেপ করুন',
    },

    // Common Status & Badges
    status: {
      verified: 'যাচাইকৃত',
      mismatch: 'অসঙ্গতিপূর্ণ',
      incomplete: 'অসম্পূর্ণ',
      consistent: 'সামঞ্জস্যপূর্ণ',
      missing: 'অনুপস্থিত',
      direct: 'সরাসরি রাস্তা',
      indirect: 'পরোক্ষ পথ',
      none: 'চলাচলের পথ নেই',
      high: 'উচ্চ',
      medium: 'মাঝারি',
      low: 'স্বল্প',
      agricultural: 'কৃষি জমি (নাল)',
      homestead: 'বসতভিটা (বাড়ি)',
      orchard: 'বাগান',
      pond: 'পুকুর / জলাশয়',
      road: 'রাস্তা',
    },

    // Common actions
    actions: {
      view: 'দেখুন',
      save: 'সংরক্ষণ',
      cancel: 'বাতিল',
      close: 'বন্ধ',
      details: 'বিস্তারিত',
      download: 'ডাউনলোড',
      print: 'প্রিন্ট / পিডিএফ সংরক্ষণ',
      back: 'পূর্ববর্তী',
      next: 'পরবর্তী',
      explore: 'অন্বেষণ করুন',
    },

    // Overview Page
    overview: {
      title: 'সার্বিক ড্যাশবোর্ড',
      subtitle: 'সোনারগাঁও পারিবারিক ভূমি বণ্টন কেস — কৃত্রিম ডেমো ডেটা',
      welcomeTitle: 'জমি-শেয়ার ডেমোতে স্বাগতম',
      welcomeDesc: 'এটি জমি-শেয়ার ল্যান্ড ইন্টেলিজেন্স প্ল্যাটফর্মের একটি পূর্ণাঙ্গ পরীক্ষামূলক সংস্করণ। নিচের সমস্ত তথ্য ও রেকর্ড সম্পূর্ণ কৃত্রিম ও কাল্পনিক — কোনো আসল সরকারি রেকর্ড বা ব্যক্তিগত তথ্য ব্যবহার করা হয়নি। বামপাশের মেন্যু ব্যবহার করে বিভিন্ন মডিউল ব্যবহার করুন।',
      kpiTotalPlots: 'মোট দাগ/প্লট',
      kpiTotalArea: 'মোট জমির পরিমাণ',
      kpiHeirs: 'ওয়ারিশ/অংশীদার',
      kpiPlans: 'তৈরিকৃত পরিকল্পনা',
      kpiDiscrepancies: 'শনাক্তকৃত অসঙ্গতি',
      kpiAccessWarnings: 'রাস্তা সংক্রান্ত সতর্কতা',
      subSynthetic: 'কৃত্রিম ডেমো',
      subAcres: '= ১.০৫৫ একর',
      subFictional: 'কাল্পনিক ডেমো',
      subDeterministic: 'অ্যালগরিদমিক গণনা',
      subRecordMismatches: 'রেকর্ডে অমিল',
      subIndirect: 'পরোক্ষ / চলাচলের পথহীন',
      mapPreview: 'জমির মানচিত্রের রূপরেখা',
      openFullMap: 'পূর্ণ মানচিত্র দেখুন',
      quickActionsTitle: 'দ্রুত সেবা ও মডিউল',
      readinessScore: 'বণ্টন প্রস্তুতি স্কোর',
      overallReadiness: 'সামগ্রিক প্রস্তুতি',
      readinessDesc: 'রেকর্ডের নির্ভরযোগ্যতা, সীমানা নির্ভুলতা এবং রাস্তা প্রবেশাধিকারের ভিত্তিতে পরিমাপকৃত।',
      healthBreakdown: 'রেকর্ডের স্বাস্থ্য বিশ্লেষণ',
      areaDistribution: 'দাগভিত্তিক জমির পরিমাণ ও বাজারমূল্য বিন্যাস',
      discrepancyAlerts: 'রেকর্ড অসঙ্গতি ও ঝুঁকির সতর্কতা',
      viewAllRecords: 'রেকর্ড যাচাইকরণ পাতায় সবগুলো দেখুন',
      recommendedPlan: 'সর্বোত্তম প্রস্তাবিত বণ্টন পরিকল্পনা',
      viewAllPlans: 'বণ্টন অপটিমাইজারে সব পরিকল্পনা দেখুন',
      fairness: 'সমতা',
      access: 'রাস্তা',
      overall: 'সামগ্রিক',
      actionMap: 'জমির মানচিত্র দেখুন',
      actionDna: 'জমির ডিএনএ দেখুন',
      actionVerify: 'রেকর্ড যাচাই করুন',
      actionPartition: 'বণ্টন পরিকল্পনা সাজান',
      actionHeatmap: 'বিরোধ হিটম্যাপ দেখুন',
      actionReport: 'প্রতিবেদন তৈরি করুন',
    },

    // Map Page
    map: {
      title: 'জমির মানচিত্র এক্সপ্লোরার',
      subtitle: 'ইন্টারেক্টিভ ভূস্থানিক মানচিত্র ও দাগ পরিদর্শন — কৃত্রিম ডেমো ডেটা',
      layers: 'মানচিত্রের স্তর',
      labels: 'দাগ নম্বর',
      roads: 'রাস্তাঘাট',
      shared: '💧 যৌথ সম্পদ',
      uploadMap: 'নকশা আপলোড',
      legend: 'মানচিত্রের নির্দেশিকা',
      legendHighValue: 'উচ্চ মূল্যের / রাস্তার সম্মুখভাগের জমি',
      legendMedValue: 'মাঝারি মূল্যের কৃষিজমি (নাল)',
      legendHomestead: 'বসতভিটা ও বাগান',
      legendPublicRoad: 'সরকারি পাকা রাস্তা',
      legendSharedPond: 'যৌথ ব্যবহার্য পারিবারিক পুকুর',
      legendPrivatePath: 'ব্যক্তিগত চলাচলের পথ (নিকাশ)',
      selectedPlot: 'নির্বাচিত দাগের তথ্য',
      clickPrompt: 'বিস্তারিত তথ্য দেখতে মানচিত্রের যেকোনো দাগে ক্লিক করুন।',
      dagNumber: 'দাগ নম্বর',
      mouzaName: 'মৌজা',
      area: 'জমির পরিমাণ',
      estValue: 'আনুমানিক মূল্য',
      currentUse: 'বর্তমান ব্যবহার',
      classification: 'জমির শ্রেণী',
      roadAccess: 'রাস্তা প্রবেশাধিকার',
      discrepancies: 'শনাক্তকৃত অসঙ্গতি',
      viewDna: 'জমির ডিএনএ দেখুন',
      fileUploadAlertTitle: 'মানচিত্রের ফাইল আপলোড সম্পন্ন (ডেমো মোড)',
      fileUploadAlertDesc: 'গৃহীত হয়েছে। এই ডেমোতে স্বয়ংক্রিয় ওসিআর ও সীমানা শনাক্তকরণ সিমুলেট করা হয় — এটি পূর্বনির্ধারিত কৃত্রিম ফলাফল, কোনো বহিরাগত সার্ভারে ডেটা পাঠানো হয় না।',
      uploadErrorType: 'শুধুমাত্র JPG, PNG এবং PDF ফাইল গ্রহণযোগ্য।',
      uploadErrorSize: 'ফাইলের আকার ২০ মেগাবাইটের বেশি হতে পারবে না।',
    },

    // Land DNA Page
    landDna: {
      title: 'জমির ডিএনএ — ডিজিটাল পরিচিতি',
      subtitle: 'প্রতিটি দাগের পূর্ণাঙ্গ ডিজিটাল পরিচয়পত্র ও পরচা ধারাবাহিকতা — কৃত্রিম ডেমো ডেটা',
      alertInfo: 'জমির ডিএনএ হলো প্রতিটি দাগের পূর্ণ ইতিহাস ও ডিজিটাল পরিচয়। নিচের সকল খতিয়ান, নামজারি, দাগের পরিমাপ ও অসঙ্গতি কৃত্রিম ডেমো ডেটা হিসেবে সাজানো। কোনো সরকারি পোর্টাল থেকে আসল তথ্য নেওয়া হয়নি।',
      selectPlot: 'ডিএনএ দেখতে দাগ নির্বাচন করুন',
      completeness: 'রেকর্ডের সম্পূর্ণতা',
      identityCard: 'দাগের ডিজিটাল পরিচিতিপত্র',
      basicDetails: 'মৌলিক বিবরণ',
      mouzaCode: 'মৌজা কোড',
      soilType: 'মাটির ধরন',
      recordsAndDocs: 'রেকর্ড ও দলিলের ধারাবাহিক ইতিবৃত্ত',
      docType: 'দলিল/খতিয়ানের ধরন',
      docNumber: 'নম্বর',
      docYear: 'সাল',
      recordedOwner: 'রেকর্ডভুক্ত মালিক',
      recordedArea: 'রেকর্ডকৃত পরিমাণ',
      docStatus: 'অবস্থা',
      notes: 'মন্তব্য',
      discrepancyReport: 'শনাক্তকৃত অসঙ্গতি রিপোর্ট',
      severity: 'মাত্রা',
      field: 'বিষয়/ক্ষেত্র',
      docVal: 'দলিলে উল্লিখিত তথ্য',
      recordVal: 'রেকর্ডের তথ্য',
      explanation: 'ব্যাখ্যা ও সমাধান',
      timelineTitle: 'মালিকানা ও হস্তান্তরের ঐতিহাসিক টাইমলাইন',
      noDiscrepancy: 'এই দাগের রেকর্ডে কোনো অসঙ্গতি পাওয়া যায়নি।',
    },

    // Verification Page
    verification: {
      title: 'রেকর্ড যাচাইকরণ',
      subtitle: 'নিয়মভিত্তিক খতিয়ান ও দলিলের ক্রস-যাচাই — কৃত্রিম ডেমো ডেটা',
      alertInfo: 'রেকর্ড যাচাইকরণ কৃত্রিম ডেমো ডেটাসেটের ভিত্তিতে নিয়মভিত্তিক পরীক্ষা চালায়। এটি সরাসরি কোনো সরকারি ভূমি ডাটাবেজে সংযোগ করে না বা আইনি মালিকানা সনদ প্রদান করে না। এটি একটি সিদ্ধান্ত সহায়ক প্ল্যাটফর্ম।',
      selectPlotToVerify: 'যাচাই করার জন্য দাগ নির্বাচন করুন',
      checkPlotVsRecord: 'দাগের তথ্যের সাথে রেকর্ডের মিল পরীক্ষা',
      runCrossCheck: 'যাচাইকরণ পরীক্ষা চালান',
      allMatched: 'সবগুলো যাচাইকৃত তথ্য ডেমো রেকর্ডের সাথে মিলেছে।',
      discrepancyFound: 'টি তথ্যে অমিল/অসঙ্গতি পাওয়া গেছে।',
      checksMatrix: 'স্বয়ংক্রিয় সামঞ্জস্যতা পরীক্ষা',
      chainTitle: 'মালিকানা স্বত্বের ধারাবাহিকতা যাচাই',
      chainDesc: 'সিএস (১৯৮৪) থেকে এসএ (১৯৯৫) এবং বর্তমান ওয়ারিশান নামজারি পর্যন্ত ধারাবাহিকতা নিরীক্ষা।',
      areaMath: 'জমির পরিমাপের গাণিতিক সামঞ্জস্যতা',
      areaMathDesc: 'বিভিন্ন খতিয়ান ও দাগসূচির শতাংশ ও একরের পরিমাপের মধ্যে মিল যাচাই।',
      mutationStatus: 'নামজারি ও জমাভাগ নিবন্ধন যাচাই',
      mutationStatusDesc: 'উপজেলা ভূমি অফিসে বৈধ নামজারি ও ডিসিআর পরিশোধিত কি না তা পরীক্ষা।',
      roadReserve: 'রাস্তার অধিগ্রহণ ও রিজার্ভ সীমানা ক্লিয়ারেন্স',
      roadReserveDesc: 'সরকারি রাস্তার অধিগ্রহণ সীমানা থেকে নির্ধারিত দূরত্ব বজায় আছে কি না যাচাই।',
      detectedDiscrepancies: 'শনাক্তকৃত অসঙ্গতি ও সতর্কতা',
      fieldCol: 'ক্ষেত্র',
      userValCol: 'প্রদত্ত তথ্য',
      recordValCol: 'ডেমো রেকর্ড',
      statusCol: 'অবস্থা',
      resultCol: 'বিশ্লেষণ ও ফলাফল',
    },

    // Inheritance Page
    inheritance: {
      title: 'উত্তরাধিকার ব্যবস্থাপনা',
      subtitle: 'বণ্টন পরিকল্পনার জন্য ওয়ারিশদের হিস্যা ব্যবস্থাপনা — কৃত্রিম ডেমো ডেটা',
      legalDisclaimerTitle: 'আইনি সতর্কবার্তা',
      legalDisclaimer: 'এখানে উল্লেখিত শতকরা হিস্যার হার শুধুমাত্র ডেমো ও পরীক্ষামূলক ব্যবহারের জন্য। এটি কোনো ধর্মীয় বা আদালতের আইনি সিদ্ধান্ত নয়। আইনসম্মত ওয়ারিশান সনদ ও ফারায়েজের জন্য যোগ্য আইনজীবী বা আদালতের শরণাপন্ন হোন। এটি সিদ্ধান্ত গ্রহণে সহায়ক একটি টুল।',
      saveAndRecalc: 'সংরক্ষণ ও পুনর্গণনা',
      savedSuccess: 'হিস্যা সংরক্ষিত হয়েছে — বণ্টন পরিকল্পনা পুনর্গণনা সম্পন্ন।',
      caseInfo: 'কেসের তথ্যাবলি',
      caseId: 'কেস নম্বর',
      caseName: 'কেসের নাম',
      totalArea: 'মোট জমির পরিমাণ',
      totalValue: 'মোট প্রাক্কলিত মূল্য',
      noHeirs: 'ওয়ারিশ সংখ্যা',
      noPlots: 'দাগ সংখ্যা',
      heirsList: 'ওয়ারিশ তালিকা ও প্রাপ্য হিস্যা',
      heirName: 'ওয়ারিশের নাম',
      relation: 'সম্পর্ক',
      entitlementPct: 'প্রাপ্য হিস্যা %',
      entitledArea: 'প্রাপ্য জমির পরিমাণ',
      entitledValue: 'প্রাপ্য আনুমানিক মূল্য',
      adjustShare: 'হিস্যা সমন্বয় করুন',
      validationTotal: 'মোট হিস্যা অবশ্যই ঠিক ১০০% হতে হবে। বর্তমানে আছে: ',
      validationValid: 'মোট হিস্যা ১০০% পূর্ণ হয়েছে। বণ্টন পরিকল্পনা তৈরি সম্ভব।',
    },

    // Partition Page
    partition: {
      title: 'বণ্টন অপটিমাইজার',
      subtitle: 'অ্যালগরিদমভিত্তিক বহু-পরিকল্পনা সমবণ্টন ইঞ্জিন — কৃত্রিম ডেমো ডেটা',
      regenerate: 'পুনরায় পরিকল্পনা তৈরি করুন',
      generating: 'পরিকল্পনা তৈরি হচ্ছে…',
      disclaimerTitle: 'সিদ্ধান্ত সহায়তার নির্দেশিকা',
      disclaimer: 'নিচের বণ্টন পরিকল্পনাগুলো গাণিতিক অপটিমাইজেশন অ্যালগরিদমের মাধ্যমে স্বয়ংক্রিয়ভাবে তৈরি। এগুলো সহ-মালিকদের মধ্যে সমঝোতার ভিত্তি হিসেবে প্রস্তাবিত — এটি কোনো চূড়ান্ত বা আইনত বাধ্যতামূলক আদালত ডিক্রি নয়।',
      tabOverview: 'পরিকল্পনার সারসংক্ষেপ ও স্কোর',
      tabMap: 'বণ্টন মানচিত্র প্রিভিউ',
      tabAllocations: 'ওয়ারিশভিত্তিক বরাদ্দ তালিকা',
      tabComparison: 'পরিকল্পনাসমূহের তুলনা',
      planAreaFocused: 'সম-ক্ষেত্রফল অগ্রাধিকার',
      planValueBalanced: 'সম-মূল্য অগ্রাধিকার',
      planAccessFocused: 'সরাসরি রাস্তা অগ্রাধিকার',
      planAreaFocusedDesc: 'সকল ওয়ারিশের মধ্যে জমির পরিমাণ (শতাংশ) যথাসম্ভব সমান রাখার দিকে সর্বাধিক গুরুত্ব দেয়।',
      planValueBalancedDesc: 'রাস্তা ও উচ্চ মূল্যের জমির সাথে পেছনের জমি সমন্বয় করে সকল ওয়ারিশের মোট বাজারমূল্য সমান করে।',
      planAccessFocusedDesc: 'প্রত্যেক ওয়ারিশের জন্য নিজস্ব পাকা বা ব্যক্তিগত রাস্তা নিশ্চিত করে যাতে কোনো অংশীদার পথহীন না হয়।',
      scores: 'বহুমুখী মূল্যায়ন স্কোর',
      overallScore: 'সামগ্রিক অপটিমাইজেশন স্কোর',
      areaFairness: 'জমির পরিমাণের সমতা',
      valueFairness: 'বাজারমূল্যের সমতা',
      accessScore: 'রাস্তা প্রবেশাধিকার',
      shapeQuality: 'প্লটের আকৃতি মান',
      advantages: 'প্রধান সুবিধাসমূহ',
      disadvantages: 'সীমাবদ্ধতা ও বিবেচ্য বিষয়',
      allocationsTableTitle: 'ওয়ারিশদের মধ্যে জমি বরাদ্দের বিবরণ',
      colHeir: 'ওয়ারিশ',
      colAllocatedArea: 'বরাদ্দকৃত জমি',
      colTargetArea: 'প্রাপ্য জমি',
      colAreaDev: 'জমির তারতম্য',
      colAllocatedVal: 'বরাদ্দকৃত মূল্য',
      colTargetVal: 'প্রাপ্য মূল্য',
      colValDev: 'মূল্যের তারতম্য',
      colAccess: 'রাস্তা প্রাপ্তি',
    },

    // Heatmap Page
    heatmap: {
      title: 'বিরোধ হিটম্যাপ',
      subtitle: 'স্থানিক বিরোধের ঝুঁকি ও সীমানা দ্বন্দ্ব বিশ্লেষণ — কৃত্রিম ডেমো ডেটা',
      disclaimerTitle: 'গুরুত্বপূর্ণ সতর্কতা',
      disclaimer: 'এই হিটম্যাপে প্রদর্শিত ঝুঁকির সূচকগুলো কৃত্রিম ডেমো ডেটার ভিত্তিতে অ্যালগরিদমিক অনুমানের মাধ্যমে তৈরি। এগুলো কোনো আদালতের মামলার ভবিষ্যৎবাণী নয়, বরং অংশীদারদের সম্ভাব্য জটিলতা চিহ্নিত করে আলোচনার সুযোগ তৈরি করে দেয়।',
      maxRiskBadge: 'সর্বোচ্চ বিরোধ ঝুঁকি স্কোর',
      riskHigh: 'উচ্চ বিরোধের ঝুঁকি',
      riskMedium: 'মাঝারি ঝুঁকি',
      riskLow: 'কম ঝুঁকি',
      riskBreakdown: 'স্থানিক দ্বন্দ্ব ও ঝুঁকির কারণসমূহ',
      indicatorAreaMismatch: 'জরিপ ও খতিয়ানের পরিমাপে অমিল',
      indicatorRoadAccess: 'চলাচলের পথের সংকট',
      indicatorMutation: 'অনিষ্পন্ন নামজারি জটিলতা',
      indicatorSharedResource: 'যৌথ পুকুর ব্যবহারের নির্ভরতা',
      mitigationRecommendations: 'বিরোধ নিরসনে সুপারিশমালা',
      rec1: 'বণ্টননামা দলিলের পূর্বে দাগ ১২৪৭-এর এসএ ও সিএস খতিয়ানের ২.৫ শতাংশের অমিল দূর করতে সরকারি আমিন দ্বারা যৌথ পরিমাপ করুন।',
      rec2: 'উপজেলা ভূমি অফিস থেকে দাগ ১২৫০-এর বকেয়া নামজারি দ্রুত সম্পন্ন করে নির্ভেজাল মালিকানা নিশ্চিত করুন।',
      rec3: 'দাগ ১২৫০-এর জন্য স্থায়ী রেজিস্ট্রিকৃত চলাচলের পথ (নিকাশ) নিশ্চিত করুন যাতে জমিটি অবরুদ্ধ না থাকে।',
      rec4: 'বণ্টনের পর বিরোধ এড়াতে যৌথ পারিবারিক পুকুরের জন্য একটি লিখিত ব্যবস্থাপনা চুক্তি সম্পাদন করুন।',
    },

    // Simulator Page
    simulator: {
      title: 'পরিস্থিতি সিমুলেটর',
      subtitle: 'বণ্টন ও রাস্তা পরিবর্তনের সম্ভাব্যতা পরীক্ষা — কৃত্রিম ডেমো ডেটা',
      disclaimerTitle: 'সিমুলেশন ব্যবহারের শর্তাবলী',
      disclaimer: 'এই সিমুলেটরে আপনি ওয়ারিশদের হিস্যার তারতম্য, রাস্তার প্রশস্ততা এবং অ্যালগরিদমের অগ্রাধিকার পরিবর্তন করে ফলাফল দেখতে পারেন। এই সমস্ত ফলাফল গাণিতিক সিমুলেশন — আইনি সিদ্ধান্ত নয়।',
      controlsTitle: 'সিমুলেশন প্যারামিটারসমূহ',
      sharesSection: 'ওয়ারিশদের হিস্যা পরিবর্তন (%)',
      weightsSection: 'অপটিমাইজেশন লক্ষ্যের গুরুত্ব (%)',
      areaWeight: 'ক্ষেত্রফলের সমতার গুরুত্ব',
      valueWeight: 'মূল্যের সমতার গুরুত্ব',
      accessWeight: 'রাস্তা নিশ্চিতকরণের গুরুত্ব',
      roadWidth: 'সর্বনিম্ন রাস্তা/পথের প্রশস্ততা (মিটার)',
      pondOption: 'যৌথ পুকুর বণ্টন ব্যবস্থা',
      pondShared: 'যৌথ রাখা হবে (সকলের সমান অধিকার)',
      pondHeirA: 'ওয়ারিশ ক-কে বরাদ্দ (অন্যান্য জমি সমন্বয়সহ)',
      pondHeirB: 'ওয়ারিশ খ-কে বরাদ্দ (অন্যান্য জমি সমন্বয়সহ)',
      pondHeirC: 'ওয়ারিশ গ-কে বরাদ্দ (অন্যান্য জমি সমন্বয়সহ)',
      runSimulation: 'সিমুলেশন চালান',
      running: 'গণনা চলছে…',
      resetDefaults: 'ডিফল্ট মানে ফিরিয়ে নিন',
      simulationResults: 'মূল পরিকল্পনার সাথে সিমুলেশনের তুলনামূলক ফলাফল',
      impactSummary: 'সিমুলেশনের ফলাফলের সংক্ষিপ্ত বিবরণ',
    },

    // Reports Page
    reports: {
      title: 'প্রতিবেদন ও দলিল',
      subtitle: 'বণ্টন পরিকল্পনা রিপোর্ট ও খসড়া বণ্টননামা — কৃত্রিম ডেমো ডেটা',
      printBtn: 'প্রিন্ট / পিডিএফ ডাউনলোড',
      selectPlan: 'রিপোর্টের জন্য পরিকল্পনা নির্বাচন করুন',
      docHeader: 'পারিবারিক ভূমি বণ্টন পরিকল্পনা ও পরামর্শ প্রতিবেদন',
      docSubheader: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার (ডেমো টেমপ্লেট)',
      mouzaCase: 'কেস: সোনারগাঁও মৌজা পারিবারিক ভূমি বণ্টন নিষ্পত্তি',
      generatedDate: 'রিপোর্ট তৈরির তারিখ',
      docDisclaimer: 'দাপ্তরিক বিজ্ঞপ্তি: এই প্রতিবেদনটি জমি-শেয়ার কৃত্রিম বুদ্ধিমত্তা ও সিদ্ধান্ত সহায়ক ইঞ্জিন দ্বারা প্রণীত। এটি কোনো আদালত কর্তৃক জারি করা বণ্টন ডিক্রি বা রেজিস্ট্রিকৃত বণ্টননামা দলিলের বিকল্প নয়। সমস্ত সীমানা ও তথ্য কৃত্রিম ডেমো ডেটা।',
      sectionCaseDetails: '১. কেসের সাধারণ বিবরণ',
      sectionAllocations: '২. প্রস্তাবিত বণ্টন তফসিল (ওয়ারিশভিত্তিক বরাদ্দ)',
      sectionRisks: '৩. শনাক্তকৃত রেকর্ড ও সীমানা অসঙ্গতি',
      sectionSignatures: '৪. সকল সহ-মালিক ও ওয়ারিশদের সম্মতি স্বাক্ষর',
      signatureNotice: 'নিচে স্বাক্ষরকারী সকল ওয়ারিশ ঘোষণা করিতেছেন যে তাহারা এই প্রস্তাবিত বণ্টন পরিকল্পনা পর্যালোচনা করিয়াছেন:',
      dagSchedule: 'দাগ ও খতিয়ানভিত্তিক পূর্ণাঙ্গ তফসিল',
      witnessSignatures: 'সাক্ষীগণ ও সার্ভেয়ার / আমিনের প্রত্যয়ন',
    },
  },
};
