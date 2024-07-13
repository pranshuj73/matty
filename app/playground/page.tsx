import Markdown from "@/components/chat/markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
function LinkRenderer(props: any) {
  return (
    <a className='text-sky-300 underline underline-offset-2' href={props.href} target="_blank" rel="noreferrer noopener">
      {props.children}
    </a>
  );
}
export default function Page() {
  return (
    <section className="p-8 max-w-screen-md mx-auto h-full flex flex-col gap-3">
      <ReactMarkdown>
        {`Here is the link to Lecture #3 - "Getting Others to Care": [https://lu.ma/join/g-nFuB8RAvHN9wmfk](https://lu.ma/join/g-nFuB8RAvHN9wmfk)`}
      </ReactMarkdown>

      <Markdown content={` mailto:pranshujha.com 
      
Here is the link to Lecture #3 - "Getting Others to Care": [https://lu.ma/join/g-nFuB8RAvHN9wmfk](https://lu.ma/join/g-nFuB8RAvHN9wmfk)

  Here is your schedule for today:

  1. **Implement Function Calling**
      - Time: 5:00 PM to 9:00 PM
      - [Event Details](https://www.google.com/calendar/event?eid=ZTg2MGY0ZmZhMTNkNGU1YzliOTlkYzg1MzhiYTZjMmMgcHJhbnNodWo3M0Bt)

  2. **Watch JJBA**
  - Time: 9:00 PM to 10:00 PM
  - [Event Details](https://www.google.com/calendar/event?eid=MDdlZWU5N2U5ZTQxNDg5OGIzYzc1OGE3OTA5MGM0MmUgcHJhbnNodWo3M0Bt)

  Feel free to let me know if you need any more information or assistance!
  
  
  
  ✦ matty

here are your upcoming events:

• implement function calling

Fri Jun 28 17:00 • in 12h

• watch jjba

Fri Jun 28 21:00 • in 16h

• dentist appointment

Mon Jul 01 18:30 • in 3d

• wipro assessment #2

Tue Jul 02 00:00 • in 3d

• lecture #3 -- getting others to care.

Tue Jul 02 23:00 • in 4d

anything you'd like to schedule for today?

• you

what is jjba

✦ matty

jjba stands for jojo's bizarre adventure, which is a popular japanese manga and anime series created by hirohiko araki. it follows the adventures of the joestar family across multiple generations, each with unique abilities and fighting styles. the series is known for its creative characters, intricate plots, and iconic art style.

• you

tell me more

✦ matty

jojo's bizarre adventure is divided into multiple parts, each featuring a different protagonist from the joestar family. the series is known for its unique storytelling, creative stand abilities (supernatural powers possessed by characters), and intense battles. here are some key points about jojo's bizarre adventure:

1. part 1: phantom blood - introduces the first jojo, jonathan joestar, and his battle against the vampire dio brando.

2. part 2: battle tendency - follows jonathan's grandson, joseph joestar, as he faces off against ancient super beings known as the pillar men.

3. part 3: stardust crusaders - introduces the concept of stands and follows jotaro kujo and his companions on a journey to defeat dio brando once and for all.

4. part 4: diamond is unbreakable - set in the town of morioh, this part follows josuke higashikata and his friends as they deal with stand users in their community.

5. part 5: golden wind - follows giorno giovanna, the son of dio brando, as he aims to become a gangster and rise to the top of the mafia.

6. part 6: stone ocean - features jolyne cujoh, the daughter of jotaro kujo, as she navigates a maximum-security prison and faces off against a powerful enemy.

7. part 7: steel ball run - a reboot of the series set in an alternate universe, following the steel ball run horse race and introducing new characters like johnny joestar and gyro zeppeli.

8. part 8: jojolion - the ongoing part of the series, featuring a new protagonist named josuke higashikata in a mysterious town with hidden secrets.

overall, jojo's bizarre adventure is known for its over-the-top action, intricate plot twists, and memorable characters. it has gained a dedicated fanbase worldwide and continues to be a popular and influential series in the anime and manga community.`}
      />
    </section>
  )
}