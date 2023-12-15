import React, { useState } from 'react';
import { ReactComponent as Name } from '../images/Name.svg';
import { ReactComponent as Certificate_Id} from '../images/Certificate_Id.svg';
import { ReactComponent as Issue_On} from '../images/Issued_On.svg';
import { ReactComponent as Line} from '../images/Line.svg';

const GeneratedCertificate = () => {
  const [data, setData] = useState([
    {name: 'Raju Bhaiya', certificate_id: 'CF78468', date: '12 Dec 2004' },
    {name: 'Krishna', certificate_id: 'CF78568', date: '12 Dec 2004' },
    {name: 'Satyam Raj', certificate_id: 'CF78668', date: '12 Dec 2004' },
  ]);

  return (
    <table className='Table'>
      <thead>
        <tr>
          <th className='TableName'><Name /></th>
          <th className='TableCertId'><Certificate_Id /></th>
          <th><Issue_On /></th>
        </tr>
      </thead>
      {/* <Line /> */}
      <tbody>
        {data.map((row) => (
          <tr key={row.certificate_id}>
            <td className='TableName'>{row.name}</td>
            <td className='TableCertId'>{row.certificate_id}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneratedCertificate;
