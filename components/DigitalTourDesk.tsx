'use client';

import { useState } from 'react';
import Container from './Container';

interface DigitalTourDeskProps {
  propertyCode: string;
  propertyName: string;
  qrCodeUrl: string;
  whatsappNumber?: string;
}

export default function DigitalTourDesk({ 
  propertyCode, 
  propertyName, 
  qrCodeUrl, 
  whatsappNumber = '+6791234567' 
}: DigitalTourDeskProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const whatsappMessage = `Bula Sia, I am at ${propertyCode}`;
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-auto">
      {/* QR Code Section */}
      <div className="text-center mb-6">
        <div className="bg-brand-emerald-50 rounded-lg p-4 mb-4">
          <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-brand-emerald-300">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs text-gray-500">QR Code</span>
              </div>
              <p className="text-xs text-gray-600">Scan to chat with Sia</p>
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Bula! 🌺
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Scan to chat with <strong>Sia</strong> — your Fiji Tours & Transfers Expert
        </p>
        <p className="text-xs text-gray-500">
          Instant quotes • Local tips • 24/7
        </p>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full bg-brand-emerald text-white py-3 px-4 rounded-lg font-medium hover:bg-brand-emerald-700 transition-colors"
        >
          {isExpanded ? 'Hide Options' : 'Quick Book Transfer'}
        </button>
        
        {isExpanded && (
          <div className="space-y-2">
            <button className="w-full bg-blue-50 text-blue-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              🚗 Airport Transfer
            </button>
            <button className="w-full bg-green-50 text-green-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
              🏝️ Island Connection
            </button>
            <button className="w-full bg-purple-50 text-purple-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors">
              🎯 Today's Tours
            </button>
          </div>
        )}
      </div>

      {/* WhatsApp Direct */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-xs text-gray-500 text-center mb-3">
          Prefer WhatsApp? Message us directly:
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full bg-green-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          WhatsApp Sia
        </a>
      </div>

      {/* Property Info */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          At {propertyName}
        </p>
        <p className="text-xs text-gray-400 text-center">
          Operated by Tima Green Tours
        </p>
      </div>
    </div>
  );
}
