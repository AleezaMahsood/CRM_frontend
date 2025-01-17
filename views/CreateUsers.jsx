'use client';
import React from 'react';
import styles from '@/styles/user_form.css';
import { useEnums } from '@/hooks/useEnums';
import axios from '@/utils/axios';

const CreateUsers = () => {
    const validateForm = (formData) => {
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const email = formData.get('email');
        const password = formData.get('password');
        const password_confirmation = formData.get('password_confirmation');
        const phone = formData.get('phone');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{11}$/;
        const namePattern = /^[A-Za-z]+$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return false;
        }

        if (password !== password_confirmation) {
            alert("Passwords do not match.");
            return false;
        }

        if (!phonePattern.test(phone)) {
            alert("Please enter a valid phone number with 11 digits.");
            return false;
        }

        if (!namePattern.test(firstName)) {
            alert("First name must contain only letters with no spaces.");
            return false;
        }

        if (!namePattern.test(lastName)) {
            alert("Last name must contain only letters with no spaces.");
            return false;
        }

        return true;
    };

    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        if (!validateForm(formData)) {
            return;
        }

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
        ).then(response => {
            alert("User created successfully!");
            window.location.href = '/login'; // Navigate to the login page
        }).catch(error => {
            alert("Error creating user: " + error.message);
        });
    };

    const { data: enumsData } = useEnums();

    return (
        <div className={styles.container} id="main">
            <h2 className="heading">New Employee</h2>
            <hr></hr>
            <h3 className="subheading">Employee Details</h3>
            <p className="description">Add details such as name, email, phone number and other personal information.</p>
            <div className={styles.box}>
                <form id="Add_Users" onSubmit={submitForm} className="form">
                    <div className="form-group">
                        <label htmlFor="full-name" className="label">Full Name:<span className={styles.required}></span></label>
                        <div className="input-container">
                            <input 
                                type="text" 
                                id="first-name" 
                                name="first-name" 
                                minLength="3" 
                                pattern="[A-Za-z]+" 
                                placeholder="Enter First Name" 
                                className="input" 
                                required 
                                title="First name must contain only letters with no spaces."
                            />
                            <input 
                                type="text" 
                                id="last-name" 
                                name="last-name" 
                                minLength="3" 
                                pattern="[A-Za-z]+" 
                                placeholder="Enter Last Name" 
                                className="input" 
                                required 
                                title="Last name must contain only letters with no spaces."
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="label">Email:<span className={styles.required}></span></label>
                        <input type="email" id="email" name="email" placeholder="Enter Email" className="input" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="label">Password:<span className={styles.required}></span></label>
                        <div className="input-container">
                            <input type="password" id="password" name="password" placeholder="Enter Password" className="input" required minLength="8" />
                            <input type="password" id="password_confirmation" name="password_confirmation" placeholder="Confirm Password" className="input" required minLength="8" />
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
