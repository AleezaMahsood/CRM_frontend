'use client';
import React from 'react';
import styles from '@/styles/user_form.css';
import { useEnums } from '@/hooks/useEnums';
import axios from '@/utils/axios';

const CreateUsers = () => {
    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
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
    };

    const { data: enumsData } = useEnums();

    return (
        <div className={styles.container} id="main">
            <h2 className="heading">New User</h2>
            <hr></hr>
            <h3 className="subheading">User Details</h3>
            <p className="description">Add details such as name, email, phone number and other personal information.</p>
            <div className={styles.box}>
                <form id="Add_Users" onSubmit={submitForm} className="form">
                    <div className="form-group">
                        <label htmlFor="full-name" className="label">Full Name:<span className={styles.required}></span></label>
                        <div className="input-container">
                            <input type="text" id="first-name" name="first-name" placeholder="Enter First Name" className="input" required />
                            <input type="text" id="last-name" name="last-name" placeholder="Enter Last Name" className="input" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email:<span className={styles.required}></span></label>
                        <input type="email" id="email" name="email" placeholder="Enter Email" className="input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Password:<span className={styles.required}></span></label>
                        <div className="input-container">
                            <input type="password" id="password" name="password" placeholder="Enter Password" className="input" required />
                            <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" className="input" required />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone" className="label">Phone Number:<span className={styles.required}></span></label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter Phone Number" className="input" pattern="[0-9]{11}" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender" className="label">Gender:<span className={styles.required}></span></label>
                        <select id="gender" name="gender" className="input" required>
                            <option value="" disabled selected>Select Gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                    </div>
                    <div className={styles.box}>
                        <div className="form-group">
                            <label htmlFor="location" className="label">Location:<span className={styles.required}></span></label>
                            <select id="location" name="location" className="input" required>
                                <option value="" disabled selected>Select Location</option>
                                {enumsData?.locations?.map(location => (
                                    <option key={location} value={location}>{location}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="department" className="label">Department:<span className={styles.required}></span></label>
                            <select id="department" name="department" className="input" required>
                                <option value="" disabled selected>Select Department</option>
                                {enumsData?.departments?.map(department => (
                                    <option key={department} value={department}>{department}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="designation" className="label">Designation:<span className={styles.required}></span></label>
                            <select id="designation" name="designation" className="input" required>
                                <option value="" disabled selected>Select Designation</option>
                                {enumsData?.designations?.map(designation => (
                                    <option key={designation} value={designation}>{designation}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="team" className="label">Team:<span className={styles.required}></span></label>
                            <select id="team" name="team" className="input" required>
                                <option value="" disabled selected>Select Team</option>
                                {enumsData?.teams?.map(team => (
                                    <option key={team} value={team}>{team}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="role" className="label">Role:<span className={styles.required}></span></label>
                            <select id="role" name="role" className="input" required>
                                <option value="" disabled selected>Select Role</option>
                                {enumsData?.roles?.map(role => (
                                    <option key={role} value={role}>{role}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="submit-button">Add User</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreateUsers;
