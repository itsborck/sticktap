import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const GameCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} dateFormat="yyyy-MM-dd" />
  );
};

export default GameCalendar;
