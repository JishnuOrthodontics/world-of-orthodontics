// src/components/Dashboard/PatientDashboard.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import DatePicker from 'react-datepicker'; // Ensure this is used in your JSX
import 'react-datepicker/dist/react-datepicker.css';

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(db, 'appointments'), where('patientId', '==', auth.currentUser.uid));
      const snapshot = await getDocs(q);
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchAppointments();
  }, []);

  // Book appointment
  const handleBookAppointment = async () => {
    await addDoc(collection(db, 'appointments'), {
      patientId: auth.currentUser.uid,
      date: selectedDate.toISOString(),
      status: 'pending'
    });
  };

  return (
    <div className="dashboard">
      <h2>Patient Dashboard</h2>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <button onClick={handleBookAppointment}>Book Appointment</button>
      {/* Display appointments */}
    </div>
  );
};

export default PatientDashboard;