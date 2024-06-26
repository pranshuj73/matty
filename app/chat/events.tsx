import { calendar_v3 } from "@googleapis/calendar";

export default function Events(data: any) {
  console.log(data.events)

  let events = data.events || [];
  // const [events, setEvents] = useState([]);

  // if (events.length === 0) {
  //   return <p>Nothing to show here...</p>
  // }

  return (
    <ul>
      {(!events || events.length === 0) ? 
        <p>Nothing to show here...</p>
          : 
        events.map((event: any) => (
          <li key={event.id} className="my-2"><span className="text-blue-300">•</span> {event.summary} <p className="opacity-50 text-xs">{event.start.dateTime} • in 6h</p></li>
        
        ))
      }
      {/* <li className="my-2"><span className="text-blue-300">•</span> dummy data <p className="opacity-50 text-xs">8:00 - 15:00 • in 6h</p></li> */}
    </ul>
  )
}