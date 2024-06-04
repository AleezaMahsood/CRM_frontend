'use client';

import React, { useEffect } from 'react';
import '../styles/LeadTable.css';

const LeadTable = ({ title, data, tableId, entriesPerPageSelectId, paginationId, headings, rows, handleEdit }) => {
  useEffect(() => {
    if (Array.isArray(data)) {
      const table = document.getElementById(tableId);
      const pagination = document.getElementById(paginationId);
      const entriesPerPageSelect = document.getElementById(entriesPerPageSelectId);

      let currentPage = 1;
      let entriesPerPage = parseInt(entriesPerPageSelect.value);

      function displayEntries() {
        const indexOfLastEntry = currentPage * entriesPerPage;
        const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
        const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry);

        table.querySelector('tbody').innerHTML = '';

        currentEntries.forEach(entry => {
          const row = document.createElement('tr');
          rows.forEach(rowItem => {
            const cell = document.createElement('td');

            if (rowItem === 'nameEmail') {
              cell.innerHTML = `<strong>${entry.firstName} ${entry.lastName}</strong><br/><a href="mailto:${entry.email}">${entry.email}</a>`;
            } 
            else if (rowItem === 'leadNamePhone') {
              cell.innerHTML = `<strong>${entry.leadName}</strong><br/><a href="mailto:${entry.phoneNumber}">${entry.phoneNumber}</a>`;
            }
            else if (rowItem === 'user_id_Dept') {
              cell.innerHTML = `<strong>${entry.firstName} ${entry.lastName}</strong><br/><a href="mailto:${entry.department}">${entry.department}</a>`;
            }
            else if (entry[rowItem] === null || entry[rowItem] === undefined) {
              cell.textContent = '-'; 
            }
            else {
              cell.textContent = entry[rowItem] ?? 'N/A';
            }

            row.appendChild(cell);
          });

          const actionCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.textContent = 'Edit';
          editButton.className = 'edit-button';
          editButton.id = `editButton-${entry.id}`;
          editButton.addEventListener('click', () => handleEdit(entry.id));
          actionCell.appendChild(editButton);
          row.appendChild(actionCell);
          table.querySelector('tbody').appendChild(row);
        });
      }

      function displayPagination() {
        pagination.innerHTML = '';
        const totalPages = Math.ceil(data.length / entriesPerPage);
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
  }, [data, tableId, entriesPerPageSelectId, paginationId, rows, handleEdit]);

  return (
    <div className="table-container">
      <h2 className="table-title">{title}</h2>
      <div className="table-wrapper">
        <table id={tableId}>
          <thead>
            <tr>
              {headings.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
              <th>ACTION</th>
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
        <div id={paginationId} className="pagination"></div>
      </div>
    </div>
  );
};

export default LeadTable;
