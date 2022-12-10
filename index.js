import csvtojsonV2 from "csvtojson";

const csvFilePath = "./data.csv";

/** Get the first name of the user */
const getFirstName = (item) =>
  item["Full Name as it appears on your Passport/License"].split(" ")[0];

/** Transform the availability dates to an array */
const getShifts = (item) =>
  item["What dates are you able to attend?"].split(", ");

/** Convert the csv to json */
const jsonData = await csvtojsonV2()
  .fromFile(csvFilePath)
  .then((jsonArray) => {
    return jsonArray.map((item) => {
      return {
        ...item,
        firstName: getFirstName(item),
        shifts: getShifts(item),
      };
    });
  });

// Read the json data
jsonData.map((item) => {
  console.log(item);
});

// Email Content
const name = "John";
const emailMessage = `
    Hello ${name},
    
    We're just a few hours away from the event. We hope you're excited!

    What do you need to know?
    - We encourage you to get familiar with the different features that we have at the event so you could have an idea on what to expect. You can find them at https://www.sexpo.com.au/sexpo-features.
    - The event is at MCEC and all the details on how to get there can be found here: https://www.sexpo.com.au/about-the-event-2/getting-there.
    - At the MCEC you should look for the concourse area, the entrace will be at Door 10.
    - You must be wearing closed shoes during your shift as a volunteer.
    - Make sure to give me a call at 0434385978 when you're at the venue so I can let you in!
    - We'll give you a T-shirt and a credential to wear during the event.
    
    - Here are the details of your shifts:
    {SHIFTS_HERE}

    If you have any questions or concerns, please don't hesitate to contact me.
    
    See you soon!
    Renan Sigolo
`;

// Send the emails
