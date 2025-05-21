import colors from "./color.json";

export const COLORS = colors;

export const CATEGORY_OPTIONS = [
  { id: "notes", lib: "MaterialCommunityIcons", name: "note-outline" },
  { id: "calendar", lib: "MaterialCommunityIcons", name: "calendar-month" },
  { id: "trophy", lib: "FontAwesome5", name: "trophy" },
];

export const TODO_TASK = [
  {
    id: "1",
    title: "Study lesson",
    icon: "book-open",
    time: "",
    completed: false,
  },
  {
    id: "2",
    title: "Run 5k",
    icon: "run-fast",
    time: "4:00pm",
    completed: false,
  },
  {
    id: "3",
    title: "Go to party",
    icon: "party-popper",
    time: "10:00pm",
    completed: false,
  },
  {
    id: "4",
    title: "Game meetup",
    icon: "controller-classic",
    time: "1:00pm",
    completed: true,
  },
  {
    id: "5",
    title: "Take out trash",
    icon: "trash-can",
    time: "",
    completed: true,
  }
];
