export default function DemoChat() {
  return (
    <div className="mb-5">
      <p className="opacity-50">• You</p>
      <p>What's the best time for a client meeting this Thursday?</p>
      
      <p className="mt-5 opacity-50">✦ Matty</p>
      <p>The best available times for a client meeting this Thursday are in the evenings after your dentist appointment.</p>
      <p className="mt-3">Suggested Time Slots:</p>
      <ul className="mt-1 list-disc list-inside">
        <li>5:00 - 6:00 PM</li>
        <li>7:00 - 8:00 PM</li>
      </ul>
      <p className="mt-3">Would you like me to schedule the event for one of these times?</p>
      
    </div>
  )
}