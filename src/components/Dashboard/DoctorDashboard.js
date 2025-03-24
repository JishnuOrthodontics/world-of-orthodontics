// src/components/Dashboard/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';

const DoctorDashboard = () => {
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [approvedAppointments, setApprovedAppointments] = useState([]);

  // Fetch appointments on component mount
  useEffect(() => {
    const fetchAppointments = async () => {
      // Get pending appointments
      const pendingQuery = query(
        collection(db, 'appointments'),
        where('status', '==', 'pending')
      );
      const pendingSnapshot = await getDocs(pendingQuery);
      setPendingAppointments(pendingSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Get approved appointments for this doctor
      const approvedQuery = query(
        collection(db, 'appointments'),
        where('status', '==', 'approved'),
        where('doctorId', '==', auth.currentUser.uid)
      );
      const approvedSnapshot = await getDocs(approvedQuery);
      setApprovedAppointments(approvedSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchAppointments();
  }, []);

  // Approve an appointment
  const handleApprove = async (appointmentId) => {
    try {
      await updateDoc(doc(db, 'appointments', appointmentId), {
        status: 'approved',
        doctorId: auth.currentUser.uid,
        approvedAt: new Date().toISOString()
      });
      // Update local state
      setPendingAppointments(prev => prev.filter(app => app.id !== appointmentId));
      const approvedApp = pendingAppointments.find(app => app.id === appointmentId);
      setApprovedAppointments(prev => [...prev, approvedApp]);
    } catch (error) {
      alert('Error approving appointment: ' + error.message);
    }
  };

  // Format date string
  const formatDate = (isoString) => {
    const options = { 
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit' 
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="dashboard">
      <h2>Welcome, Dr. {auth.currentUser?.displayName || 'User'}</h2>
      
      <div className="appointments-section">
        <h3>Pending Appointments</h3>
        {pendingAppointments.length === 0 ? (
          <p>No pending appointments</p>
        ) : (
          <div className="appointments-list">
            {pendingAppointments.map(app => (
              <div key={app.id} className="appointment-card pending">
                <p>Patient: {app.patientName}</p>
                <p>Date: {formatDate(app.date)}</p>
                <p>Reason: {app.reason || 'General Checkup'}</p>
                <button 
                  onClick={() => handleApprove(app.id)}
                  className="approve-btn"
                >
                  Approve Appointment
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="appointments-section">
        <h3>Approved Appointments</h3>
        {approvedAppointments.length === 0 ? (
          <p>No approved appointments</p>
        ) : (
          <div className="appointments-list">
            {approvedAppointments.map(app => (
              <div key={app.id} className="appointment-card approved">
                <p>Patient: {app.patientName}</p>
                <p>Date: {formatDate(app.date)}</p>
                <p>Status: Approved</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;