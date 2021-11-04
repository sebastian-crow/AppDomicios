import * as React from 'react'

// Reverse counter: Time remaining
export function ReverseCounter() {
  const [counter, setCounter] = React.useState(180000);


  React.useEffect(() => {
      counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  return (

      <div>{counter}</div>
  );
}