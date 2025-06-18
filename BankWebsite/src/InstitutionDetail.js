import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // <-- import useNavigate
import Papa from 'papaparse';

export default function InstitutionDetail() {

  const { id } = useParams();
  const navigate = useNavigate();  // <-- create navigate function
  const [institution, setInstitution] = useState(null);

  /* Error Checking */
  const displayValue = (value, isCurrency = false, isPercent = false) => {
    const num = Number(value);

    if (!value || value.trim() === '') return "Not Available";
  
    if (isCurrency) {
      return isNaN(num) ? "Not Available" : `$${num.toLocaleString()}`;
    }
  
    if (isPercent) {
      return `${num.toFixed(2)}%`;
    }
  
    return value;
  };
  
  /* Parse CSV file */
  useEffect(() => {
    fetch('/institutions.csv')
      .then(res => res.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const match = results.data.find((item) => item.CERT === id);
            setInstitution(match);
          }
        });
      });
  }, [id]);

  /* Loading Message */
  if (!institution) {
    return <p style={{ padding: '20px', fontSize: '30px',
    position: 'absolute', top: '200px', left: '100px' }}>Loading...</p>;
  }

  return (
    /* Bank Data */
    <div style={{ position: 'absolute', top: '100px', left: '500px', padding: '30px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', 
      position: 'absolute', top: '00px', left: '-200px', padding: '8px 16px'}}>
        ← Back
      </button>
      <h2>{displayValue(institution.NAME)}</h2>
      <p><strong>City:</strong> {displayValue(institution.CITY)}</p>
      <p><strong>State:</strong> {displayValue(institution.STALP)}</p>
      <p><strong>ZIP:</strong> {displayValue(institution.ZIP)}</p>
      <p><strong>Charter Type:</strong> {displayValue(institution.CHRTAGNT)}</p>
      <p><strong>Established:</strong> {displayValue(institution.ESTYMD)}</p>
      <p><strong>Total Assets:</strong> {displayValue(institution.ASSET, true)}</p>
      <p><strong>Deposits:</strong> {displayValue(institution.DEP, true)}</p>
      <p><strong>Equity Capital:</strong> {displayValue(institution.EQ, true)}</p>
      <p><strong>Net Income:</strong> {displayValue(institution.NETINC, true)}</p>
      <p><strong>Return on Assets:</strong> {displayValue(institution.ROA, false, true)}</p>
      <p><strong>Return on Equity:</strong> {displayValue(institution.ROE, false, true)}</p>
      <p><strong>FDIC Region:</strong> {displayValue(institution.FDICREGN)}</p>
      <p><strong>Regulatory Agency:</strong> {displayValue(institution.REGAGNT)}</p>
      <p><strong>Institution Class:</strong> {displayValue(institution.BKCLASS)}</p>
    </div>
  );
}
