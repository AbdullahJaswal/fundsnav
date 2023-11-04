const linechart_data = [
  {
    color: "hsl(339, 70%, 50%)",
    data: [
      {
        x: "2018-01-01",
        y: 7,
      },
      {
        x: "2018-01-02",
        y: 5,
      },
      {
        x: "2018-01-03",
        y: 11,
      },
      {
        x: "2018-01-04",
        y: 9,
      },
      {
        x: "2018-01-05",
        y: 12,
      },
      {
        x: "2018-01-06",
        y: 16,
      },
      {
        x: "2018-01-07",
        y: 13,
      },
      {
        x: "2018-01-08",
        y: 13,
      },
      {
        x: "2018-01-09",
        y: 11,
      },
      {
        x: "2018-01-10",
        y: 10,
      },
      {
        x: "2018-01-11",
        y: 9,
      },
      {
        x: "2018-01-12",
        y: 8,
      },
      {
        x: "2018-01-13",
        y: 7,
      },
      {
        x: "2018-01-14",
        y: 6,
      },
      {
        x: "2018-01-15",
        y: 5,
      },
      {
        x: "2018-01-16",
        y: 4,
      },
      {
        x: "2018-01-17",
        y: 3,
      },
      {
        x: "2018-01-18",
        y: 2,
      },
      {
        x: "2018-01-19",
        y: 1,
      },
      {
        x: "2018-01-20",
        y: 2,
      },
    ],
    id: "fake corp. A",
  },
  {
    color: "hsl(130, 70%, 50%)",
    data: [
      {
        x: "2018-01-04",
        y: 14,
      },
      {
        x: "2018-01-05",
        y: 14,
      },
      {
        x: "2018-01-06",
        y: 15,
      },
      {
        x: "2018-01-07",
        y: 11,
      },
      {
        x: "2018-01-08",
        y: 10,
      },
      {
        x: "2018-01-09",
        y: 12,
      },
      {
        x: "2018-01-10",
        y: 9,
      },
      {
        x: "2018-01-11",
        y: 7,
      },
      {
        x: "2018-01-12",
        y: 6,
      },
      {
        x: "2018-01-13",
        y: 8,
      },
      {
        x: "2018-01-14",
        y: 10,
      },
      {
        x: "2018-01-15",
        y: 11,
      },
      {
        x: "2018-01-16",
        y: 12,
      },
      {
        x: "2018-01-17",
        y: 13,
      },
      {
        x: "2018-01-18",
        y: 12,
      },
      {
        x: "2018-01-19",
        y: 10,
      },
      {
        x: "2018-01-20",
        y: 9,
      },
      {
        x: "2018-01-21",
        y: 8,
      },
      {
        x: "2018-01-22",
        y: 7,
      },
      {
        x: "2018-01-23",
        y: 6,
      },
    ],
    id: "fake corp. B",
  },
];

const linechart_data_2 = [
  {
    id: "japan",
    color: "hsl(339, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 159,
      },
      {
        x: "helicopter",
        y: 228,
      },
      {
        x: "boat",
        y: 27,
      },
      {
        x: "train",
        y: 286,
      },
      {
        x: "subway",
        y: 189,
      },
      {
        x: "bus",
        y: 72,
      },
      {
        x: "car",
        y: 171,
      },
      {
        x: "moto",
        y: 56,
      },
      {
        x: "bicycle",
        y: 279,
      },
      {
        x: "horse",
        y: 6,
      },
      {
        x: "skateboard",
        y: 86,
      },
      {
        x: "others",
        y: 42,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(183, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 266,
      },
      {
        x: "helicopter",
        y: 258,
      },
      {
        x: "boat",
        y: 106,
      },
      {
        x: "train",
        y: 291,
      },
      {
        x: "subway",
        y: 1,
      },
      {
        x: "bus",
        y: 53,
      },
      {
        x: "car",
        y: 86,
      },
      {
        x: "moto",
        y: 76,
      },
      {
        x: "bicycle",
        y: 218,
      },
      {
        x: "horse",
        y: 138,
      },
      {
        x: "skateboard",
        y: 222,
      },
      {
        x: "others",
        y: 254,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(130, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 291,
      },
      {
        x: "helicopter",
        y: 197,
      },
      {
        x: "boat",
        y: 249,
      },
      {
        x: "train",
        y: 60,
      },
      {
        x: "subway",
        y: 265,
      },
      {
        x: "bus",
        y: 186,
      },
      {
        x: "car",
        y: 64,
      },
      {
        x: "moto",
        y: 236,
      },
      {
        x: "bicycle",
        y: 48,
      },
      {
        x: "horse",
        y: 246,
      },
      {
        x: "skateboard",
        y: 64,
      },
      {
        x: "others",
        y: 156,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(82, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 222,
      },
      {
        x: "helicopter",
        y: 112,
      },
      {
        x: "boat",
        y: 130,
      },
      {
        x: "train",
        y: 244,
      },
      {
        x: "subway",
        y: 32,
      },
      {
        x: "bus",
        y: 40,
      },
      {
        x: "car",
        y: 151,
      },
      {
        x: "moto",
        y: 162,
      },
      {
        x: "bicycle",
        y: 136,
      },
      {
        x: "horse",
        y: 238,
      },
      {
        x: "skateboard",
        y: 191,
      },
      {
        x: "others",
        y: 64,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(174, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 155,
      },
      {
        x: "helicopter",
        y: 58,
      },
      {
        x: "boat",
        y: 224,
      },
      {
        x: "train",
        y: 85,
      },
      {
        x: "subway",
        y: 47,
      },
      {
        x: "bus",
        y: 296,
      },
      {
        x: "car",
        y: 182,
      },
      {
        x: "moto",
        y: 284,
      },
      {
        x: "bicycle",
        y: 20,
      },
      {
        x: "horse",
        y: 265,
      },
      {
        x: "skateboard",
        y: 298,
      },
      {
        x: "others",
        y: 237,
      },
    ],
  },
];

export { linechart_data, linechart_data_2 };
