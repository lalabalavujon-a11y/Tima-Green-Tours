'use client';

import { useState, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface DatePickerProps {
  id: string;
  name: string;
  defaultValue?: string; // yyyy-mm-dd
}

export default function DatePicker({ id, name, defaultValue }: DatePickerProps) {
  const [selected, setSelected] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (defaultValue) {
      const parsed = new Date(defaultValue);
      if (!isNaN(parsed.getTime())) setSelected(parsed);
    }
  }, [defaultValue]);

  return (
    <div>
      {/* Hidden input to integrate with FormData */}
      <input type="hidden" id={id} name={name} value={selected ? selected.toISOString().slice(0, 10) : ''} readOnly />
      <div className="border border-slate-300 rounded-lg p-3 bg-white">
        <DayPicker
          mode="single"
          selected={selected}
          onSelect={setSelected}
          captionLayout="dropdown"
          fromYear={new Date().getFullYear()}
          toYear={new Date().getFullYear() + 2}
        />
      </div>
    </div>
  );
}

