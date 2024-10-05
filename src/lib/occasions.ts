import { addMonths } from "date-fns";

/**
 * Returns the nth day of the week in the given month.
 *
 * For example, if you want to know the date of the 3rd Monday in November, you would call `getNthDayOfWeekInMonth(11, 1, 3)`.
 *
 * @param month
 * @param dayOfWeek
 * @param n
 * @returns
 */
const getNthDayOfWeekInMonth = (
  month: number,
  dayOfWeek: number,
  n: number,
): number => {
  const date = new Date(2023, 10, 23);
  date.setMonth(month - 1);
  date.setDate(1);
  while (date.getDay() !== dayOfWeek) {
    date.setDate(date.getDate() + 1);
  }
  date.setDate(date.getDate() + 7 * (n - 1));
  return date.getDate();
};

const getCanadianThanksgivingDate = (): {
  startDay: number;
  startMonth: number;
  durationDays: number;
} => {
  const startMonth = 10;
  const startDay = getNthDayOfWeekInMonth(startMonth, 1, 2) - 1;
  const durationDays = 3;

  return { startDay, startMonth, durationDays };
};

const currentYear = new Date().getFullYear();
const newYear = addMonths(new Date(), 1).getFullYear();

export const occasions = [
  {
    name: "New Year's Day",
    blurb: `Happy New Year! I hope you have a wonderful ${newYear}.`,
    startMonth: 1,
    startDay: 1,
    durationDays: 1,
    imageName: "new-years-day",
    blurbMaxWidth: "12rem",
  },
  {
    name: "Valentine's Day",
    blurb:
      "Happy Valentine's Day! I hope you have a wonderful day with your loved ones.",
    startMonth: 2,
    startDay: 14,
    durationDays: 1,
    imageName: "valentines",
  },
  {
    name: "International Women's Day",
    startMonth: 3,
    startDay: 8,
    durationDays: 1,
    imageName: "iwd",
  },
  {
    name: "Trans Day of Visibility",
    blurb:
      "Join me in celebrating our transgender friends, colleagues, and neighbours!",
    learnMoreUrl: "https://www.glaad.org/tdov",
    startMonth: 3,
    startDay: 31,
    durationDays: 1,
    imageName: "trans",
  },
  {
    name: "Pride Month",
    blurb: "Happy Pride Month! Let's celebrate love, diversity, and inclusion.",
    startMonth: 6,
    startDay: 1,
    durationDays: 30,
    imageName: "pride",
    blurbMaxWidth: "15rem",
  },
  {
    name: "Canada Day",
    blurb: "Happy Canada Day!",
    startMonth: 7,
    startDay: 1,
    durationDays: 1,
    imageName: "canada",
  },
  {
    name: "Emancipation Day",
    blurb:
      "Happy Emancipation Day! Let us honor the journey and contributions of the Black community in our shared history.",
    startMonth: 8,
    startDay: 1,
    durationDays: 1,
    imageName: "emancipation",
  },
  {
    name: "National Day for Truth and Reconciliation",
    blurb: "Never forget the victims of the residential school system.",
    startMonth: 9,
    startDay: 29,
    durationDays: 3,
    imageName: "reconciliation",
    blurbMaxWidth: "16rem",
    learnMoreUrl:
      "https://www.canada.ca/en/canadian-heritage/campaigns/national-day-truth-reconciliation.html",
  },
  {
    name: "Halloween",
    startMonth: 10,
    startDay: 30,
    durationDays: 3,
    imageName: "halloween",
  },
  {
    name: "Canadian Thanksgiving",
    blurb:
      "Feeling grateful for all the blessings in my life. Happy Thanksgiving!",
    ...getCanadianThanksgivingDate(),
    imageName: "thanksgiving",
  },
  {
    name: "Remembrance Day",
    blurb: "Let us remember those who have fallen in service to their country.",
    startMonth: 11,
    startDay: 11,
    durationDays: 1,
    imageName: "remembrance",
    blurbMaxWidth: "15rem",
  },
  {
    name: "Transgender Awareness Week",
    blurb:
      "Join me in celebrating our transgender friends, colleagues, and neighbors!",
    startMonth: 11,
    startDay: 13,
    durationDays: 7,
    imageName: "trans",
    learnMoreUrl: "https://www.glaad.org/transweek",
  },
  {
    name: `Holidays ${currentYear}`,
    blurb: "I hope you have a wonderful holiday season!",
    startMonth: 12,
    startDay: 10,
    durationDays: 19,
    imageName: "wreath",
  },
  {
    name: "New Year's Eve",
    blurb: `Happy New Year! I hope you have a wonderful ${newYear}.`,
    startMonth: 12,
    startDay: 31,
    durationDays: 1,
    imageName: "new-years-eve",
    blurbMaxWidth: "12rem",
  },
];
