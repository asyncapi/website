---
title: "Building an asynchronous flight notification service using AsyncAPI, MQTT, Amadeus and Twilio"
date: 2021-03-24T06:00:00+01:00
type: Engineering
tags:
  - Testing
  - EDA
  - Use Case
cover: /img/posts/building-async-flight-notification-service/event-driven-architecture.webp
authors:
  - name: Alvaro Navarro
    photo: /img/avatars/anavarro.webp
    link: https://twitter.com/alnacle
    byline: Developer Relations at Amadeus for Developers
---

Flight delays, cancelations and gate changes are among the most common headaches that travelers face. Now more so than ever, travelers need this information literally at hand to enjoy a stress-free trip.

With this in mind, we decided to build a small prototype to implement an asynchronous scheduling notification service. The prototype will be implemented following the microservices architecture paradigm with the following services and requirements in mind:

- All services should communicate asynchronously via the [MQTT](https://mqtt.org/) protocol, a lightweight publish-subscribe messaging pattern. Messages should be correctly defined and documented following AsyncAPI specs. 

- A **Monitor service** receives and queues flight information and queries the REST API to detect changes. When it detects a change, it notifies subscribers. Flight schedule information is retrieved from the [Flight Status API](https://developers.amadeus.com/self-service/category/air/api-doc/on-demand-flight-status) from Amadeus for Developers.

- A **Notifier service** receives the notifications and alerts the user via SMS. Alerts are sent using the [Twilio SMS API](https://www.twilio.com/docs/sms/api).

- A **Subscriber service** provides a simple web interface so users can subscribe to flight status updates.

## Defining messages with AsyncAPI 

First, we’ll define two messages to model the events managed by subscribers and publishers:

A `flightQueue` message to queue a new flight to be monitored for status changes. This event is composed of two main schemas:

- `user` – to model information about the user subscribing to the notifications (name and phone number): 

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

- `flight` - to model  information about the flight being monitored (carrier code, flight number and departure date).

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

A `flightStatus` message to notify about changes. When the service detects a change in flight status, it triggers a notification event to alert the user. The payload of the `flightStatus` message consists of the following structure:

- `flight` and `user` schemas (the same as in the `flightQueue` message) to identify the flight emitting the event and the user receiving the notification.

- Two `segment` schemas corresponding to the origin and destination. This lets us notify about changes to both departure and arrival. 

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

Messages are shared among services so it’s important to correctly organize the YAML definition files under a common folder. In our case, we call it common:

        common/
            messages/
                flight_queue.yaml
                flight_status.yaml
            schemas/
                flight.yaml
                segment.yaml
                user.yaml

Services communicate through channels using the publish/subscribe pattern. Our architecture uses two different channels:

- `flight/queue` to manage and queue the flights to be monitored.
- `flight/update` to manage the notifications about flight updates.

Each service contains an `asyncapi.yaml` file with the description of the service and server and channel information. Let's take a look to the final `asyncapi.yaml` file of the Subscriber service to see how the messages and channels are organized:

```yaml
asyncapi: '2.0.0'
info:
  title: Flight Subscriber Service
  version: '1.0.0'
  description: |
     Allows users to subscribe events from a given flight
  license:
    name: Apache 2.0
    url: 'https://www.apache.org/licenses/LICENSE-2.0'
servers:
  development:
    url: mqtt://localhost:1883
    protocol: mqtt
channels:
  flight/queue:
    description: |
      queue flight in order to retrieve status
    subscribe:
      summary: Receive information about the flight that should be monitored for changes
      message:
        $ref: '#/components/messages/flightQueue'
components:
  messages:
    flightQueue:
      $ref: '../common/messages/flight_queue.yaml'
```

When the user provides their flight information, the Subscriber service emits a `flightQueue` message that will be received by the Monitor service from the `flight/queue` channel. The Notifier service also receives the message and adds the payload to the list of flights to monitor.

Once the Monitor service detects a change in flight status (e.g. a change in boarding gate), it emits a `flightStatus` message to inform subscribers. The Notifier service, which is subscribed to the changes on the `flight/update` channel, notifies the end-user by SMS.

The AsyncAPI specification files for the [Monitor Service](https://github.com/amadeus4dev/amadeus-async-flight-status/blob/main/monitor/asyncapi.yaml) and [Notifier Service](https://github.com/amadeus4dev/amadeus-async-flight-status/blob/main/notifier/asyncapi.yaml) can be found on GitHub.

## Monitoring flight status information 

The Monitor service checks the status of the user’s flight by calling the On-Demand Flight Status API, which provides real-time flight schedule information like departure/arrival times, gate, or terminal. A simple cURL request to the API shows how the information is represented:

> To get your own authorization token, follow [this](https://developers.amadeus.com/get-started/get-started-with-self-service-apis-335) guide.

```sh
curl https://test.api.amadeus.com/v2/schedule/flights?carrierCode=KL&flightNumber=1772scheduledDepartureDate=2021-02-18 -H 'Authorization: Bearer dzh1cpJiFgAlE7iZS'
```

In the JSON response, the schedule data of this example has one single segment (a leg of an itinerary, in airline jargon) with several `flightPoints`:

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

The Subscriber service  lets users subscribe to the notifications. We built a simple HTTP server with Flask to let the user enter their name, phone number and flight information.

Once the Subscriber service gets a new user subscription, it emits a `flightQueue` message with that information in the payload to the broker, so that it can be received by the Monitor.

## Sending notifications to users 

The Notifier service receives flight status updates from the Monitor and uses the Twilio SMS API to notify the end. The service has a very simple implementation: when the Notifier receives a `flightStatus` message, it uses the message payload to build an SMS message:

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

The [prototype](https://github.com/amadeus4dev/amadeus-async-flight-status) runs on four Docker containers – one per service plus another for the [MQTT broker](https://github.com/toke/docker-mosquitto) based on the Docker image maintained by the Eclipse Mosquitto project.

To avoid manually starting each service (plus the dependency of starting the broker first), we will use [Docker compose](https://docs.docker.com/compose/), a tool to run applications composed of multiple containers using a YAML file to define each container as well as their dependencies.

We start the service by executing:

        docker network create my-network
        docker-compose up --remove-orphans 

In the browser, we go to http://localhost:5000 and enter information about the flight we want to monitor. The service will send us an alert once the flight information is updated: 

![call-to-action](/img/posts/building-async-flight-notification-service/notification-message.webp)

## Conclusion

Our prototype successfully implements our requirements but it’s still far from being ready to use in production. To do so, we’d need to implement authorization, an unsubscribe feature and improve the polling service’s performance, among other improvements.

However, developing this prototype lets us learn how to specify and document event-driven architecture using AsyncAPI easily.

You can find the complete source code of the prototype on the GitHub [async-flight-status repository](https://github.com/amadeus4dev/amadeus-async-flight-status). Feel free to clone, modify and improve the implementation!

Happy coding!
