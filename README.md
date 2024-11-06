
# dotMatrixInput

`dotMatrixInput` is a custom web component that displays a matrix of dots based on a numeric input value. It allows users to input a number, and the component visually represents this number with a grid of dots. The dot color changes depending on whether the input is positive or negative, providing an intuitive and visual representation of values.

## Features

- **Numeric Input**: Accepts numeric input through an HTML `<input type="number">` element.
- **Dynamic Dot Display**: Renders a grid of dots representing the input value. 
  - Positive values show black dots.
  - Negative values show red dots.
- **Ellipsis for Large Values**: If the absolute value exceeds a maximum limit, an ellipsis (`...`) is shown to indicate overflow.
- **Custom Events**: Emits `input`, `change`, `focus`, and `blur` events for integration with other components or frameworks.

## Installation

Add `dotMatrixInput.js` to your project and register it as a custom element.

```html
<script type="module" src="path/to/dotMatrixInput.js"></script>
```

## Usage

Once imported, you can use `<dot-matrix-input>` like any other HTML element.

```html
<dot-matrix-input></dot-matrix-input>
```

You can also set its attributes and properties dynamically:

```javascript
const dotMatrix = document.querySelector('dot-matrix-input');
dotMatrix.value = 50; // Sets the number of dots displayed to 50
dotMatrix.disabled = true; // Disables the input
```

### Attributes

- `value` (Number): Sets the number of dots displayed. Positive values show black dots, negative values show red dots.
- `disabled` (Boolean): Disables user interaction with the input field.

### Events

- **`input`**: Fired whenever the input value changes.
- **`change`**: Fired when the input loses focus after a value change.
- **`focus`**: Fired when the input gains focus.
- **`blur`**: Fired when the input loses focus.

## Styling

The component has built-in styling for the input and dot matrix container, which includes:
- A grey background and rounded border.
- Dots arranged in a grid layout, with each dot styled as a circle.
  
To customize the styles, you can use CSS variables or apply additional styles in the parent component that contains `<dot-matrix-input>`.

## Example

Here's an example of using `dotMatrixInput` in an HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dot Matrix Input Example</title>
  <script type="module" src="dotMatrixInput.js"></script>
</head>
<body>

  <h1>Dot Matrix Input</h1>
  <dot-matrix-input></dot-matrix-input>

</body>
</html>
```

## Limitations

- **Max Dots**: The maximum number of dots displayed is set to 500. This limit is to prevent performance issues and excessive DOM nodes.
- **Shadow DOM**: The component uses a closed Shadow DOM, which restricts direct access to internal elements from external JavaScript.

## License

This project is licensed under the MIT License.
