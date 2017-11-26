# Seeing Sight

## **:tada: Winner of the Allia Serious Impact Hackathon November 2017 :tada:**

## Google Cardboard app for diagnosis and aid of Macular Degeneration

Our solution has three stages:
1. [Mapping the functional visual field](https://sudo-challenge-mapmd.github.io/mapper/)
2. [Increasing awareness of what it's like living with MD](https://sudo-challenge-mapmd.github.io/mapper/stream.html)
3. [Warping a real-time camera feed to move images out of your blindspot](https://sudo-challenge-mapmd.github.io/mapper/car.html)

### Mapping the functional visual field

Built using Pixi.js and html2canvas

1. Place the phone in the google glasses and navigate to [here](https://sudo-challenge-mapmd.github.io/mapper/). 
2. Press start and look at the yellow dots in the center of the screen.
3. Tap the screen when you see a white dot.

We used a recursive algorithm investigating smaller and smaller grid sizes, narrowing down on the boundary between where you can detect the white dot and where you cannot.

Results are stored locally on the phone and saved as a pdf.

![mapper](https://github.com/sudo-challenge-mapmd/mapper/raw/master/mapper.png)

### Increasing awareness of what it's like living with MD

Go to [here](https://sudo-challenge-mapmd.github.io/mapper/stream.html) when using a Google Cardboard and try walking around (currently works best on Android).

(Tap on the screen to see our solution, warping the image so that objects are no longer in your blind spot)

![stream](https://github.com/sudo-challenge-mapmd/mapper/raw/master/stream.png)

### Warping a real-time camera feed to move images out of your blindspot

Built using html5 canvas, webrtc and WebGL.

Go [here](https://sudo-challenge-mapmd.github.io/mapper/stream.html) and tap on the screen to toggle the warping effect or go to [here](https://sudo-challenge-mapmd.github.io/mapper/car.html) to see a pre-recorded demo. 

Other possible options to improve vision:
1. Adding zoom similar to [GiveVision](http://www.givevision.net/)
2. Instead of warping increase the contrast/exposure in that area.

![car](https://github.com/sudo-challenge-mapmd/mapper/raw/master/car.png)
