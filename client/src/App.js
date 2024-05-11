import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Homee from './Homee/Homee';
import Nav from './Nav/Nav';
import Log from './Log/Log';
import Reg from './Reg/Reg';
import Manual from './Manual/Manual';
import Report from './Report/Report';
import Verification from './Verification/Verification';

import ReportPage from './Report/ReportPage/ReportPage';
import Try from './Report/ReportPage/Try';
import Message from './Message/Message';
import Connect from './Connect/Connect';
import Notification from './Notification/Notification';
import ViewNoti from './Notification/ViewNoti';
import Question from './Question/Question';
import { useContext } from 'react';
import { UserContext } from './Context/Context';
import Admin from './Admin/Admin';
import Feedback from './Feedback/Feedback';
import ShowFeedback from './Feedback/ShowFeedback';
import Lost from './Loft/Lost';
import Found from './Found/Found';

function App() {

  const { userInfo, setUserInfo } = useContext(UserContext)
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />

        <Routes>
          <Route path='/' element={<Homee />} />
          <Route path='/login' element={<Log />} />
          <Route path='/reg' element={<Reg />} />
          <Route path='/manual' element={<Manual />} />
          <Route path='/report' element={<Report />} />
          <Route path='/verify' element={<Verification />} />

          <Route path='/reportpage/:category' element={<ReportPage />} />
          <Route path='/try' element={<Try />} />
          {/* Corrected route for the Message component */}
          <Route path='/message/:id' element={<Message />} />
          <Route path='/connect/:id' element={<Connect />} />
          <Route path='/notification' element={<Notification />}></Route>
          <Route path='/notification/:id' element={<ViewNoti />}></Route>
          <Route path='/question/:category/:Person/:Email' element={<Question />}></Route>
          <Route path='/adminpage' element={<Admin />}></Route>

          <Route path="/feedback" element={<ShowFeedback />} />
          <Route path='/lost' element={<Lost />} />
          <Route path='/found' element={<Found />}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
