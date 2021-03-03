---
title: "Building an asynchronous flight notification service using AsyncAPI"
date: 2021-03-03T19:00:00+01:00
type: Engineering
featured: true
tags:
  - Community
  - Testing
  - Tools
cover: /img/posts/building-async-flight-notification-service/event-driven-architecture.webp
authors:
  - name: Alvaro Navarro
    photo: /img/avatars/anavarro.webp
    link: https://twitter.com/alnacle
    byline: Developer Relations at Amadeus for Developers
---

One of the main stressful situations when traveling, is to be always informed about potential changes on the scheduling of the flights: is my flight delayed? Has it been cancelled? What can I do? Travelers want to have this information literally at hand.  

With this information in mind, we decided to create a small prototype to implement an asynchronous scheduling notification service. The prototype will be implemented following the microservices architecture paradigm with the following services and requirements in mind:

- All services should communicate asynchronously via the [MQTT](https://mqtt.org/) protocol, a lightweight publish-subscribe messaging pattern. Messages should be correctly defined and documented following AsyncAPI specs. 

- A **Monitor service** receives and queues flight information and queries the REST API to detect changes. When it detects a change, it notifies subscribers. Flight schedule information is retrieved from the [Flight Status API](https://developers.amadeus.com/self-service/category/air/api-doc/on-demand-flight-status?asyncapi) from Amadeus for Developers.

- A **Notifier service** receives the notifications and alerts the user via SMS. Alerts are sent using the [Twilio SMS API](https://www.twilio.com/docs/sms/api).

- A **Subscriber service** provides a simple web interface so users can subscribe to flight status updates. 

## Defining messages with AsyncAPI 

First, we’ll define two messages to model the events managed by subscribers and publishers:

A **FlightQueue message** to queue a new flight to be monitored for status changes. This event is composed of two main schemas:

- Users – to model information about the user subscribing to the notifications (name and phone number):  

```yaml
type: object 
properties: 
    userName: 
        type: string 
        minimum: 1 
    phoneNumber: 
        type: string 
        description: phone number where notifications will be received. 
```

- Flight - to model  information about the flight being monitored (carrier code, flight number and departure date). 

```yaml
type: object 
properties: 
    carrierCode: 
        type: string 
        description: 2 to 3-character IATA carrier code 
        example: "LH" 
    flightNumber: 
        type: integer 
        minimum: 1 
        description: 1 to 4-digit number of the flight 
        example: "193" 
    scheduledDepartureDate: 
        type: string 
        format: date-time 
        description: scheduled departure date of the flight, local to the departure airport. 
        example: "2020-10-20" 
```

A **FlightStatus message** to notify about changes. When the service detects a change in flight status, it triggers a notification event to alert the user. The payload of the flightStatus message consists of the following structure:

- Flight and Users schemas (the same as in the FlightQueue message) to identify the flight emitting the event and the user receiving the notification. 

- Two segment schemas corresponding to the origin and destination. This lets us notify about changes to both departure and arrival.  

```yaml
type: object 
properties: 
  iataCode: 
    type: string 
    description: 2 to 3-character IATA carrier code 
    example: "MAD" 
  scheduledDate: 
    type: string 
    format: date-time 
    description: scheduled datetime of the flight, local to the airport. 
    example: "2020-10-20 19:15" 
  gate: 
    type: string 
    description: departure gate 
    example: "2D" 
  terminal: 
    type: string 
    description: airport terminal 
    example: "4" 
```

Each message is emitted on a different channel: 

```yaml
channels: 
  flight/update: 
    description: | 
      Provides updates from a subscribed flight 
    subscribe: 
      summary: Inform about the status of a subscribed flight 
      message: 
        $ref: '#/components/messages/flightStatus' 

  flight/queue: 
    description: | 
      Queues a flight in order to retrieve status 
    publish: 
      summary: Subscribe about the status of a given flight 
      message: 
        $ref: '#/components/messages/flightQueue' 

components: 
  messages: 
    flightStatus: 
      $ref: '../common/messages/flight_status.yaml' 
    flightQueue: 
      $ref: '../common/messages/flight_queue.yaml' 
```
 
The **flight/queue** channel queues flights for monitoring by the Monitor service. When the user provides their flight information, the Subscriber service emits a **flightQueue** message. The Notifier service receives the message and adds the payload to the list of flights to monitor. 
 
When the Monitor service detects a change in flight status (e.g. a change in boarding gate), it emits a **flightStatus** message to inform subscribers. The Notifier service, which is subscribed to the changes, notifies the end user by SMS.

Messages are shared among services so it’s important to correctly organize the YAML definition files under a common folder. In our case, we call it *common*:

        common/
            messages/
                flight_queue.yaml
                flight_status.yaml
            schemas/
                flight.yaml
                segment.yaml
                user.yaml

Each service will contain an *asyncapi.yaml* file containing the description of the service and server and channel information. 

## Monitoring flight status information 

The Monitor service checks the status of the user’s flight by calling the On-Demand Flight Status API, which provides real-time flight schedule information like departure/arrival times, gate or terminal. A simple cURL request to the API shows how the information is represented: 

        curl https://test.api.amadeus.com/v2/schedule/flights?carrierCode=KL&flightNumber=1772&scheduledDepartureDate=2021-02-18  

In the JSON response, the schedule data of this example has one single segment (a leg of an itinerary, in airline jargon) with several *flightPoints*: 

```json
"flightPoints": [  
    {  
        "iataCode": "FRA",  
        "departure": {  
            "terminal": {  
                "code": "1"  
            },  
            "gate": {  
                "mainGate": "B20"  
            },  
            "timings": [  
                {  
                    "qualifier": "STD",  
                    "value": "2020-11-05T18:20+01:00"  
                }  
            ]  
        }  
    },  
    {  
        "iataCode": "AMS",  
        "arrival": {  
            "terminal": {  
                "code": "1"  
            },  
            "gate": {  
                "mainGate": "A04"  
            },  
            "timings": [  
                {  
                    "qualifier": "STA",  
                    "value": "2020-11-05T19:35+01:00"  
                }  
            ]  
        }  
    }
]
```

We can see that:  

- The flight is scheduled to depart from Terminal 1, Gate B22 of Frankfurt International Airport (FRA) at 18:20 (UTC+1).  
- It is scheduled to arrive at Terminal 1, Gate A04 of Amsterdam Schiphol Airport (AMS) at 19:35 (UTC+1).  

The API is synchronous and therefore needs to be polled to monitor the flight status. This isn’t ideal and we need a solid strategy to avoid DDoSing the Amadeus backend, using up our free call quota or piling up a massive bill at the end of the month.  

To solve this, we put the Monitor service on a separate thread. Every five minutes, the thread checks to see if it’s time to retrieve information from the API and update the status. The Monitor only calls the API if two conditions are met:  

- The current date is equal to the departure date.  
- The current time is within 4 hours of the departure time.  

## Subscribing to flight updates 

The Subscriber service  lets users subscribe to the notifications. We built a simple HTTP server with Flask to let the user enter their name, phone number and flight information.   

Once it receives this information, the Subscriber emits a FlightQueue message with that information in the payload to the broker, so that it can be received by the Monitor.

## Sending notifications to users 

The Notifier service receives flight status updates from the Monitor and uses the Twilio SMS API to notify the end. The service has a very simple implementation: when the Notifier receives a flightStatus message, it uses the message payload to build an SMS message:

```python
client = twilio.Client(account_sid, auth_token)

msg = build_message(alert_msg['user'],
                    alert_msg['departure'],
                    alert_msg['arrival'])

destination_phone = alert_msg['user']['phoneNumber']

message = client.messages.create(body=msg,
                                 from_=twilio_phone,
                                 to=destination_phone)
```

## Running the service 

The prototype runs on four Docker containers – one per service plus another for the [MQTT broker](https://github.com/toke/docker-mosquitto) based on the Docker image maintained by the Eclipse Mosquitto project.

To avoid manually starting each service (plus the dependency of starting the broker first), we will use [Docker compose](https://docs.docker.com/compose/), a tool to run applications composed of multiple containers using a YAML file to define each container as well as their dependencies. 

We start the service by executing:

        docker-compose up --remove-orphans 

In the browser, we go to http://localhost:5000 and enter information about the flight we want to monitor. The service will send us an alert once the flight information is updated:  

![call-to-action](/img/posts/building-async-flight-notification-service/notification-message.webp)

## Conclusion

Our prototype successfully implements our requirements but it’s still far from being ready to use in production. To do so, we’d need to implement authorization, an unsubscribe feature and improve the polling service’s performance, among other improvements. 

However, developing this prototype has let us learn how we can easily specify and document event-driven architecture using AsyncAPI.

You can find the full source code of the prototype on the GitHub [async-flight-status repository](https://github.com/amadeus4dev/amadeus-async-flight-status). Feel free to clone, modify and improve the implementation! 

Happy coding!

