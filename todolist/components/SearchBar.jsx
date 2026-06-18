'use client'
import {SearchField} from '@heroui/react';

export default function SearchBar({ value, onChange }) {
    return (
      <div className="flex justify-center">
        <SearchField>
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search todos..."
              className="w-[280px]"
            />
            <SearchField.ClearButton onClick={() => onChange("")} />
          </SearchField.Group>
        </SearchField>
      </div>
    )
}