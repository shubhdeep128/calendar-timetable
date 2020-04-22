const { google } = require('googleapis');

module.exports.listEvents = function (auth, cb) {
    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: 'primary',
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        cb(events)
        //   console.log(events);
        // console.log('Upcoming 10 events:');
        // events.map((event, i) => {
        //     cb({start: event.start.dateTime || event.start.date, event: event.summary})
        // //   const start = event.start.dateTime || event.start.date;
        // //   console.log(`${start} - ${event.summary}`);
        // // cb(items);
        // });
      } else {
        console.log('No upcoming events found.');
      }
    });
  }

  module.exports.addEvent = function(auth,cb){
   
      console.log(process.env.GOOGLE_API_KEY)
  
      const calendar = google.calendar({ version: 'v3',auth: auth})
  
  
      const eventStartTime = new Date();
      eventStartTime.setDate(eventStartTime.getDay())
      eventStartTime.setMinutes(eventStartTime.getMinutes() + 30)
      const eventEndTime = new Date()
      eventEndTime.setDate(eventEndTime.getDay())
      eventEndTime.setMinutes(eventEndTime.getMinutes() + 90)
  
      const event = {
      summary: 'Test Event',
      location: 'Home',
      description: 'This is an event to test universical api',
      colorId: 1,
      start: {
          dateTime: eventStartTime,
          timeZone: 'Asia/Kolkata'
      },
      end:{
          dateTime: eventEndTime,
          timeZone: 'Asia/Kolkata'
      },
      colorId: 1, 
      }
      
      calendar.events.insert(
        { auth: auth, calendarId: 'primary', resource: event },
         (err, event) => {
             if(err) {console.error('Calendar Event Creation Error: ',err)
              return
            }
            console.log('Event created', event.data.htmlLink);
            cb(event);
         })

      // calendar.freebusy.query(
      //     {
      //         resource: {
      //             timeMin: eventStartTime,
      //             timeMax: eventEndTime,
      //             timeZone: 'Asia/Kolkata',
      //             items: [{ id: 'primary' }],
      //         },
      //     },
      //     (err,res) => {
      //         if(err) return console.error('Free Busy Query Error: ',err)
              
      //         const eventsArr = res.data.calendars.primary.busy
      //         console.log("Events Arr: ",eventsArr)
      //         if(eventsArr.length === 0) return calendar.events.insert(
      //             { calendarId: 'primary', resource: event },
      //              (err) => {
      //                  if(err) return console.error('Calendar Event Creation Error: ',err)
  
      //                  return console.log('Calendar Event Created')
      //              })
      //              return console.log(`Sorry I'm Busy`)
      //     }
      // )
  
  
  }