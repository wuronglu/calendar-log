import React from 'react';
import dayjs from 'dayjs';
import CalendarComponent from './CalendarComponent';

const Home = () => {
  const [selectDate, setSelectDate] = React.useState(dayjs()); 

  return (
    <div>
      <div className='text-4xl text-center p-16'>从现在开始种一棵树</div> 
      <div className='flex justify-center items-center' >
       <CalendarComponent selectDate={selectDate} setSelectDate={setSelectDate} />
      </div>
      <div>
        <p>选中的日期是: {selectDate.format('YYYY-MM-DD')}</p>
      </div>
    </div>
  );
};

export default Home;
