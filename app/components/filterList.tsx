import React from 'react';

interface FilterListProps {
  filter: string;
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FilterList({ filter, onFilterChange }: FilterListProps) {
  return (
    <div className='pb-4'>
      <label htmlFor="filter"  className="block mb-2 text-sm text-gray-900 font-medium">Input Filter</label>
      <input
        name='filter'
        type="text"
        id="filter"
        value={filter}
        onChange={onFilterChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Filter by any field"
        required
      />
    </div>
  );
}
