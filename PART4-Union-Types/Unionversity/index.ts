import courses from './courses';
import studyGroups from './studyGroups';

type Course = {
    id: number;
    studyGroupId: number;
    title: string;
    keywords: string[];
    eventType: string;
}

type StudyGroup = {
    id: number;
    courseId: number;
    title: string;
    keywords: string[];
    eventType: string;
}

type SearchEventsOptions = {
    query: string | number;
    eventType: 'courses' | 'groups';
}

let enrolledEvents: (Course | StudyGroup)[] = [];

// searchEvents() searches through lists of courses and study groups and find matching events
function searchEvents(options: SearchEventsOptions) {
    const events: ((Course | StudyGroup)[]) = options.eventType === 'courses' ? courses : studyGroups;

    return events.filter((event: Course | StudyGroup) => {
        if (typeof options.query === 'number') {
            return options.query === event.id;
        }
        if (typeof options.query === 'string') {
            return event.keywords.includes(options.query);
        }
    })
}

// enroll() function takes an event and add it to a list of our enrolled events.
function enroll(event: Course | StudyGroup) {
    enrolledEvents = [...enrolledEvents, event];
}

const searchResults = searchEvents({ query: 'art', eventType: 'courses' });
enroll(searchResults[0]);
console.log(enrolledEvents);