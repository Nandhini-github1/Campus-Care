import React, { useState } from 'react';

const GrievanceTable = () => {
    const [grievances, setGrievances] = useState([
        { id: 1, department: 'Hostel', category: 'Water', status: 'Pending' },
        { id: 2, department: 'Food', category: 'Quality', status: 'In Progress' },
    ]);

    const updateStatus = (id, status) => {
        setGrievances(grievances.map(g =>
            g.id === id ? { ...g, status } : g
        ));
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Department</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {grievances.map(g => (
                    <tr key={g.id}>
                        <td>{g.id}</td>
                        <td>{g.department}</td>
                        <td>{g.category}</td>
                        <td>{g.status}</td>
                        <td>
                            <select value={g.status} onChange={(e) => updateStatus(g.id, e.target.value)}>
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default GrievanceTable;
