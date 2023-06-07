import {
    RaccoonMeadowsVolunteers,
    RaccoonMeadowsActivity,
    raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
    WolfPointVolunteers,
    WolfPointActivity,
    wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;
type CombinedID = number | string;

type Volunteers = {
    id: CombinedID;
    name: string;
    activities: CombinedActivity[];
};

// combineVolunteers() take the list of volunteers of different types and combine them
function combineVolunteers(
    volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]
) {
    return volunteers.map((volunteer) => {
        let id = volunteer.id;
        if (typeof id === 'string') {
            id = parseInt(id, 10);

        }
        return {
            id: volunteer.id,
            name: volunteer.name,
            activities: volunteer.activities
        }

    });
}

// isVerified() checks if a volunteer’s hours are verified
function isVerified(verified: string | boolean) {
    if (typeof verified === 'string') {
        return verified === 'Yes';
    }
    return verified;
}

//getHours() gets hours with an correct property for both parks
function getHours(activity: CombinedActivity) {
    if ('hours' in activity) {
        return activity.hours;
    } else {
        return activity.time;
    }
}

//calculateHours() calculates each volunteer’s verified hours
function calculateHours(volunteers: Volunteers[]) {
    return volunteers.map((volunteer) => {
        let hours = 0;

        volunteer.activities.forEach((activity) => {
            if (isVerified(activity.verified)) {
                hours = hours + getHours(activity);

            }
        });

        return {
            id: volunteer.id,
            name: volunteer.name,
            hours: hours,
        };
    });
}

// byHours() put a list of volunteers and their hours in order
function byHours(a: { hours: number; }, b: { hours: number; }) {
    return b.hours - a.hours
}

let arr: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[] = [];
const combinedVolunteers = combineVolunteers(
    arr.concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

// console.log(combinedVolunteers);
const result = calculateHours(combinedVolunteers);
console.log(result.sort(byHours));

