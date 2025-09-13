'use client';

import { useState } from 'react';

interface LanguageOption {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
  proficiency: 'fluent' | 'conversational' | 'basic';
}

interface DriverLanguage {
  driverId: string;
  driverName: string;
  languages: string[];
  specialties: string[];
  rating: number;
  available: boolean;
}

const supportedLanguages: LanguageOption[] = [
  { code: 'en', name: 'English', flag: '🇬🇧', nativeName: 'English', proficiency: 'fluent' },
  { code: 'fj', name: 'Fijian', flag: '🇫🇯', nativeName: 'Na Vosa Vakaviti', proficiency: 'fluent' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी', proficiency: 'fluent' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français', proficiency: 'conversational' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch', proficiency: 'conversational' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語', proficiency: 'conversational' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳', nativeName: '中文', proficiency: 'basic' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어', proficiency: 'basic' }
];

const mockDrivers: DriverLanguage[] = [
  {
    driverId: 'DRV001',
    driverName: 'Jone Vakaloloma',
    languages: ['en', 'fj', 'hi'],
    specialties: ['Cultural commentary', 'Local history', 'Restaurant recommendations'],
    rating: 4.9,
    available: true
  },
  {
    driverId: 'DRV002',
    driverName: 'Sarah Chen',
    languages: ['en', 'zh', 'ja'],
    specialties: ['Business transfers', 'Shopping assistance', 'Photography spots'],
    rating: 4.8,
    available: true
  },
  {
    driverId: 'DRV003',
    driverName: 'Pierre Dubois',
    languages: ['en', 'fr', 'de'],
    specialties: ['Wine tours', 'Cultural sites', 'Adventure activities'],
    rating: 4.7,
    available: false
  },
  {
    driverId: 'DRV004',
    driverName: 'Akira Tanaka',
    languages: ['en', 'ja', 'ko'],
    specialties: ['Golf transfers', 'Spa recommendations', 'Traditional crafts'],
    rating: 4.9,
    available: true
  }
];

interface MultilingualConciergeProps {
  onLanguageSelect?: (language: string) => void;
  selectedLanguage?: string;
  showDriverInfo?: boolean;
}

export default function MultilingualConcierge({ 
  onLanguageSelect, 
  selectedLanguage,
  showDriverInfo = true 
}: MultilingualConciergeProps) {
  const [selectedLang, setSelectedLang] = useState<string>(selectedLanguage || 'en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLang(languageCode);
    onLanguageSelect?.(languageCode);
  };

  const getAvailableDrivers = (languageCode: string) => {
    return mockDrivers.filter(driver => 
      driver.languages.includes(languageCode) && driver.available
    );
  };

  const getLanguageInfo = (code: string) => {
    return supportedLanguages.find(lang => lang.code === code);
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case 'fluent': return 'text-green-600 bg-green-100';
      case 'conversational': return 'text-blue-600 bg-blue-100';
      case 'basic': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          🌍 Multilingual Concierge
        </h3>
        <p className="text-sm text-gray-600">
          Select your preferred language for driver communication and cultural commentary
        </p>
      </div>

      {/* Language Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Available Languages</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {supportedLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className={`p-3 rounded-lg border text-left transition-all ${
                selectedLang === language.code
                  ? 'border-brand-emerald bg-brand-emerald-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center mb-1">
                <span className="text-lg mr-2">{language.flag}</span>
                <span className="font-medium text-sm">{language.name}</span>
              </div>
              <div className="text-xs text-gray-500">{language.nativeName}</div>
              <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getProficiencyColor(language.proficiency)}`}>
                {language.proficiency}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Language Info */}
      {selectedLang && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-3">{getLanguageInfo(selectedLang)?.flag}</span>
            <div>
              <h4 className="font-medium text-gray-900">
                {getLanguageInfo(selectedLang)?.name} Concierge Service
              </h4>
              <p className="text-sm text-gray-600">
                {getLanguageInfo(selectedLang)?.nativeName} • {getLanguageInfo(selectedLang)?.proficiency} proficiency
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-700">
            <p>• Driver will communicate in {getLanguageInfo(selectedLang)?.name}</p>
            <p>• Cultural commentary and local tips in your language</p>
            <p>• Restaurant and activity recommendations</p>
            <p>• Assistance with local customs and etiquette</p>
          </div>
        </div>
      )}

      {/* Available Drivers */}
      {showDriverInfo && selectedLang && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Available Drivers</h4>
          <div className="space-y-3">
            {getAvailableDrivers(selectedLang).map((driver) => (
              <div key={driver.driverId} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-brand-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <span className="text-brand-emerald-600 font-semibold">
                        {driver.driverName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{driver.driverName}</h5>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">⭐</span>
                        <span className="text-sm text-gray-600">{driver.rating}/5.0</span>
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
                
                <div className="ml-13">
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">Languages:</span> {
                      driver.languages.map(lang => getLanguageInfo(lang)?.name).join(', ')
                    }
                  </div>
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Specialties:</span> {driver.specialties.join(', ')}
                  </div>
                </div>
              </div>
            ))}
            
            {getAvailableDrivers(selectedLang).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No drivers available for {getLanguageInfo(selectedLang)?.name} at the moment.</p>
                <p className="text-sm">We'll assign the best available driver with English proficiency.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cultural Tips */}
      <div className="mt-6 p-4 bg-brand-emerald-50 rounded-lg">
        <h4 className="font-medium text-brand-emerald-900 mb-2">Cultural Tips</h4>
        <div className="text-sm text-brand-emerald-800 space-y-1">
          <p>• Say "Bula!" (hello) when meeting your driver</p>
          <p>• Remove shoes when entering traditional Fijian homes</p>
          <p>• Accept kava ceremonies with respect</p>
          <p>• Ask permission before taking photos of locals</p>
        </div>
      </div>
    </div>
  );
}
