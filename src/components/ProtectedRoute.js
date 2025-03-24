import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        setUserRole(userDoc.data()?.role || '');
      }
      setLoading(false);
    };
    fetchUserRole();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!auth.currentUser) return <Navigate to="/login" />;
  if (!allowedRoles.includes(userRole)) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;