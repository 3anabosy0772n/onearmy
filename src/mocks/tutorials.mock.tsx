import { ITutorial } from "../models/tutorial.models";

export const TUTORIALS_MOCK: ITutorial[] = [
  {
    cover_picture_url: "http://placekitten.com/g/400/250",
    title: "Tutorial 1",
    workspace_name: "Eindhoven Mate",
    id: "fakeid1",
    slug: "tutorial-1",
    description: "this is a great description 1",
    cost: 20,
    difficulty_level: "difficult",
    time: 30,
    steps: [
      {
        images: ["http://placekitten.com/g/400/250"],
        text: "this text is wonderful oh my god",
        title: "My super step1 title"
      },
      {
        images: [
          "http://placekitten.com/g/400/250",
          "http://placekitten.com/400/250"
        ],
        text: "this text is wonderful oh my god",
        title: "My super step2 title"
      }
    ]
  },
  {
    cover_picture_url: "http://placekitten.com/g/400/250",
    title: "Tutorial 2",
    workspace_name: "Eindhoven Mate",
    id: "fakeid2",
    slug: "tutorial-2",
    description: "this is a great description 2",
    cost: 20,
    difficulty_level: "difficult",
    time: 30,
    steps: [
      {
        images: [
          "http://placekitten.com/400/250",
          "http://placekitten.com/g/400/250"
        ],
        text: "this text is wonderful oh my god",
        title: "My super step1 title"
      },
      {
        images: [
          "http://placekitten.com/g/400/250",
          "http://placekitten.com/400/250"
        ],
        text: "this text is wonderful oh my god",
        title: "My super step2 title"
      }
    ]
  },
  {
    cover_picture_url: "http://placekitten.com/g/400/250",
    title: "Tutorial 3",
    workspace_name: "Eindhoven Mate",
    id: "fakeid3",
    slug: "tutorial-3",
    description: "this is a great description 3",
    cost: 20,
    difficulty_level: "difficult",
    time: 30,
    steps: [
      {
        images: [
          "http://placekitten.com/400/250",
          "http://placekitten.com/g/400/250"
        ],
        text: "this text is wonderful oh my god",
        title: "My super step1 title"
      },
      {
        images: [
          "http://placekitten.com/g/400/250",
          "http://placekitten.com/400/250"
        ],
        text: "this text is wonderful oh my god",
        title: "My super step2 title"
      }
    ]
  }
];
