import React, { useState, useEffect } from 'react';
import { ReactComponent as Name } from '../images/Name.svg';
import { ReactComponent as Certificate_Id} from '../images/Certificate_Id.svg';
import { ReactComponent as Issue_On} from '../images/Issued_On.svg';
import { ReactComponent as Line} from '../images/Line.svg';

const GeneratedCertificate = () => {
  const [data, setData] = useState([
  ]);
  
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
	  if (isLoading)
		  fetch('http://localhost:5000/getCertsInsti', {
			  method: 'GET',
		  })
			  .then((data) => data.json())
			  .then((dataJSON) =>
				  dataJSON.length == 0
					  ? []
					  : dataJSON[0].certificates
			  )
			  .then((processedData) => {
				  setData(processedData);
				  setLoading(false);
			  });
  });

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
          <tr key={row.certificateID}>
            <td className='TableName'>{row.name}</td>
            <td className='TableCertId'>{row.certificateID}</td>
            <td>{row.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GeneratedCertificate;
