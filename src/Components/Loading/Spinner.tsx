// Spinner.tsx
import React from 'react';
import './Spinner.css'; // Import the CSS

type SpinnerProps = {
  styling?:string
}

const Spinner: React.FC<SpinnerProps> = (props) => {
  const {styling=""} = props
  return <div className={`spinner ${styling} !m-auto`}></div>;
};

export default Spinner;