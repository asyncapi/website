---
title: 'ros2'
weight: 25
---

# ROS 2 Bindings

This document defines how to describe ROS 2-specific information in AsyncAPI.

It applies to all [distributions of ROS 2](https://docs.ros.org/en/rolling/Releases.html).

<a name="version"></a>

## Version

Current version is `0.1.0`.

<a name="server"></a>

## Server Binding Object

This object contains information about the server representation in ROS 2. 
ROS 2 can use a vast variety of [middleware implementations](https://docs.ros.org/en/rolling/Installation/RMW-Implementations.html). This document focuses on DDS and Zenoh middleware implementations.
DDS-based ROS 2 implementations are per default decentralized with no central server, so the field `host` can be set to `none`.
For more information on DDS tuning, you can visit the [DDS Tuning Guide](https://docs.ros.org/en/rolling/How-To-Guides/DDS-tuning.html).
When using Zenoh, the `host` field specifies the Zenoh Router IP address.

###### Fixed Fields

Field Name | Type | Description
---|:---:|---|
`rmwImplementation` | string  |  Specifies the ROS 2 middleware implementation to be used. Valid values include the different [ROS 2 middleware vendors (RMW)](https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Different-Middleware-Vendors.html) like `rmw_fastrtps_cpp` (Fast DDS) or `rmw_zenoh_cpp` (Zenoh). This determines the underlying middleware implementation that handles communication.
`domainId` | integer  |  All ROS 2 nodes use domain ID 0 by default. To prevent interference between different groups of computers running ROS 2 on the same network, a group can be set with a unique domain ID. [Must be a non-negative integer less than 232](https://docs.ros.org/en/rolling/Concepts/Intermediate/About-Domain-ID.html). 

### Examples

```yaml
servers:
  ros2:
    host: none
    protocol: ros2
    protocolVersion: humble
    bindings:
      ros2:
        rmwImplementation: rmw_fastrtps_cpp
        domainId: 0
```


<a name="channel"></a>

## Channel Binding Object

This object MUST NOT contain any properties. Its name is reserved for future use.

<a name="operation"></a>

## Operation Binding Object

This object contains information about the ROS 2 node.

###### Fixed Fields

Field Name | Type | Description
---|:---:|---|
`role` | string | Specifies the ROS 2 type of the node for this operation. If the action is `send`, valid values for the role are: `publisher`, `action_client`, `service_client`. If the action is `receive`, valid values for the role are: `subscriber`, `action_server`, `service_server`. This defines how the node will interact with the associated topic, service or action.
`node` | string | The name of the ROS 2 node that implements this operation. 
`qosPolicies` | [Quality of Service Policy Object](#QoSPolicyObject) | Quality of Service (QoS) for the topic.

<a name="QoSPolicyObject"></a>

### Quality of Service Object
This object contains ROS 2 specific information about the Quality of Service policies.
More information here: https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies

Field Name | Type | Description
---|:---:|---|
`reliability` | string | One of `best_effort` or `reliable`.  More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)
`history` | string | One of `keep_last`, `keep_all` or `unknown`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)
`durability` | string | One of `transient_local` or `volatile`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)
`lifespan` | integer |  The maximum amount of time between the publishing and the reception of a message without the message being considered stale or expired. `-1` means infinite. 
`deadline` | integer | The expected maximum amount of time between subsequent messages being published to a topic. `-1` means infinite.
`liveliness` | string | One of `automatic` or `manual`. More information here: [ROS 2 QoS](https://docs.ros.org/en/jazzy/Concepts/Intermediate/About-Quality-of-Service-Settings.html#qos-policies)
`leaseDuration` | integer | The maximum period of time a publisher has to indicate that it is alive before the system considers it to have lost liveliness. `-1` means infinite.

### Examples

ROS 2 subscriber example:

```yaml
receiveCmdVel:
  action: receive
  channel:
    $ref: "#/channels/CmdVel"
  bindings:
    ros2:
      role: subscriber
      node: /turtlesim
        qosPolicies:
          history: unknown
          reliability: reliable
          durability: volatile
          lifespan: -1
          deadline: -1
          liveliness: automatic
          leaseDuration: -1
```

ROS 2 publisher example:
```yaml
 Pose:
    action: receive
    channel:
      $ref: "#/channels/Pose"
    bindings:
      ros2:
        role: publisher
        node: /turtlesim
```

ROS 2 service server example:
```yaml
SetPen:
    action: receive
    channel:
      $ref: "#/channels/SetPenRequest"
    reply:
      channel:
        $ref: "#/channels/SetPenReply"
    bindings:
      ros2:
        role: service_server
        node: /turtlesim
```

ROS 2 service client example:
```yaml
SetPen:
    action: send
    channel:
      $ref: "#/channels/SetPenRequest"
    reply:
      channel:
        $ref: "#/channels/SetPenReply"
    bindings:
      ros2:
        role: service_client
        node: /node_client
```

ROS 2 action server example:
```yaml
receiveRotateAbsolute:
  action: receive
  channel:
    $ref: "#/channels/RotateAbsoluteRequest"
  reply:
    channel:
      $ref: "#/channels/RotateAbsoluteReply"
  bindings:
    ros2:
      role: action_server
      node: /turtlesim
```

ROS 2 action client example:
```yaml
RotateAbsolute:
    action: send
    channel:
      $ref: "#/channels/RotateAbsoluteRequest"
    reply:
      channel:
        $ref: "#/channels/RotateAbsoluteReply"
    bindings:
      ros2:
        role: action_client
        node: /teleop_turtle
```

<a name="message"></a>

## Message Binding Object

While this object DOES NOT contain any ROS 2 specific properties, it is important to understand how to express the different [ROS 2 data types](https://design.ros2.org/articles/legacy_interface_definition.html#:~:text=to%20IDL%20types-,ROS%20type,string,-The%20mapping%20of) in [AsyncAPI message types and formats](https://www.asyncapi.com/docs/reference/specification/v3.0.0#dataTypeFormat:~:text=The%20formats%20defined%20by%20the%20AsyncAPI%20Specification%20are%3A).

ROS 2  Type | AsyncAPI Type | AsyncAPI Format | 
---|:---:|---|
bool | boolean | boolean
byte | string | octet
char | integer | uint8
float32 | number | float
float64 | number | double
int8 | integer | int8
uint8 | integer | uint8
int16 | integer | int16
uint16 | integer | uint16
int32 | integer | int32
uint32 | integer | uint32
int64 | integer | int64
uint64 | integer | uint64
string | string | string
array | array | --

It is important to understand that the message header of the AsyncAPI specification does not map with the message header in ROS 2.
For this reason, the AsyncAPI message header will be ignored. If you want to define the header of a message in ROS 2, you should put in the payload of the message. [Example](https://docs.ros.org/en/ros2_packages/rolling/api/point_cloud_interfaces/msg/CompressedPointCloud2.html):

```yaml
channels:
  PointCloud:
    address: /pointCloud
    messages:
      CompressedPointCloud2:
        $ref: "#/components/messages/CompressedPointCloud2"
components:
  CompressedPointCloud2:
    tags:
      - name: msg
    payload:
      type: object
      properties:
        header:
          $ref: "#/components/messages/std_msgs/header/payload"
        height:
          $ref: "#/components/messages/uint32/payload"
        width:
          $ref: "#/components/messages/uint32/payload"
        fields:
          $ref: "#/components/messages/sensor_msgs/PointField/payload"
        is_bigendian:
          $ref: "#/components/messages/bool/payload"
        point_step:
          $ref: "#/components/messages/uint32/payload"
        row_step:
          $ref: "#/components/messages/uint32/payload"
        compressed_data:
          $ref: "#/components/messages/uint8/payload"
        is_dense:
          $ref: "#/components/messages/bool/payload"
        format:
          $ref: "#/components/messages/string/payload"     
```

## Complete example:
From the AsyncAPI specification example it could be extracted that:
- It consist on a ROS 2 Jazzy application running with Fast DDS as RMW. 
-  `/turtlesim` node is a subscriber of the `/turtle1/cmd_vel` topic and its qos policies.
- The interface of the `/turtle1/cmd_vel` topic is `Twist` that has a nested type: `Vector3`. Both of them are part of the standard package `geometry_msgs`.
- `Vector3` has already the types converted to AsyncAPI types and formats (number and double), instead of using the ROS 2 types.
- There is one file (head-asyncapi.yaml) that references the different standard/custom packages. This packages contains the strucute of its messages.

  ```
  ├── interfaces
  │ ├── geometry_msgs.yaml
  │ ├── std_msgs.yaml
  │ ├── <custom_pkg_msgs>.yaml
  │ └── ....
  └── head-asyncapi.yaml
  ```

head-asyncapi.yaml

```yaml
asyncapi: 3.0.0
info:
  title: Turtlesim example for ROS 2
  version: 1.0.0

servers:
  ros2:
    host: none
    protocol: ros2
    protocolVersion: jazzy
    bindings:
      ros2:
        rmwImplementation: rmw_fastrtps_cpp
        domainId: 0

channels:
  CmdVel:
    address: /turtle1/cmd_vel
    messages:
      Twist:
        $ref: ./interfaces/geometry_msgs.yaml#/components/messages/Twist

operations:
  CmdVel:
    action: receive
    channel:
      $ref: "#/channels/CmdVel"
    bindings:
      ros2:
        role: subscriber
        node: /turtlesim
        qosPolicies:
          history: unknown
          reliability: reliable
          durability: volatile
          lifespan: -1
          deadline: -1
          liveliness: automatic
          leaseDuration: -1
```

./interfaces/geometry_msgs.yaml
```yaml
asyncapi: 3.0.0
info:
  title: geometry_msgs
  version: 1.0.0
components:
  messages:
    Twist:
      tags:
        - name: msg
      payload:
        type: object
        properties:
          linear:
            $ref: "#/components/messages/Vector3/payload"
          angular:
            $ref: "#/components/messages/Vector3/payload"
    Vector3:
      payload:
        properties:
          x:
            type: number
            format: double
          y:
            type: number
            format: double
          z:
            type: number
            format: double
```