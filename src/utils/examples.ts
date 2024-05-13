export const nem12HeaderString = "100,NEM12,200506081149,UNITEDDP,NEMMCO";
export const nem12DataString = `200,NEM1201009,E1E2,1,E1,N1,01009,kWh,30,20050610
300,20050301,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.810,0.568,1.234,1.353,1.507,1.344,1.773
300,20050302,0,0,0,0,0,0,0,0,0,0,0,0,0.235,0.567,0.890,1.123,1.345,1.567,1.543,1.234
300,20050303,0,0,0,0,0,0,0,0,0,0,0,0,0.261,0.310,0.678,0.934,1.211,1.134,1.423,1.370
300,20050304,0,0,0,0,0,0,0,0,0,0,0,0,0.335,0.667,0.790,1.023,1.145,1.777,1.563,1.344
500,O,S01009,20050310121004,
200,NEM1201009,E1E2,2,E2,,01009,kWh,30,20050610
300,20050301,0,0,0,0,0,0,0,0,0,0,0,0,0.154,0.460,0.770,1.003,1.059,1.750,1.423,1.200
300,20050302,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.810,0.776,1.004,1.034,1.200,1.310,1.342
300,20050303,0,0,0,0,0,0,0,0,0,0,0,0,0.335,0.667,0.790,1.023,1.145,1.777,1.563,1.344
300,20050304,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.415,0.778,0.940,1.191,1.345,1.390,1.222
500,O,S01009,20050310121004`;
export const nem12EndString = "900";

export const nem12CsvString = `${nem12HeaderString}
${nem12DataString}
${nem12EndString}`;

export const nem12File = {
  header: {
    recordIndicator: 100,
    versionHeader: "NEM12",
    dateTime: new Date("2005-06-08T11:49"),
    fromParticipant: "UNITEDDP",
    toParticipant: "NEMMCO",
  },
  data: [
    {
      recordIndicator: 200,
      nmi: "NEM1201009",
      nmiConfiguration: "E1E2",
      registerId: "1",
      nmiSuffix: "E1",
      mdmDataStreamIdenfier: "N1",
      meterSerialNumber: "01009",
      uom: "kWh",
      intervalLength: 30,
      nextScheduledReadDate: new Date("2005-06-10T00:00"),
      intervalData: [
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-01T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.461, 0.81, 0.568, 1.234,
            1.353, 1.507, 1.344, 1.773,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-02T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.235, 0.567, 0.89, 1.123,
            1.345, 1.567, 1.543, 1.234,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-03T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.261, 0.31, 0.678, 0.934,
            1.211, 1.134, 1.423, 1.37,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-04T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.335, 0.667, 0.79, 1.023,
            1.145, 1.777, 1.563, 1.344,
          ],
        },
        // ...
      ],
    },
    {
      recordIndicator: 200,
      nmi: "NEM1201009",
      nmiConfiguration: "E1E2",
      registerId: "2",
      nmiSuffix: "E2",
      mdmDataStreamIdenfier: "",
      meterSerialNumber: "01009",
      uom: "kWh",
      intervalLength: 30,
      nextScheduledReadDate: new Date("2005-06-10T00:00"),
      intervalData: [
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-01T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.154, 0.46, 0.77, 1.003, 1.059,
            1.75, 1.423, 1.2,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-02T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.461, 0.81, 0.776, 1.004,
            1.034, 1.2, 1.31, 1.342,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-03T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.335, 0.667, 0.79, 1.023,
            1.145, 1.777, 1.563, 1.344,
          ],
        },
        {
          recordIndicator: 300,
          intervalDate: new Date("2005-03-04T00:00"),
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.461, 0.415, 0.778, 0.94,
            1.191, 1.345, 1.39, 1.222,
          ],
        },
        // ...
      ],
    },
  ],
  end: {
    recordIndicator: 900,
  },
};

const nem12ConsumptionData = [
  {
    nmi: "NEM1201009",
    timestamp: new Date("2005-03-04T06:30"),
    consumption: 0.461 + 0.154,
  },
  // ...
];

export const nem12MeterReadings = [
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T00:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T00:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T01:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T01:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T02:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T02:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T03:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T03:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T04:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T04:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T05:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T05:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T06:00"), value: 0.615 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T06:30"), value: 1.27 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T07:00"), value: 1.338 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T07:30"), value: 2.237 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T08:00"), value: 2.412 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T08:30"), value: 3.257 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T09:00"), value: 2.767 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-01T09:30"), value: 2.973 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T00:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T00:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T01:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T01:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T02:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T02:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T03:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T03:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T04:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T04:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T05:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T05:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T06:00"), value: 0.696 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T06:30"), value: 1.377 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T07:00"), value: 1.666 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T07:30"), value: 2.127 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T08:00"), value: 2.379 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T08:30"), value: 2.767 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T09:00"), value: 2.853 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-02T09:30"), value: 2.576 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T00:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T00:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T01:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T01:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T02:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T02:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T03:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T03:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T04:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T04:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T05:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T05:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T06:00"), value: 0.596 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T06:30"), value: 0.977 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T07:00"), value: 1.468 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T07:30"), value: 1.957 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T08:00"), value: 2.356 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T08:30"), value: 2.911 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T09:00"), value: 2.986 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-03T09:30"), value: 2.714 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T00:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T00:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T01:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T01:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T02:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T02:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T03:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T03:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T04:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T04:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T05:00"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T05:30"), value: 0 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T06:00"), value: 0.796 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T06:30"), value: 1.082 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T07:00"), value: 1.568 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T07:30"), value: 1.963 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T08:00"), value: 2.336 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T08:30"), value: 3.122 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T09:00"), value: 2.953 },
  { nmi:"NEM1201009", timestamp: new Date("2005-03-04T09:30"), value: 2.566 }
];
