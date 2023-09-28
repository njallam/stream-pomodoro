# Usage Guide

## OBS

This project is intended to be use as a browser source in OBS.

1. Create a browser source using the following URL: `https://njallam.github.io/stream-pomodoro/`
   - To customise the focus and break time lengths use the following URL instead: `https://njallam.github.io/stream-pomodoro/?pomodoro=45&shortBreak=10&longBreak=15` (replacing `45`, `10` and `15` with minute values as desired.)
2. To interact with the timer, right click the source in OBS and click "Interact".
3. You can use Custom CSS to customise the look of the timer. See below for examples.

### Custom CSS

#### Custom Font
```css
body {
    background-color: rgba(0, 0, 0, 0);
    font-family: 'Comic Sans MS';
}
```
Set the value of `font-family` (in this case `Comic Sans MS`) to the exact name of any font installed on your computer.

#### Custom Text Colour
```css
body {
    background-color: rgba(0, 0, 0, 0);
    color: black;
}
#progress-value {
    background-color: black
}
```
Use the above CSS to change the default white text colour to black. You can also replace `black` above with another [CSS colour keyword](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#color_keywords).  The first instance is for the text colour, the second is for the progress bar.

##### Combining with Custom Font

To additionally have a custom font, simply copy the `font-family` line from **Custom Font** below the `color` line above.

```css
body {
    background-color: rgba(0, 0, 0, 0);
    color: black;
    font-family: 'Comic Sans MS';
}
#progress-value {
    background-color: black
}
```
