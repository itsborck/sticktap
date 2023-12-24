import { useState, useEffect } from 'react';
import { doc, getFirestore, onSnapshot } from 'firebase/firestore';

const InfoBar = () => {
  const [infoText, setInfoText] = useState('');
  const [infoLink, setInfoLink] = useState('');
  const [linkText, setLinkText] = useState('');

  useEffect(() => {
    const db = getFirestore();
    const docRef = doc(db, 'infoBar', 'info');
    const unsubscribe = onSnapshot(docRef, (doc) => {
      setInfoText(doc.data().text);
      setInfoLink(doc.data().link);
      setLinkText(doc.data().linkText);
    });

    return unsubscribe;
  }, []);

  return (
    <div className="flex text-lg sm:col-span-1 lg:col-span-3 bg-gray-800 rounded shadow-lg">
      <div className="flex-1 text-white text-center">
        <div className='flex justify-center items-center space-x-2'>
        <p>{infoText}</p>
        <a href={infoLink} className='hover:underline'>{linkText}</a>
        </div>
      </div>
    </div>
  )
};

export default InfoBar;