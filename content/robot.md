---
title: Drawing robot
eventType: project
date: 2018-09-10
imageExt: jpg
image: circuit
thumbnail: robot
excerpt: A drawing robot that listens to you and writes down what you say. Created for Digital Systems, a course at Queen's.
tags: [arduino, raspberrypi]
isHidden: true
---

My team built a voice-enabled robotic car that writes down what you say to it. The AIY voice kit listens for speech and uses the Google Cloud Speech API to parse the audio into text. The Raspberry Pi runs a Python script we wrote that converts each character into a list of curves. For each curve, the robot drives to the starting point on wheels powered by two stepper motors with L393D drivers. We chose stepper motors over regular DC motors because we can control them more precisely. Once the robot is in position, the servo lowers the marker to the paper, and the robot follows the curve until it reaches the endpoint.
