import { addDays, eachDayOfInterval, endOfMonth, format, isSameDay, isSameMonth, startOfMonth } from 'date-fns';
import React, { useContext, useMemo, useState } from 'react'
import CalendarDay from './staticComponents/CalendarDay';
import { MoodContext } from '../contexts/MoodContext';

CalendarDay.displayName = "CalendarDay";

const MoodCalendar = () => {
    const { moodEntries } = useContext(MoodContext);
    const [selectedDate , setSelectedDate] = useState(null);
    const today = new Date();

    const {daysInMonth, moodEntriesMap } = useMemo(() => {
        const monthStart = startOfMonth(today);
        const monthEnd = endOfMonth(today);
        const firstDayOfWeek = addDays(monthStart, -monthStart.getDay());
        const lastDayOfWeek = addDays(monthEnd, 6 - monthEnd.getDay());

        const days = eachDayOfInterval({
            start: firstDayOfWeek,
            end: lastDayOfWeek,
        });

        
        console.log("days",days);
        
        const entriesMap = new Map(
            moodEntries.map((entry) => [
                format(new Date(entry.date), "yyyy-MM-dd"),
                entry,
            ])
        );
        return { daysInMonth: days, moodEntriesMap: entriesMap};
    },[moodEntries, today]);

    const getMoodForDay = (day) => {
        return moodEntriesMap.get(format(day, "yyyy-MM-dd"));
    };

  return (
    <div
    className='mb-8'>
        <h2 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white'>
            Mood Calendar
        </h2>
        <div className='grid grid-cols-7 gap-2 mb-4'>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) =>(
                <div
                key={day}
                className='text-center font-bold text-gray-600 dark:text-gray-400'>
                    {day}
                </div>
            ))}
            {daysInMonth.map((day, index) => (
                < CalendarDay
                key={index}
                day={day}
                moodEntry = {getMoodForDay(day)}
                isSelected = {selectedDate && isSameDay(day, selectedDate)}
                onSelect = {setSelectedDate}
                isCurrentMonth = {isSameMonth(day, today)}
                />
            ))}
        </div>
        {selectedDate && (
            <div
            className='mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg'>
                <h3 className='text-lg font-semibold mb-2'>
                    {format(selectedDate, "MMMM dd, yyyy")}
                </h3>
                {getMoodForDay(selectedDate) ? (
                    <>
                    <p>Mood: {getMoodForDay(selectedDate).mood.label}</p>
                    <p>Note: {getMoodForDay(selectedDate).note || "No Note Added"}</p>
                    </>
                ):( <p>No Mood Logged For This Day </p>)}
            </div>
        )}
    </div>
  )
}

export default React.memo(MoodCalendar);
