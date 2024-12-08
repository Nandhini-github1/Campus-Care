import React, { useState } from 'react';
import './stulogin.css';

const CreateGrievance = ({ onGrievanceSubmitted }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        departmentType: '',
        department: '',
        complaintCategory: '',
        complaintTitle: '',
        complaintDescription: '',
    });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const departments = {
        UG: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Sc Maths', 'B.Sc Computer Science', 'BA History'],
        PG: ['M.Sc Physics', 'M.Sc Chemistry', 'M.Sc Maths', 'M.Sc Computer Science'],
        Professional: ['MCA', 'MBA'],
    };

    const validateFields = () => {
        let errors = {};
        if (!formData.studentName) errors.studentName = 'Student Name is required';
        if (!formData.studentId) {
            errors.studentId = 'Student ID is required';
        } else if (formData.studentId.length !== 10) {
            errors.studentId = 'Student ID must be exactly 10 characters';
        }
        if (!formData.departmentType) errors.departmentType = 'Please select a department type';
        if (!formData.department) errors.department = 'Please select a department';
        if (!formData.complaintCategory) errors.complaintCategory = 'Please select a complaint category';
        if (!formData.complaintTitle) errors.complaintTitle = 'Complaint title is required';
        if (!formData.complaintDescription) errors.complaintDescription = 'Complaint description is required';  

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateFields()) return;

        setLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/grievances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Ensure session cookie is included in the request
            });

            const data = await response.json();
            console.log('Grievance Submission Response:', data); // Log the response

            if (response.ok) {
                setMessage('Grievance submitted successfully.');
                onGrievanceSubmitted(data); // Callback to update dashboard
            } else {
                setError(data.message || 'Error submitting grievance.');
            }
        } catch (error) {
            console.error('Error during submission:', error);
            setError('Network error. Please try again.');
        }

        setLoading(false);
    };

    return (
        <div className="grievance-form">
            
            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label style={{color:'white'}}>Student Name:</label>
                    <input
                        type="text"
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleChange}
                        required
                    />
                    {fieldErrors.studentName && <p className="field-error">{fieldErrors.studentName}</p>}
                </div>
                <div>
                    <label  style={{color:'white'}}>Student ID:</label>
                    <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                    {fieldErrors.studentId && <p className="field-error">{fieldErrors.studentId}</p>}
                </div>
                <div>
                    <label  style={{color:'white'}}>Department Type:</label>
                    <select
                        name="departmentType"
                        value={formData.departmentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Department Type</option>
                        {Object.keys(departments).map((deptType) => (
                            <option key={deptType} value={deptType}>
                                {deptType}
                            </option>
                        ))}
                    </select>
                    {fieldErrors.departmentType && <p className="field-error">{fieldErrors.departmentType}</p>}
                </div>
                {formData.departmentType && (
                    <div>
                        <label  style={{color:'white'}}>Department:</label>
                        <select
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Department</option>
                            {departments[formData.departmentType].map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                        {fieldErrors.department && <p className="field-error">{fieldErrors.department}</p>}
                    </div>
                )}
                <div>
                    <label  style={{color:'white'}}>Complaint Category:</label>
                    <select
                        name="complaintCategory"
                        value={formData.complaintCategory}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="College">College</option>
                        <option value="Hostel">Hostel</option>
                        <option value="Food">Food</option>
                        <option value="Certificate">Certificate</option>
                        <option value="Counseling">Counseling</option>
                    </select>
                    {fieldErrors.complaintCategory && <p className="field-error">{fieldErrors.complaintCategory}</p>}
                </div>
                <div>
                    <label  style={{color:'white'}}>Complaint Title:</label>
                    <input
                        type="text"
                        name="complaintTitle"
                        value={formData.complaintTitle}
                        onChange={handleChange}
                        required
                    />
                    {fieldErrors.complaintTitle && <p className="field-error">{fieldErrors.complaintTitle}</p>}
                </div>
                <div>
                    <label  style={{color:'white'}}>Complaint Description:</label>
                    <textarea
                        name="complaintDescription"
                        value={formData.complaintDescription}
                        onChange={handleChange}
                        required
                    />
                    {fieldErrors.complaintDescription && <p className="field-error">{fieldErrors.complaintDescription}</p>}
                </div>
                <div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGrievance;
