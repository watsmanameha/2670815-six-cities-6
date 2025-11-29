import type { FC } from 'react';
import './spinner.css';

const Spinner: FC = () => (
  <div className="spinner">
    <div className="spinner__circle"></div>
  </div>
);

export default Spinner;
