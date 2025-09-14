'use client';
import React, { useState, useEffect, useRef } from 'react';
import { searchAirports, type Airport } from '@/lib/api';
import { Input } from './ui';

interface AirportComboboxProps {
  label: string;
  value: string;
  onChange: (iata: string) => void;
}

export default function AirportCombobox({ label, value, onChange }: AirportComboboxProps) {
  const [query, setQuery] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      setLoading(true);
      searchAirports(query)
        .then(setAirports)
        .finally(() => setLoading(false));
    } else {
      setAirports([]);
    }
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (airport: Airport) => {
    setQuery(`${airport.iata} - ${airport.name}`);
    onChange(airport.iata);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Input
        ref={inputRef}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        placeholder="Search airports..."
        className="w-full"
      />
      
      {isOpen && (query.length >= 2 || airports.length > 0) && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
        >
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Searching...</div>
          ) : airports.length > 0 ? (
            airports.map((airport) => (
              <button
                key={airport.iata}
                onClick={() => handleSelect(airport)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
              >
                <div className="font-medium">{airport.iata}</div>
                <div className="text-sm text-gray-600">{airport.name}</div>
                <div className="text-xs text-gray-500">{airport.city}, {airport.country}</div>
              </button>
            ))
          ) : query.length >= 2 ? (
            <div className="px-4 py-2 text-gray-500">No airports found</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
