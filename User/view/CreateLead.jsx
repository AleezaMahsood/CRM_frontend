'use client';
import React from 'react'
import styles from '@/styles/user_form.css'
import { useEnums } from '@/hooks/useEnums';
import axios from '@/utils/axios';
const CreateUsers = () => {
    const submitForm=(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        //formData.append('_token', document.querySelector('meta[name="csrf-token"]').content);
        const frmData = {
          firstName: formData.get('first-name'),
          lastName: formData.get('last-name'),
          email: formData.get('email'),
          password: formData.get('password'),
          password_confirmation: formData.get('password_confirmation'),
          phone: formData.get('phone'),
          gender: formData.get('gender'),
          location: formData.get('location'),
          department: formData.get('department'),
          designation: formData.get('designation'),
          team: formData.get('team'),
          role: formData.get('role'),
      };
      
        
      console.log(frmData);
      axios.post(
        "/api/auth/register",
        frmData,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
       }
  const { data: enumsData } = useEnums();
    return (
        <div className={styles.container} style={{paddingLeft: '20%', paddingRight: '20%', paddingTop:"5rem" ,paddingBottom:"5rem"}}>
<div className={styles.box}>
    <form id="Add_Users" onSubmit={submitForm}>

    <div class="form-group">   
        <label for="full-name">Full Name<span className={styles.required}></span></label>
        <div class="input-container">
            <input type="text" id="first-name" name="first-name" placeholder="Enter First Name" required/>
            <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name" required/>
        </div>
    </div>

    <div class="form-group">
        <label for="email">Email<span className={styles.required}></span></label>
        <input type="email" id="email" name="email" placeholder="Enter Email" required/>
    </div>

    <div class="form-group">
        <label for="password">Password<span className={styles.required}></span></label>
        <div c="input-container">
            <input type="password" id="password" name="password" placeholder="Enter Password" required/>
            <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" required/>
        </div>
    </div>

    <div class="form-group">
        <label for="phone">Phone Number<span className={styles.required}></span></label>
        <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" pattern="[0-9]{11}" required />
    </div>
    
    <div class="form-group">
        <label for="gender">Gender<span className={styles.required}></span></label>
        <select id="gender" name="gender" required>
            <option value="" disabled selected>Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
        </select>
    </div>

<div className={styles.box}>
    

        <div class="form-group">
            <label for="location">Location<span className={styles.required}></span></label>
            <select id="location" name="location" required>
                <option value="" disabled selected>Select Location</option>
                {enumsData?.locations?.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
            </select>
        </div>

        <div class="form-group">
            <label for="department">Department<span className={styles.required}></span></label>
            <select id="department" name="department" required>
                <option value="" disabled selected>Select Department</option>
                {enumsData?.departments?.map(department => (
              <option key={department} value={department}>{department}</option>
            ))}
            </select>
        </div>

        <div class="form-group">
            <label for="designation">Designation<span className={styles.required}></span></label>
            <select id="designation" name="designation" required>
                <option value="" disabled selected>Select Designation</option>
                {enumsData?.designations?.map(designation => (
              <option key={designation} value={designation}>{designation}</option> 
                ))}
            </select>
        </div>

        <div class="form-group">
            <label for="team">Team<span className={styles.required}></span></label>
            <select id="team" name="team" required>
                <option value="" disabled selected>Select Team</option>
                {enumsData?.teams?.map(team => (
              <option key={team} value={team}>{team}</option> 
                ))}
            </select>
        </div>

        <div class="form-group">
            <label for="role">Role<span className={styles.required}></span></label>
            <select id="role" name="role" required>
                <option value="" disabled selected>Select Role</option>
                {enumsData?.roles?.map(role => (
              <option key={role} value={role}>{role}</option> 
                ))}
            </select>
        </div>

        <div class="form-group">
            <button type="submit">Confirm</button>
        </div>

        <div class="form-group">
            <button type="reset">Reset</button>
        </div>
</div>
    </form>
</div>
</div>

  )
}
export default CreateUsers
