export const nem12HeaderString = "100,NEM12,200506081149,UNITEDDP,NEMMCO";
export const nem12DataString = `200,NEM1201009,E1E2,1,E1,N1,01009,kWh,30,20050610
300,20050301,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.810,0.568,1.234,1.353,1.507,1.344,1.773,0
300,20050302,0,0,0,0,0,0,0,0,0,0,0,0,0.235,0.567,0.890,1.123,1.345,1.567,1.543,1.234,0
300,20050303,0,0,0,0,0,0,0,0,0,0,0,0,0.261,0.310,0.678,0.934,1.211,1.134,1.423,1.370,0
300,20050304,0,0,0,0,0,0,0,0,0,0,0,0,0.335,0.667,0.790,1.023,1.145,1.777,1.563,1.344,1
500,O,S01009,20050310121004,
200,NEM1201009,E1E2,2,E2,,01009,kWh,30,20050610
300,20050301,0,0,0,0,0,0,0,0,0,0,0,0,0.154,0.460,0.770,1.003,1.059,1.750,1.423,1.200,0
0050310121004,
300,20050302,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.810,0.776,1.004,1.034,1.200,1.310,1.342,0
0050310121004,
300,20050303,0,0,0,0,0,0,0,0,0,0,0,0,0.335,0.667,0.790,1.023,1.145,1.777,1.563,1.344,1
0050310121004,
300,20050304,0,0,0,0,0,0,0,0,0,0,0,0,0.461,0.415,0.778,0.940,1.191,1.345,1.390,1.222,1
0050310121004,
500,O,S01009,20050310121004`;
export const nem12FooterString = "900";

export const nem12CsvString = `${nem12HeaderString}
${nem12DataString}
${nem12FooterString}`;

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
      nextScheduledReadDate: 20050610,
      intervalData: [
        {
          recordIndicator: 300,
          intervalDate: 20050301,
          intervalValues: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0.461, 0.81, 0.568, 1.234,
            1.353, 1.507, 1.344, 1.773, 0,
          ],
          qualityMethod: "0",
          reasonCode: 0,
          reasonDescription: "0",
          updateDateTime: 0,
          msatsLoadDateTime: 0,
          intervalEvents: [
            // {
            //   recordIndicator: 400,
            //   startInterval: 0,
            //   endInterval: 0,
            //   qualityMethod: "0",
            //   reasonCode: 0,
            //   reasonDescription: "0",
            // },
            // ...
          ],
          b2bDetails: [
            // {
            //   recordIndicator: 500,
            //   transCode: "O",
            //   retServiceOrder: "S01009",
            //   readDateTime: 20050310121004,
            //   indexRead: 0,
            // },
            // ...
          ],
        },
        // ...
      ],
    },
    // ...
  ],
  footer: {},
};
