// ./components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  // تحقق من وجود التوكن في localStorage
  const token = localStorage.getItem('token');

  // إذا لم يكن التوكن متوفرًا، وجه المستخدم إلى صفحة تسجيل الدخول
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // إذا كان التوكن موجودًا، اعرض الصفحة المطلوبة
  return element;
};

export default ProtectedRoute;
