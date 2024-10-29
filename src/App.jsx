import React, {lazy, Suspense, useState } from 'react'
import Header from './components/Header'
import LoadingFallback from './components/LoadingFallback'
import ErrorBoundary from './components/ErrorBoundary'
import { Toaster } from 'react-hot-toast'


const MoodSelector = lazy(() => import ( './components/MoodSelector'));
const ActivityTracker = lazy(() => import ('./components/ActivityTracker'));
const RecentEntries = lazy(()=> import ('./components/RecentEntries'))
const MoodSuggestions = lazy(()=>import ('./components/MoodSuggestions'));
const MoodCalendar = lazy(()=>import('./components/MoodCalendar'));
const MoodStatistics = lazy(()=>import( './components/MoodStatistics'));
 const CustomMoodLabels = lazy(()=> import ('./components/CustomMoodLabels'));
const App = () => {
  const [activeTab, setActiveTab] = useState("today");
  return (
      <ErrorBoundary>
    <div className='min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 
    dark:form-gray-600 dark:to-gray-900 transition-colors duration-200 shadow-2xl'> 
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className='bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden transition-colors duration-200 '>
        <Toaster />
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
    
    <main className='p-4 sm:p-6 lg:p-8'>
      <Suspense fallback ={<LoadingFallback/>}>
      { activeTab === "today" && (
      <div className='space-y-6 sm:space-y-8'>
        <MoodSelector/>
        <ActivityTracker/>
        <MoodSuggestions/>
        <RecentEntries/>
      </div>
      )}
      {activeTab === "calendar" && <MoodCalendar/>}
      {activeTab === "statistics" && <MoodStatistics/>}
      {activeTab === "settings" && <CustomMoodLabels/>}
      </Suspense>
    </main>
    </div>
    </div>
    </div>
    </ErrorBoundary>
  )
}

export default App
