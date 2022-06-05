---
title: Drawing robot
eventType: project
date: 2018-09-10
imageExt: jpg
image: circuit
thumbnail: robot
excerpt: A drawing robot that listens to you and writes down what you say. Created for Digital Systems, a course at Queen's.
tags: [arduino, raspberrypi]
---

Our project is a voice enabled robotic car that writes down what you say to it. The AIY voice kit listens to what you say and parses the audio into text using Google Cloud Speech API. The Raspberry Pi takes the text and, using a Python script we’ve written, converts each character into a list of curves to be drawn. For each curve, the robot positions itself at the starting point using wheels connected to two stepper motors with L393D drivers. Stepper motors were chosen because they can be controlled more precisely than regular DC motors. Once in position, the servo lowers the marker to touch the paper. The robot then follows the curve until it reaches the endpoint.
