import axios from "axios";
import { useState } from "react";

import type { Diary, DiaryValues } from "../types";

type Props = {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  diaryService: {
    create: (object: DiaryValues) => Promise<Diary>;
  };
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setMessageType: React.Dispatch<React.SetStateAction<string>>;
};

const NewDiaryForm = (props: Props) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const visibilityOptions = ["great", "good", "ok", "poor"];
  const weatherOptions = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  const diaryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const showMessage = (message: string, type: string) => {
      props.setMessage(message);
      props.setMessageType(type);
      setTimeout(() => {
        props.setMessage("");
        props.setMessageType("");
      }, 5000);
    }

    const newEntry: DiaryValues = {
      date,
      visibility,
      weather,
      comment: comment === "" ? undefined : comment,
    };

    try {
      const returnedDiary = await props.diaryService.create(newEntry);
      props.setDiaries(props.diaries.concat(returnedDiary));
      setDate("");
      setVisibility("");
      setWeather("");
      setComment("");
      showMessage("Diary entry added", "success");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverData = error.response?.data;

        const extractMessage = (data: unknown): string => {
          if (!data) return error.message;
          if (typeof data === "string") return data;
          if (Array.isArray(data)) return data.map(extractMessage).join("\n");
          if (typeof data === "object" && data !== null) {
            const payload = data as Record<string, unknown>;
            if (typeof payload.message === "string") return payload.message;
            if (Array.isArray(payload.error)) {
              return payload.error
                .map((item) => {
                  if (typeof item === "string") return item;
                  if (typeof item === "object" && item !== null) {
                    const itemObj = item as Record<string, unknown>;
                    return typeof itemObj.message === "string"
                      ? itemObj.message
                      : JSON.stringify(itemObj);
                  }
                  return String(item);
                })
                .join("\n");
            }
            if (typeof payload.error === "string") return payload.error;
            return JSON.stringify(payload, null, 2);
          }
          return String(data);
        };

        showMessage(extractMessage(serverData), "error");
      } else if (error instanceof Error) {
        showMessage(error.message, "error");
      } else {
        showMessage("Unknown error", "error");
      }
    }
  };

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={diaryCreation}>
        <label>
          date
          <input
            type="date"
            name="date"
            value={date}
            onChange={({ target }) => setDate(target.value)}
            required
          />
        </label>
        <br />
          visibility
          {visibilityOptions.map((option) => (
            <label key={option} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="visibility"
                value={option}
                checked={visibility === option}
                onChange={({ target }) => setVisibility(target.value)}
                required
              />
              {option}
            </label>
          ))}
        <br />
          weather
          {weatherOptions.map((option) => (
            <label key={option} style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="weather"
                value={option}
                checked={weather === option}
                onChange={({ target }) => setWeather(target.value)}
                required
              />
              {option}
            </label>
          ))}
        <br />
        <label>
          comment
          <input
            type="text"
            name="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </label>
        <br />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;