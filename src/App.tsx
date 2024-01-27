import React, {ReactComponentElement, useState} from 'react';
import { JSX } from 'react/jsx-runtime';

function DateTime(props:any) {
    return (
        <p className="date">{props.date}</p>

    )
}

const dayEnds = {
    1: "день",
    2: "дня",
    3: "дня",
    4: "дня",
    5: "дней",
    6: "дней",
    7: "дней",
    8: "дней",
    9: "дней",
    0: "дней"
  };
  
  const hourEnds = {
    1: "час",
    2: "часа",
    3: "часа",
    4: "часа",
    5: "часов",
    6: "часов",
    7: "часов",
    8: "часов",
    9: "часов",
    0: "часов"
  };
  
  const minuteEnds = {
    1: "минуту",
    2: "минуты",
    3: "минуты",
    4: "минуты",
    5: "минут",
    6: "минут",
    7: "минут",
    8: "минут",
    9: "минут",
    0: "минут"
  };
  
  function withDateFormatter(Component: JSX.IntrinsicAttributes) {
    return class extends React.Component {
      formatTime(time: number, ends: any[]) {
        return `${time} ${ends[time - Math.floor(time / 10) * 10]} назад`;
      }
  
      getTimeDiff(date: string | number | Date) {
        let currentTime = new Date().getTime();
        let passedTime = currentTime - new Date(date).getTime();
  
        let days = Math.floor(passedTime / (24 * 60 * 60 * 1000));
        if (days) {
          return this.formatTime(days, dayEnds);
        }
  
        let hours = Math.floor(passedTime / (60 * 60 * 1000));
        if (hours) {
          return this.formatTime(hours, hourEnds);
        }
  
        let minutes = Math.floor(passedTime / (60 * 1000));
        if (minutes) {
          return this.formatTime(minutes, minuteEnds);
        }
      }
  
      render() {
        return <Component date={this.getTimeDiff(this.props.date)} />;
      }
    };
  }
  
  const DateTimePretty = withDateFormatter(DateTime);

function Video(props:any) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
            <DateTimePretty date={props.date} />
        </div>
    )
}

function VideoList(props:any) {
    return props.list.map((item:any) => <Video url={item.url} date={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    return (
        <VideoList list={list} />
    );
}