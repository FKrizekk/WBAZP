import { supabase } from './supabase.js';

class Event extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `<h4 class="eventName">8th USA Vans Club meeting</h4>
                    <p class="eventDate">15. 10. 2023</p>
                    <pre class="eventDesc">Setkání majitelů a příznivců legendárních amerických Vanů
Sraz vozidel v sobotu 31. 8. od 10 hod. na parkovišti Muzea starých strojů a technologií v Žamberku</pre>
                    <br>
                    <p class="eventAddress">Betlém 506, 564 01 Žamberk</p>`;
        this.classList.add("event");
    }
}
customElements.define('event-item', Event);


async function loadUpcomingEvents() {
    // Get current time in ISO format
    const now = new Date().toISOString();

    const { data: events, error } = await supabase
        .from('events')
        .select('*')
        .gte('date', now)
        .order('date', { ascending: true });

    if (error) {
        return console.error('Load error:', error);
    }

    return events;
}

loadUpcomingEvents().then(events => {
    const eventsContainer = document.querySelector('#upcoming-events');
    for (let i = 0; i < events.length; i++) {
        const eventItem = new Event();
        eventItem.querySelector('.eventName').innerHTML = events[i].name;
        eventItem.querySelector('.eventDate').innerHTML = new Date(events[i].date).toLocaleDateString();
        eventItem.querySelector('.eventDesc').textContent = events[i].desc;
        eventItem.querySelector('.eventAddress').innerHTML = events[i].address;
        const el = eventsContainer.appendChild(eventItem);
        el.style.setProperty('--animate-delay', `${i * 0.01}s`);
        el.classList.add('animate__fadeIn', 'animate__animated');
    }
});

async function loadPastEvents() {
  const now = new Date().toISOString();

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .lt('date', now)
    .order('date', { ascending: false });

  if (error) {
    return console.error('Load error:', error);
  }

  return events;
}

loadPastEvents().then(events => {
  const container = document.querySelector('#past-events');

  events.forEach((evt, i) => {
    const item = new Event();
    item.querySelector('.eventName').innerHTML    = evt.name;
    item.querySelector('.eventDate').innerHTML    = new Date(evt.date).toLocaleDateString();
    item.querySelector('.eventDesc').textContent  = evt.desc;
    item.querySelector('.eventAddress').innerHTML = evt.address;

    container.appendChild(item)
             .style.setProperty('--animate-delay', `${i * 0.01}s`);
    item.classList.add('animate__fadeIn', 'animate__animated');
  });
});
