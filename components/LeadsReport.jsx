"use client";
import useLeadStats from '@/hooks/useLeadStats';
import '../styles/LeadReport.css'

const  LeadReport= () => {
  const {data,isError,isLoading}=useLeadStats();
  return (
    <div className="container">
      <div className="report">
        <h2>Leads Report</h2>
        <a href="#" className="export">Export Data</a>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="24" height="24" viewBox="0 0 24 24" 
        // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
        ><path d="M16 2H8C4.691 2 2 4.691 2 8v13a1 1 0 0 0 1 1h13c3.309 0 6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 14c0 2.206-1.794 4-4 4H4V8c0-2.206 1.794-4 4-4h8c2.206 0 4 1.794 4 4v8z">
            </path>
            <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4z"></path>
        </svg>
          <span className="heading">New</span>
          <span>{data?.New} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         >
            <path d="M12 4c-4.879 0-9 4.121-9 9s4.121 9 9 9 9-4.121 9-9-4.121-9-9-9zm0 16c-3.794 0-7-3.206-7-7s3.206-7 7-7 7 3.206 7 7-3.206 7-7 7z"></path>
            <path d="M13 12V8h-2v6h6v-2zm4.284-8.293 1.412-1.416 3.01 3-1.413 1.417zm-10.586 0-2.99 2.999L2.29 5.294l2.99-3z"></path>
        </svg>
          <span className="heading">Pending</span>
          <span>{data?.Pending} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="m20.292 6.708-3.01-3 1.412-1.417 3.01 3zm1.415 13.585-2.287-2.287C20.409 16.563 21 14.838 21 13c0-4.879-4.121-9-9-9-1.838 0-3.563.591-5.006 1.58L5.91 4.496l.788-.79-1.416-1.412-.786.788-.789-.789-1.414 1.414 18 18 1.414-1.414zM12 6c3.794 0 7 3.206 7 7 0 1.292-.387 2.507-1.027 3.559L15.414 14H17v-2h-3.586L13 11.586V8h-2v1.586L8.441 7.027C9.493 6.387 10.708 6 12 6zM4.305 8.426A8.792 8.792 0 0 0 3 13c0 4.879 4.121 9 9 9a8.792 8.792 0 0 0 4.574-1.305l-1.461-1.461A6.801 6.801 0 0 1 12 20c-3.794 0-7-3.206-7-7 0-1.111.281-2.169.766-3.113L4.305 8.426z"></path>
        </svg>
          <span className="heading">Not Responding</span>
          <span>{data?.['Not Responding']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="M10.09 12.5a8.92 8.92 0 0 1-1-2.2l1.59-1.59a1 1 0 0 0 0-1.42l-4-4a1 1 0 0 0-1.41 0L2.59 6A2 2 0 0 0 2 7.44 15.44 15.44 0 0 0 5.62 17L2.3 20.29l1.41 1.42 18-18-1.41-1.42zM7 15.55a13.36 13.36 0 0 1-3-8.13l2-2L8.59 8 7.3 9.29a1 1 0 0 0-.27.92 11 11 0 0 0 1.62 3.73zm9.71-2.26a1 1 0 0 0-1.41 0l-1.6 1.6-.34-.12-1.56 1.55a12.06 12.06 0 0 0 2 .66 1 1 0 0 0 .91-.27l1.3-1.3L18.59 18l-2 2A13.61 13.61 0 0 1 10 18.1l-1.43 1.45a15.63 15.63 0 0 0 8 2.45 2 2 0 0 0 1.43-.58l2.71-2.71a1 1 0 0 0 0-1.42z">
            </path></svg>
          <span className="heading">Not Answering</span>
          <span>{data?.['Not Answering']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         >
            <path d="M5 18v3.766l1.515-.909L11.277 18H16c1.103 0 2-.897 2-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h1zM4 8h12v8h-5.277L7 18.234V16H4V8z"></path>
        <path d="M20 2H8c-1.103 0-2 .897-2 2h12c1.103 0 2 .897 2 2v8c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z">
            </path>
            </svg>
          <span className="heading">Meetings</span>
          <span>{data?.['Meeting Scheduled']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
        ><path d="m15.71 15.71 2.29-2.3 2.29 2.3 1.42-1.42-2.3-2.29 2.3-2.29-1.42-1.42-2.29 2.3-2.29-2.3-1.42 1.42L16.58 12l-2.29 2.29zM12 8a3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4 3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4zM6 8a1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2 1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z">
            </path></svg>
          <span className="heading">Not Interested</span>
          <span>{data?.['Not Interested']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
        ><path d="M20.29 8.29 16 12.58l-1.3-1.29-1.41 1.42 2.7 2.7 5.72-5.7zM4 8a3.91 3.91 0 0 0 4 4 3.91 3.91 0 0 0 4-4 3.91 3.91 0 0 0-4-4 3.91 3.91 0 0 0-4 4zm6 0a1.91 1.91 0 0 1-2 2 1.91 1.91 0 0 1-2-2 1.91 1.91 0 0 1 2-2 1.91 1.91 0 0 1 2 2zM4 18a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2v-1a5 5 0 0 0-5-5H7a5 5 0 0 0-5 5v1h2z">
            </path></svg>
          <span className="heading">Interested</span>
          <span>{data?.['Interested']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z">
            </path></svg>
          <span className="heading">Converted</span>
          <span>{data?.['Converted']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="M20 3H6.693A2.01 2.01 0 0 0 4.82 4.298l-2.757 7.351A1 1 0 0 0 2 12v2c0 1.103.897 2 2 2h5.612L8.49 19.367a2.004 2.004 0 0 0 .274 1.802c.376.52.982.831 1.624.831H12c.297 0 .578-.132.769-.36l4.7-5.64H20c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zm-8.469 17h-1.145l1.562-4.684A1 1 0 0 0 11 14H4v-1.819L6.693 5H16v9.638L11.531 20zM18 14V5h2l.001 9H18z">
            </path></svg>
          <span className="heading">Rejected</span>
          <span>{data?.['Rejected']} Leads</span>
        </div>
        <div className="reportItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
            </path></svg>
          <span className="heading">Invalid</span>
          <span>{data?.['Invalid']} Leads</span>
        </div>
      </div>
      <div className="conversion">
        <h2>Leads Conversion</h2>
        <a href="#" className="export">Export Data</a>
        <div className="conversionItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" 
        // style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
        ><path d="M4 6h2v2H4zm0 5h2v2H4zm0 5h2v2H4zm16-8V6H8.023v2H18.8zM8 11h12v2H8zm0 5h12v2H8z">
            </path></svg>
          <span className="heading">Overall</span>
          <span>{data?.['total_leads']} Leads</span>
        </div>
        <div className="conversionItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         >
            <path d="M7 20h2V8h3L8 4 4 8h3zm13-4h-3V4h-2v12h-3l4 4z"></path></svg>
          <span className="heading">Conversion Rate</span>
          <span>0.48%</span>
        </div>
        <div className="conversionItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="M20 8h-5.612l1.123-3.367c.202-.608.1-1.282-.275-1.802S14.253 2 13.612 2H12c-.297 0-.578.132-.769.36L6.531 8H4c-1.103 0-2 .897-2 2v9c0 1.103.897 2 2 2h13.307a2.01 2.01 0 0 0 1.873-1.298l2.757-7.351A1 1 0 0 0 22 12v-2c0-1.103-.897-2-2-2zM4 10h2v9H4v-9zm16 1.819L17.307 19H8V9.362L12.468 4h1.146l-1.562 4.683A.998.998 0 0 0 13 10h7v1.819z">
            </path></svg>
          <span className="heading">Closed</span>
          <span>{data?.['Converted']} Leads</span>
        </div>
        <div className="conversionItem">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
        //  style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
         ><path d="M13 9h-3v2h3a1 1 0 0 0 0-2z"></path><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm2.13 15-2.67-4H10v4H8V7h5a3 3 0 0 1 .79 5.88L16.54 17z"></path></svg>
               <span className="heading">Amount Closed</span>
          <span>{data?.['total_budget']} PKR</span>
        </div>
      </div>
    </div>
  );
};

export default LeadReport ;