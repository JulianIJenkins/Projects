/* Import necessary Programs */
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { Link } from 'react-router-dom';

export default function HomePage() {
  /* Implement States */
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [assetRange, setAssetRange] = useState("All");

  /* Define Asset Ranges */
  const assetRanges = [
    { label: "Size of Bank (Assets)", min: 0, max: Infinity },
    { label: "$0 - $1M", min: 0, max: 1_000_000 },
    { label: "$1M - $5M", min: 1_000_000, max: 5_000_000 },
    { label: "$5M - $20M", min: 5_000_000, max: 20_000_000 },
    { label: "$20M - $100M", min: 20_000_000, max: 100_000_000 },
    { label: "$100M - $500M", min: 100_000_000, max: 500_000_000 },
    { label: "$500M+", min: 500_000_000, max: Infinity },
  ];

  /* Parse through CSV file */
  useEffect(() => {
    fetch('/institutions.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
          }
        });
      });
  }, []);

  /* Filter data to return banks that meet conditions */
  const filtered = data.filter((item) => {
    const nameMatch = item.NAME?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const cityMatch = item.CITY?.toLowerCase().includes(searchTerm.toLowerCase()) || "";
    const zipMatch = item.ZIP?.includes(searchTerm) || "";
    const stateMatch = item.STALP?.toLowerCase().includes(searchTerm.toLowerCase()) || "";

    /* Filter data to return banks in asset range  */
    const asset = parseFloat(item.ASSET);
    const selected = assetRanges.find(r => r.label === assetRange);
    const inAssetRange = !selected || (asset >= selected.min && asset < selected.max);
    const matchesState = selectedState === "" || item.STALP === selectedState;

    return (nameMatch || cityMatch || zipMatch || stateMatch) && inAssetRange && matchesState;
  });

  /* Dropdown list of states */
  const uniqueStates = [...new Set(data.map((item) => item.STALP).filter(Boolean))].sort();

  return (
    <div>
      {/* Banner */}
      <img 
        src="/BankHome.jpg" 
        alt="Bank Background" 
        style={{ 
          height: '220px',
          width: '1200px', 
          top: '150px',
          left: '120px',
          position: 'absolute', 
          margin: '0 auto',
          opacity: '0.4'
        }} 
      />

      {/* Subtitle */}
      <p style={{
        fontSize: '35px',
        position: 'absolute',
        top: '140px',
        left: '50%',
        transform: 'translateX(-50%)',
        whiteSpace: 'nowrap',
      }}>
        “Explore 27,000+ U.S. Banks & Financial Institutions”
      </p>

      {/* Header */}
      <p style={{
        fontSize: '18px',
        position: 'absolute',
        top: '200px',
        left: '50%',
        transform: 'translateX(-50%)',
      }}>
        Find active banks by region, size, and services. Make informed decisions with real data.
      </p>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name, city, ZIP..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        style={{
          position: 'absolute',
          top: '255px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          fontSize: '16px',
          width: '600px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      />

      {/* State Filter */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        style={{
          position: 'absolute',
          top: '310px',
          left: '30%',
          transform: 'translateX(-50%)',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        <option value="">All States</option>
        {uniqueStates.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      {/* Asset Range Filter */}
      <select
        value={assetRange}
        onChange={(e) => setAssetRange(e.target.value)}
        style={{
          position: 'absolute',
          top: '310px',
          left: '70%',
          transform: 'translateX(-50%)',
          padding: '10px',
          borderRadius: '8px',
        }}
      >
        {assetRanges.map((range) => (
          <option key={range.label} value={range.label}>
            {range.label}
          </option>
        ))}
      </select>

      {/* Reset Button */}
      <button
        onClick={() => {
          setSearchTerm("");
          setSelectedState("");
          setAssetRange("All");
        }}
        style={{
          position: 'absolute',
          top: '315px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#0077cc',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Reset Filters
      </button>

      {/* Search Results */}
      {isFocused && (
        <div style={{
          position: 'absolute',
          top: '410px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: 'black',
          opacity: '0.5',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '20px',
        }}>
        {filtered.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {filtered.map((item, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>
                  <Link to={`/institution/${item.CERT}`} style={{ textDecoration: 'none', color: '#00c7ff' }}>
                    <strong>{item.NAME}</strong> — {item.CITY}, {item.STALP} {item.ZIP}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: 'white' }}>No matching banks found.</p>
          )}
        </div>
      )}
    </div>
  );
}
