import { BrowswerRouter as Router,Route, Routes, Link } from 'react-router-dom'
import WeeklySchedule from './components/WeeklySchedule'
import GameDetails from './components/GameDetails'

function App() {

  return (
    <div className='App'>
      <WeeklySchedule />
    </div>
  )
}

export default App
