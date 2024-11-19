import React, { ReactNode } from 'react';
import './FormCard.css';

export type FormCardProps = {
  children: ReactNode;
};

const FormCard: React.FC<FormCardProps> = ({ children }) => {
  return <div className="form-card">{children}</div>;
};

export default FormCard;
