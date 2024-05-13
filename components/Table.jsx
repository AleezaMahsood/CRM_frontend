'use client'
import React, { useEffect } from 'react';
import '../styles/table.css'
const Table = ({ data, tableId, entriesPerPageSelectId, paginationId, headings, rows }) => {
  useEffect(() => {
    if(data){
    const table = document.getElementById(tableId);
    const pagination = document.getElementById(paginationId);
    const entriesPerPageSelect = document.getElementById(entriesPerPageSelectId);

    let currentPage = 1;
    let entriesPerPage = parseInt(entriesPerPageSelect.value);

    function displayEntries() {
      const indexOfLastEntry = currentPage * entriesPerPage;
      const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
      const currentEntries = data?.slice(indexOfFirstEntry, indexOfLastEntry);

      table.querySelector('tbody').innerHTML = '';

      currentEntries?.forEach(entry => {
        const row = document.createElement('tr');
        rows.forEach(rowItem => {
          const cell = document.createElement('td');
          // Check if the entry value is null or undefined
          if (entry[rowItem] === null || entry[rowItem] === undefined) {
            cell.textContent = 'N/A'; // Set cell content to 'N/A' for null or undefined values
          } else {
            cell.textContent = entry[rowItem]; // Otherwise, set cell content to the entry value
          }
          row.appendChild(cell);
        });
        table.querySelector('tbody').appendChild(row);
      });
      
    }

    function displayPagination() {
      pagination.innerHTML = '';
      const totalPages = Math.ceil(data?.length / entriesPerPage);
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => {
          currentPage = i;
          displayEntries();
          displayPagination();
        });
        pagination.appendChild(button);
      }
    }

    entriesPerPageSelect.addEventListener('change', () => {
      entriesPerPage = parseInt(entriesPerPageSelect.value);
      currentPage = 1;
      displayEntries();
      displayPagination();
    });

    displayEntries();
    displayPagination();
     }
  }, [data, tableId, entriesPerPageSelectId, paginationId, rows]);

  return (
    <div className="table-container">
      <h2>All Leads</h2>
      <div className="table-wrapper">
        <table id={tableId}>
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Table entries will be dynamically added here */}
          </tbody>
        </table>
      </div>
      <div className="container">
        <div id="pagination-options">
          <select id={entriesPerPageSelectId}>
            <option value={10} selected>10 entries</option>
            <option value={15}>15 entries</option>
            <option value={20}>20 entries</option>
            <option value={25}>25 entries</option>
            <option value={50}>50 entries</option>
          </select>
        </div>
        <div id={paginationId}></div>
      </div>
    </div>
  );
}

export default Table;