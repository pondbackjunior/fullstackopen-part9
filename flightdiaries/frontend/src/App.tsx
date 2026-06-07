import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import type { Diary } from "./types";

import diaryService from "./services/diaries";
import DiaryList from "./components/DiaryList";
import NewDiaryForm from "./components/NewDiaryForm"
import Message from "./components/Message";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchDiaryList = async () => {
      const patients = await diaryService.getAll();
      setDiaries(patients);
    };
    void fetchDiaryList();
  }, []);
  
  return (
    <div className="App">
      <Router>
        <Message message={message} type={messageType}/>
        <NewDiaryForm diaries={diaries} setDiaries={setDiaries} diaryService={diaryService} setMessage={setMessage} setMessageType={setMessageType}/>
        <DiaryList diaries={diaries}/>
      </Router>
    </div>
  );
};

export default App;
